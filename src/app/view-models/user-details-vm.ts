import { PermissionListVM } from "./permission-list-vm";

export class UserDetailsVM
{
    userId?:string;
    isAuthenticated?: boolean;
    message?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    whatsapp?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    expiresOn?: string;
    refreshTokenExpiration?: string;
    refreshToken?: string;

    roles?: string[];
    permissions?:PermissionListVM[]
}
