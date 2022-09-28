/* eslint-disable prettier/prettier */
import { IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { Category } from "../entities/category.enum";

export class CreateTopicDto {

    token?: string

    @ApiProperty({example: '1', description: 'Id do jogo'})
    @IsString()
    gameId: string;
    
    @ApiProperty({example: '1', description: 'Id do usuário'})
    userId: string | number;
    
    @ApiProperty({example: 'Bug na missão X do GTA V', description: 'Temática do tópico'})
    @IsString()
    theme: string;
    
    @ApiProperty({example: 'A missão X do GTA V atualmente está bugada, podendo ser concluída automaticamente através de cheats', description: 'Detalhamento do tópico'})
    @IsString()
    question: string;
    
    @ApiProperty({example: 'noticias', description: 'Categoria do tópico'})
    @IsString()
    category: Category;
}
