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

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  createBoard(createBoardDTO: CreateBoardDTO, user: User): Promise<Board> {
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
}
