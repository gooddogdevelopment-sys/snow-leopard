import { ApiProperty } from '@nestjs/swagger';

export class ChatResponseDto {
  @ApiProperty({
    description: 'AI provider used',
    example: 'google',
  })
  provider: string;

  @ApiProperty({
    description: 'Model name used',
    example: 'gemini-1.5-flash',
  })
  model: string;

  @ApiProperty({
    description: 'Response content from the AI',
    example: 'This image shows a beautiful sunset over the ocean...',
  })
  responseContent: string;
}
