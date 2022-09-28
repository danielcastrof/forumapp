/* eslint-disable prettier/prettier */
const axios = require('axios');
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnswersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAnswerDto: CreateAnswerDto) {
    const answer = {
      ...createAnswerDto,
    }

    let info_user = await this.findUser(answer.token).then((res) => {
      if(res['data']['type'] === 'success') return res['data']['data'].id
    }).catch((error)=> {
       throw new HttpException('User not found', 404)
    })

    delete answer.token

    const data = new Date();

    const br = new Date(data.setHours(data.getHours() - 3));
    info_user = `${info_user}`
    const created = await this.prisma.answers.create({
      data: {...answer, createdAt: br, updatedAt: br, userId: info_user},
    })
    return created;
  }

  async findUser(xAccesstoken: string) {
    return await axios.post('https://woem7k63g7.execute-api.us-east-1.amazonaws.com/dev/my_user', 
      {},
      {
        headers: {
          'X-Access-token': xAccesstoken,
        }
      }
    ).then(function (resp) {
      return resp
    }).catch(function (error) {
      return error;
    });
  }

  async findAll() {
    const finds = await this.prisma.answers.findMany();

    return finds;
  }

  async findOne(id: string) {
    const find = await this.prisma.answers.findUnique({where: {id: id}});
    
    return find;
  }

  async findByUser(userId: string) {
    const find = await this.prisma.answers.findMany({where: {userId: userId}});

    return find;
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.findOne(id);

    const data = new Date();

    const br = new Date(data.setHours(data.getHours() - 3));

    const attTopic = await this.prisma.answers.update({
      where: {id: answer.id},
      data: {...updateAnswerDto, id: answer.id, createdAt: answer.createdAt, updatedAt: br, userId: answer.userId},
    })
    return attTopic;
  }

  async remove(id: string) {
    const answer = await this.findOne(id);
    const topic = await this.prisma.topics.findUnique({where: {id: answer.topicId}});

    await this.prisma.answers.delete({where: {id: answer.id}});
    return `A resposta ao tópico ${topic.theme} foi deletada com sucesso!`;
  }

  async findByTopic(topicId: string) {     const finds = await this.prisma.answers.findMany({where: {topicId: topicId}});      return finds;   }
}
