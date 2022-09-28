/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateAnswerDto {
    @ApiProperty({example: '1', description: 'Id do usuário'})
    userId: string;

    @ApiProperty({example: '1', description: 'Id do tópico'})
    @IsString()
    topicId: string;

    @ApiProperty({example: 'Para resolução do problema basta baixar o patch na versão x no site oficial do game e instalar manualmente', description: 'Detalhamento da resposta'})
    @IsString()
    answer: string;

    token?: string
}
