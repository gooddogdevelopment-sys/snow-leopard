import { LlmRequestDto } from 'src/common/dto/llm-request.dto';

export class ImageBaseDto extends LlmRequestDto {
  image: string;
}
