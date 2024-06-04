import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardStatus } from './board-status.type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBoardDTO } from './dto/update-board.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(
    createBoardDTO: CreateBoardDTO,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDTO;

    const board = this.create({
      title,
      description,
      status: 'PUBLIC',
      user,
    });

    await this.save(board);
    return board;
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
    const found = await this.findOne({ where: { id: id } });

    if (!found) {
      throw new NotFoundException(`Can't find Board with ${id}`);
    }

    return found;
  }

  async updateBoard(
    id: number,
    updateBoardDTO: UpdateBoardDTO,
  ): Promise<Board> {
    const { title, description } = updateBoardDTO;

    const board = await this.getBoardById(id);

    board.title = title;
    board.description = description;

    await this.save(board);

    return board;
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;

    await this.save(board);
    return board;
  }
}
