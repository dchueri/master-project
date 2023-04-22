import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    const username = req.headers.user;
    return await this.projectsService.create(createProjectDto, username);
  }

  @Get()
  async findAll(@Request() req) {
    const username = req.headers.user;
    return await this.projectsService.findAllUsersProjects(username);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.projectsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req,
  ) {
    const username = req.headers.user;
    return await this.projectsService.update(id, updateProjectDto, username);
  }

  @Patch(':id/done')
  @HttpCode(HttpStatus.NO_CONTENT)
  async setAsDone(@Param('id') id: string, @Request() req) {
    const username = req.headers.user;
    return await this.projectsService.setAsDone(id, username);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Request() req) {
    const username = req.headers.user;
    return await this.projectsService.remove(id, username);
  }
}
