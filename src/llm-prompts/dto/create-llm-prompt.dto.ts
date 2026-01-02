import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateLlmPromptDto {
    @ApiProperty({
        description: 'The name of the prompt',
        maxLength: 50,
        example: 'summarize_text',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: 'The actual prompt text',
        example: 'Summarize the following text: {text}',
    })
    @IsString()
    @IsNotEmpty()
    prompt: string;

    @ApiProperty({
        description: 'Description of what the prompt does',
        maxLength: 100,
        required: false,
        example: 'Summarizes text into a concise paragraph',
    })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    description?: string;
}
