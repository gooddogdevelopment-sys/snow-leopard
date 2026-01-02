import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('llm_prompts')
export class LlmPrompt {
  @ApiProperty({
    example: 'uuid-v4-string',
    description: 'The unique identifier of the prompt',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'summarize_text',
    description: 'The name of the prompt',
  })
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string;

  @ApiProperty({
    example: 'Summarize this text: {text}',
    description: 'The actual prompt text',
  })
  @Column({ type: 'text', unique: true, nullable: false })
  prompt: string;

  @ApiProperty({
    example: 'Summarizes text into a concise paragraph',
    description: 'Description of what the prompt does',
    required: false,
    nullable: true,
  })
  @Column({ type: 'varchar', length: 100, nullable: true })
  description: string | null;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Creation date',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Last update date',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
