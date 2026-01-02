import { ApiProperty } from '@nestjs/swagger';
import { LlmRequestDto } from '../../common/dto/llm-request.dto';

export class ImageUploadDto extends LlmRequestDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file to analyze',
  })
  file: any;
}
