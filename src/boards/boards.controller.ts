import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './board-status.enum';
import { BoardRepository } from './boards.repository';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(
    private boardRepository: BoardRepository,
    private boardsService: BoardsService,
  ) {}

  // @Get()
  // getAllBoard(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDTO: CreateBoardDTO): Board {
  //   return this.boardsService.createBoard(createBoardDTO);
  // }

  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoard();
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: number): void {
    this.boardsService.deleteBoard(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDTO: CreateBoardDTO): Promise<Board> {
    return this.boardsService.createBoard(createBoardDTO);
  }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ): Board {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
