import { IUser } from "@/types/user.interface";

export interface IEmitDataText {
  name: keyof Pick<IUser, "first_name" | "last_name">;
  value: string;
}
export interface IEmitDataFile {
  name: "file_image";
  value: File;
}
export interface IEmitDataError {
  name: keyof Pick<IUser, "first_name" | "last_name" | "role">;
  value: boolean;
}
