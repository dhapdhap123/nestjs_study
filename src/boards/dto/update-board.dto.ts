import { IsNotEmpty } from 'class-validator';

export class UpdateBoardDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
