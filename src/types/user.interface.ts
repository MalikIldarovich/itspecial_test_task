export enum IUsersFields {
  first_name = "Имя",
  last_name = "Фамилия",
  role = "Роль",
  phone = "Телефон",
  date_created = "Дата создания",
  date_updated = "Дата обновления",
}

export enum IUsersRoles {
  worker = "Работник",
  chief = "Начальник",
}

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  profile_image: string | null;
  role: keyof typeof IUsersRoles | "";
  phone: string | null;
  date_created: string | Date;
  date_updated: string | Date | null;
}
