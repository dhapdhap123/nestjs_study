import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardStatus } from './board-status.type';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateBoardDTO } from './dto/update-board.dto';
import { User } from 'src/auth/user.entity';
import { DeleteBoardResponse } from './dto/response/delete-board.response';
import { CreateBoardResponse } from './dto/response/create-board.response';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(
    createBoardDTO: CreateBoardDTO,
    user: User,
  ): Promise<CreateBoardResponse> {
    const { title, description } = createBoardDTO;

    const board = this.create({
      title,
      description,
      status: 'PUBLIC',
      userId: user.id,
      user,
    });

    await this.save(board);
    return { title, description, status: 'PUBLIC', userId: user.id };
  }

  async getAllBoards(): Promise<Board[]> {
    const boards = await this.find();

    if (!boards) {
      throw new NotFoundException(`There is no board`);
    }

    return boards;
  }

  async getAllBoardsFromUser(user: User): Promise<Board[]> {
    const query = this.createQueryBuilder('board');

    query.where('board.userId = :userId', { userId: user.id });

    const boards = await query.getMany();

    if (!boards) {
      throw new NotFoundException(
        `There is no board written by user ${user.id}`,
      );
    }

    return boards;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne({
      where: { id: id },
    });

    if (!found) {
      throw new NotFoundException(`Can't find Board with ${id}`);
    }

    return found;
  }

  async updateBoard(
    id: number,
    updateBoardDTO: UpdateBoardDTO,
    user: User,
  ): Promise<Board> {
    const { title, description } = updateBoardDTO;

    const board = await this.getBoardById(id);

    if (board.user !== user) {
      throw new UnauthorizedException('request user and writer does not match');
    }

    board.title = title;
    board.description = description;

    await this.save(board);

    return board;
  }

  async updateBoardStatus(
    id: number,
    status: BoardStatus,
    user: User,
  ): Promise<Board> {
    const board = await this.getBoardById(id);

    if (board.user !== user) {
      throw new UnauthorizedException('request user and writer does not match');
    }

    board.status = status;

    await this.save(board);
    return board;
  }

  async deleteBoard(id: number, user: User): Promise<DeleteBoardResponse> {
    const board = await this.findOne({ where: { id } });
    if (!board) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    if (board.userId !== user.id) {
      throw new UnauthorizedException(
        `board's writer and request user do not match`,
      );
    }

    return { delete: board };
  }
}
