/* eslint-disable prettier/prettier */
const axios = require('axios');
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicsService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createTopicDto: CreateTopicDto) {
    const topic = {
      ...createTopicDto,
    }
    
    let info_user = await this.findUser(topic.token).then((res) => {
      if (res['data']['type'] === 'success') return res['data']['data'].id
    }).catch((error) => {
      throw new HttpException('User not found', 404)
    })

    delete topic.token

    const game = await this.findGame(topic.gameId)
    const gameId = `${game.id}`
    if(gameId === 'undefined') throw new HttpException('Game not found', 404)

    const data = new Date();

    const br = new Date(data.setHours(data.getHours() - 3));
    info_user = `${info_user}`
    const created = await this.prisma.topics.create({
      data: { ...topic, createdAt: br, updatedAt: br, userId: info_user, gameId: gameId },
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
    const finds = await this.prisma.topics.findMany();

    return finds;
  }

  async findOne(id: string) {
    const find = await this.prisma.topics.findUnique({ where: { id: id } });

    return find;
  }

  async findByCategory(category: string) {
    const find = await this.prisma.topics.findMany({ where: { category: category } });

    return find;
  }

  async findByUser(userId: string) {
    const find = await this.prisma.topics.findMany({ where: { userId: userId } });

    return find;
  }

  async update(id: string, updateTopicDto: UpdateTopicDto) {
    const topic = await this.findOne(id);

    const data = new Date();

    const br = new Date(data.setHours(data.getHours() - 3));

    const attTopic = await this.prisma.topics.update({
      where: { id: topic.id },
      data: { ...updateTopicDto, id: topic.id, createdAt: topic.createdAt, updatedAt: br, userId: topic.userId },
    })
    return attTopic;
  }

  async findGame(gameId: string) {
    return await axios.get(`https://gameslibrary-production.up.railway.app/game/${gameId}`).then(function (response) {
      return response.data
    }).catch(function (error) {
      throw new HttpException('Game not found', 404)
    });
  }

  async remove(id: string) {
    const topic = await this.findOne(id);

    await this.prisma.topics.delete({ where: { id: topic.id } });
    return `Tópico ${topic.theme} deletado com sucesso!`;
  }
}
