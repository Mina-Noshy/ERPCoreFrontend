export class UserDetailsVM
{
    isAuthenticated?: boolean;
    message?: string;
    username?: string;
    email?: string;
    token?: string;
    expiresOn?: string;
    roles?: string[];
    refreshTokenExpiration?: string;
    refreshToken?: string;
}
