import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './board-status.type';
import { Board } from './board.entity';
import { UpdateBoardDTO } from './dto/update-board.dto';
import { DeleteBoardResponse } from './dto/response/delete-board.response';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
@UseGuards(AuthGuard('jwt'))
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDTO: CreateBoardDTO,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDTO, user);
  }

  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Get('/specific')
  getAllBoardsFromUser(@GetUser() user: User): Promise<Board[]> {
    return this.boardsService.getAllBoardsFromUser(user);
  }

  @Patch('/:id/status')
  @UsePipes(ValidationPipe)
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    const updatedBoard = this.boardsService.updateBoardStatus(id, status);

    return updatedBoard;
  }

  @Patch('/:id/update')
  @UsePipes(ValidationPipe)
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDTO: UpdateBoardDTO,
  ): Promise<Board> {
    const updatedBoard = this.boardsService.updateBoard(id, updateBoardDTO);

    return updatedBoard;
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteBoardResponse> {
    const result = this.boardsService.deleteBoard(id);
    return result;
  }
}
