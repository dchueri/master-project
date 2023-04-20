import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserNotFoundException from 'src/users/exceptions/user-not-found.exception';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}
  async create(createProjectDto: CreateProjectDto, username: string) {
    try {
      const project = await this.projectsRepository.create({
        ...createProjectDto,
        username,
      });
      return await this.projectsRepository.save(project);
    } catch {
      throw new UserNotFoundException(username);
    }
  }

  async findAllUsersProjects(username: string) {
    return await this.projectsRepository.findBy({ username });
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
