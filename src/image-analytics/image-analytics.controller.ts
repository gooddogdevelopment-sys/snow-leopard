import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { ImageAnalyticsService } from './image-analytics.service';
import { LlmRequestDto } from 'src/common/dto/llm-request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadDto } from './dto/image-upload.dto';
@ApiTags('Image Analytics')
@Controller('image-analytics')
export class ImageAnalyticsController {
  constructor(private readonly imageAnalyticsService: ImageAnalyticsService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new image analytics' })
  @ApiResponse({ status: 201, description: 'Image analytics created' })
  @ApiBody({
    type: ImageUploadDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async subjectIdentification(
    @UploadedFile() file: Express.Multer.File,
    @Body() aiRequestDto: LlmRequestDto,
  ): Promise<any> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    return this.imageAnalyticsService.analyzeImage(
      base64Image,
      aiRequestDto.provider,
      aiRequestDto.model,
      aiRequestDto.promptId,
    );
  }
}
