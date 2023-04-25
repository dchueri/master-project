import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Cria um novo projeto' })
  @ApiResponse({
    status: 201,
    description: 'Projeto criado',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados incompletos',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Headers('user') username: string,
  ) {
    return await this.projectsService.create(createProjectDto, username);
  }

  @ApiOperation({ summary: 'Pega todos os projetos do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Projetos carregados',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @Get()
  async findAll(@Headers('user') username: string) {
    return await this.projectsService.findAllUsersProjects(username);
  }

  @ApiOperation({ summary: 'Pega um projeto do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Projeto encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Projeto não encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.projectsService.findOne(id);
  }

  @ApiOperation({ summary: 'Edita um projeto do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Projeto autalizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Projeto não encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Headers('user') username: string,
  ) {
    return await this.projectsService.update(id, updateProjectDto, username);
  }

  @ApiOperation({ summary: 'Marca um projeto do usuário como DONE' })
  @ApiResponse({
    status: 204,
    description: 'Projeto autalizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Projeto não encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @Patch(':id/done')
  @HttpCode(HttpStatus.NO_CONTENT)
  async setAsDone(@Param('id') id: string, @Headers('user') username: string) {
    return await this.projectsService.setAsDone(id, username);
  }

  @ApiOperation({ summary: 'Excluí um projeto do usuário' })
  @ApiResponse({
    status: 204,
    description: 'Projeto removido',
  })
  @ApiResponse({
    status: 404,
    description: 'Projeto não encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Headers('user') username: string) {
    return await this.projectsService.remove(id, username);
  }
}
