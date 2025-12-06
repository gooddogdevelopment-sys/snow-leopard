import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AiProvider } from '../../llm/enums/ai-provider.enum';

export class AnalyzeImageDto {
  @ApiProperty({
    description: 'AI provider to use',
    enum: AiProvider,
    example: AiProvider.GOOGLE,
  })
  @IsEnum(AiProvider)
  provider: AiProvider;

  @ApiProperty({
    description: 'Specific model name to use',
    example: 'gemini-1.5-flash',
    required: false,
  })
  @IsOptional()
  @IsString()
  modelName?: string;

  @ApiProperty({
    description: 'Custom prompt for image analysis',
    example: 'Describe the objects and colors in this image',
    required: false,
  })
  @IsOptional()
  @IsString()
  customPrompt?: string;
}
