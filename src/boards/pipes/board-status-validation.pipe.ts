import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board-status.type';

export class BoardStatusValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isStatusType(value)) {
      throw new BadRequestException(`${value} isn't in the status`);
    }

    return value;
  }

  private isStatusType(status: any): status is BoardStatus {
    return status === 'PRIVATE' || status === 'PUBLIC';
  }
}
