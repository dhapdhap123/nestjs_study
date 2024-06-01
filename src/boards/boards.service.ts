import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.type';
import { v1 as uuid } from 'uuid';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { UpdateBoardDTO } from './dto/update-board.dto';
import { DeleteBoardResponse } from './dto/response/delete-board.response';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDTO);
  }

  getAllBoard(): Promise<Board[]> {
    return this.boardRepository.getAllBoard();
  }

  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    return this.boardRepository.updateBoardStatus(id, status);
  }

  updateBoard(id: number, updateBoardDTO: UpdateBoardDTO): Promise<Board> {
    return this.boardRepository.updateBoard(id, updateBoardDTO);
  }

  async deleteBoard(id: number): Promise<DeleteBoardResponse> {
    await this.boardRepository.delete(id);

    return { delete: 'success' };
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
