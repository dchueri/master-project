import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ProjectNotFoundException from '../common/exceptions/project-found.exception';
import { ViaCepApi } from '../utils/viacep-api';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { IProject } from './projects.interface';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}
  async create(createProjectDto: CreateProjectDto, username: string) {
    const project = await this.projectsRepository.create({
      ...createProjectDto,
      username,
    });
    return await this.projectsRepository.save(project);
  }

  async findAllUsersProjects(username: string) {
    return await this.projectsRepository.findBy({ username });
  }

  async findOne(id: string) {
    const project = await this.projectsRepository.findOneBy({ id });
    if (!project) {
      throw new ProjectNotFoundException(id);
    }
    const local = await ViaCepApi.getLocalByZipCode(project.zip_code);
    return new IProject(project, local);
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    username: string,
  ) {
    const project = await this.projectsRepository.findOneBy({ username, id });
    if (!project) {
      throw new ProjectNotFoundException(id);
    }
    await this.projectsRepository.update(id, updateProjectDto);
    const updatedProject = await this.projectsRepository.findOneBy({ id });
    return updatedProject;
  }

  async setAsDone(id: string, username: string) {
    const project = await this.projectsRepository.findOneBy({ username, id });
    if (!project) {
      throw new ProjectNotFoundException(id);
    }
    await this.projectsRepository.update(id, { done: true });
  }

  async remove(id: string, username: string) {
    const result = await this.projectsRepository.delete({ id, username });
    if (result.affected === 0) {
      throw new ProjectNotFoundException(id);
    }
  }
}
