import { BoardStatus } from 'src/boards/board-status.type';

export class CreateBoardResponse {
  title: string;
  description: string;
  status: BoardStatus;
  userId: number;
}
