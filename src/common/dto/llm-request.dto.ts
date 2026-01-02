import { IsEnum, IsString, IsNotEmpty, Validate, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AiProvider } from '../enums/llm.provider.enum';
import { LlmModel, ProviderModelMap } from '../enums/llm-model.enum';

@ValidatorConstraint({ name: 'IsModelForProvider', async: false })
class IsModelForProviderConstraint implements ValidatorConstraintInterface {
    validate(model: LlmModel, args: ValidationArguments) {
        const object = args.object as LlmRequestDto;
        const provider = object.provider;

        const validModels = ProviderModelMap[provider];
        return validModels ? validModels.includes(model) : false;
    }

    defaultMessage(args: ValidationArguments) {
        const object = args.object as LlmRequestDto;
        return `Model '${args.value}' is not valid for provider '${object.provider}'. Valid models are: ${ProviderModelMap[object.provider]?.join(', ')}`;
    }
}

export class LlmRequestDto {
    @ApiProperty({ enum: AiProvider, example: AiProvider.GOOGLE })
    @IsEnum(AiProvider)
    @IsNotEmpty()
    provider: AiProvider;

    @ApiProperty({ enum: LlmModel, example: LlmModel.GEMINI_2_5_FLASH })
    @IsEnum(LlmModel)
    @Validate(IsModelForProviderConstraint)
    model: LlmModel;

    @ApiProperty({ description: 'ID of the prompt to use' })
    @IsString()
    @IsNotEmpty()
    promptId: string;

    // Optional: Add common parameters like temperature
    // @IsNumber()
    // @IsOptional()
    // temperature?: number;
}