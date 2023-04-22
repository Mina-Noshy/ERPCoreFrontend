import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthorize():boolean
  {
    return false;
  }

  login():boolean
  {
    localStorage.setItem("user_info", "mina");
    return true;
  }

  logout():boolean
  {
    localStorage.removeItem("user_info");
    return true;
  }

  register():boolean
  {
    localStorage.setItem("user_info", "mina");
    return true;
  }
}
