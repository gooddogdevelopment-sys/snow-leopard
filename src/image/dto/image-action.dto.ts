import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AiProvider } from '../../llm/enums/ai-provider.enum';

export class ImageActionDto {
  @ApiProperty({
    description: 'The action to perform on the image',
    example: 'Describe this image in detail',
  })
  @IsString()
  @IsNotEmpty()
  action: string;

  @ApiProperty({
    description: 'URL of the image to process',
    example: 'https://example.com/sample-image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({
    description: 'Additional context for the image processing',
    example: 'Focus on identifying objects and colors',
    required: false,
  })
  @IsOptional()
  @IsString()
  additionalContext?: string;

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
