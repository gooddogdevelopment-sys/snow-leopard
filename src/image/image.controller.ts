import {
  Controller,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { ImageActionDto } from './dto/image-action.dto';
import { AnalyzeImageDto } from './dto/analyze-image.dto';
import { EstimateAgeDto } from './dto/estimate-age.dto';
import { ChatResponseDto } from './dto/chat-response.dto';

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('process')
  @ApiOperation({ summary: 'Process an image with LLM' })
  @ApiResponse({
    status: 200,
    description: 'Image processed successfully',
  })
  async processImage(@Body() dto: ImageActionDto) {
    return this.imageService.processImage(dto);
  }

  @Post('analyze')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Analyze an image with AI vision model' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file to analyze',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Image analyzed successfully',
    type: ChatResponseDto,
  })
  async analyzeImage(
    @UploadedFile() file: Express.Multer.File,
    @Query() dto: AnalyzeImageDto,
  ): Promise<ChatResponseDto> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    return this.imageService.analyzeImage(
      base64Image,
      dto.provider,
      dto.modelName,
      dto.customPrompt,
    );
  }

  @Post('estimate-age')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Estimate age from an image' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file containing a person',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Age estimated successfully',
    type: ChatResponseDto,
  })
  async estimateAge(
    @UploadedFile() file: Express.Multer.File,
    @Query() dto: EstimateAgeDto,
  ): Promise<ChatResponseDto> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    return this.imageService.estimateAge(base64Image, dto.provider, dto.modelName);
  }
}
