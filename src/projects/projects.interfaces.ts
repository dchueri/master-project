import { Project } from './entities/project.entity';

export class IProject {
  id: string;
  title: string;
  localization: string;
  deadline: Date;
  cost: number;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(project: Project, localization: string) {
    this.id = project.id;
    this.title = project.title;
    this.localization = localization;
    this.deadline = project.deadline;
    this.cost = project.cost;
    this.done = project.done;
    this.createdAt = project.createdAt;
    this.updatedAt = project.updatedAt;
  }
}
