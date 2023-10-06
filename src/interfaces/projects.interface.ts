export interface IProject {
  id: number;
  name: string;
  description: string;
  repository: string;
  startDate: Date;
  endDate?: Date | null;
  developerId?: number | null;
}

export type TUpdateProject = Partial<IProject>;

export interface IProjectCreate {
  id: number;
  name: string;
  description: string;
  repository: string;
  startDate: Date;
  endDate: Date;
  developerName: number;
}
