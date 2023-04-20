import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserNotFoundException from 'src/users/exceptions/user-not-found.exception';
import { Repository } from 'typeorm';
import { ViaCepApi } from '../utils/viacep-api';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import ProjectNotFoundException from './exceptions/project-found.exception';
import { IProject } from './projects.interfaces';

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

  async findOne(id: string) {
    try {
      const project = await this.projectsRepository.findOneBy({ id });
      const local = await ViaCepApi.getLocalByZipCode(project.zip_code);
      return new IProject(project, local);
    } catch {
      throw new ProjectNotFoundException(id);
    }
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
