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
import { User } from 'src/auth/user.entity';
import { CreateBoardResponse } from './dto/response/create-board.response';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  createBoard(
    createBoardDTO: CreateBoardDTO,
    user: User,
  ): Promise<CreateBoardResponse> {
    return this.boardRepository.createBoard(createBoardDTO, user);
  }

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoards();
  }

  getAllBoardsFromUser(user: User): Promise<Board[]> {
    return this.boardRepository.getAllBoardsFromUser(user);
  }

  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  updateBoardStatus(
    id: number,
    status: BoardStatus,
    user: User,
  ): Promise<Board> {
    return this.boardRepository.updateBoardStatus(id, status, user);
  }

  updateBoard(
    id: number,
    updateBoardDTO: UpdateBoardDTO,
    user: User,
  ): Promise<Board> {
    return this.boardRepository.updateBoard(id, updateBoardDTO, user);
  }

  deleteBoard(id: number, user: User): Promise<DeleteBoardResponse> {
    return this.boardRepository.deleteBoard(id, user);
  }
}
