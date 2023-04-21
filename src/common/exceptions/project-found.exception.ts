import { NotFoundException } from '@nestjs/common';

class ProjectNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Project with id ${id} not found`);
  }
}

export default ProjectNotFoundException;
