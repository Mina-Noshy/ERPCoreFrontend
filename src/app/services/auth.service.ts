import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthorize():boolean
  {
    let curr_user = localStorage.getItem('user_info');
    
    if(curr_user) return true;
    else return false;
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

  getUsername():string
  {
    let username = localStorage.getItem("user_info");
    if(username) return username;
    else return "";
  }
}
