import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.type';
import { v1 as uuid } from 'uuid';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { UpdateBoardDTO } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: Repository<Board>,
  ) {}
  async createBoard(createBoardDTO: CreateBoardDTO) {
    const { title, description } = createBoardDTO;

    const board = this.boardRepository.create({
      title,
      description,
      status: 'PRIVATE',
    });

    await this.boardRepository.save(board);
    return board;
  }

  async getAllBoard(): Promise<Board[]> {
    const found = await this.boardRepository.find();

    if (!found) {
      throw new NotFoundException(`There is no board`);
    }

    return found;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id: id } });

    if (!found) {
      throw new NotFoundException(`Can't find Board with ${id}`);
    }

    return found;
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;

    await this.boardRepository.save(board);
    return board;
  }

  async updateBoard(
    id: number,
    updateBoardDTO: UpdateBoardDTO,
  ): Promise<Board> {
    const { title, description } = updateBoardDTO;

    const board = await this.getBoardById(id);
    board.title = title;
    board.description = description;

    await this.boardRepository.save(board);
    return board;
  }

  async deleteBoard(id: number): Promise<void> {
    // const found = await this.getBoardById(id);

    this.boardRepository.delete(id);
  }
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  // createBoard(createBoardDTO: CreateBoardDTO): Board {
  //   const { title, description } = createBoardDTO;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) throw new NotFoundException(`Can't find Board with id ${id}`);
  //   return found;
  // }
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
