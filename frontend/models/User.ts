import { UserType } from "../../shared/models/UserType";

export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    first_name: string;
    last_name: string;
    type: UserType;
}
  