import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AiProvider } from '../../llm/enums/ai-provider.enum';

export class EstimateAgeDto {
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
}
