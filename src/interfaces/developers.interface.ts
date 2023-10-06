import { QueryResult } from "pg";

export interface IDevelopers {
  id: number;
  name: string;
  email: string;
}

export type TDevelopersUpdate = Partial<Pick<IDevelopers, "name" | "email">>;

export type TClientResult = QueryResult<IDevelopers>;

export type SO = "Windows" | "Linux" | "MacOs";

export interface IDeveloperInfos {
  id: number;
  developerSince: Date;
  preferredOS: SO;
  developerId: number | null;
}

export type TDeveloperBody = Partial<
  Pick<IDeveloperInfos, "developerSince" | "preferredOS">
>;

export type TDeveloperInfos = Omit<IDeveloperInfos, "id">;

export type TClientResultInfos = QueryResult<IDeveloperInfos>;
