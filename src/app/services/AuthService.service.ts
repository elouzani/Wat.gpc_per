import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

baseServerUrl = "https://localhost:44378/api/";
currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
constructor( private http : HttpClient) { }
jwtHelperService = new JwtHelperService();
registerUser(user: Array<string>){
 return this.http.post(this.baseServerUrl + "User/CreateUser",{
  userName: user[0],
  email: user[1],
  password: user[2]
 }, {
   responseType: 'text'
 });
}

loginUser(loginInfo:Array<string>){
  return this.http.post(this.baseServerUrl + "User/LoginUser",{
    email :loginInfo[0],
    password : loginInfo[1]
  },{
    responseType: 'text'
  });
}
setToken(token: string){
  localStorage.setItem("access_token", token);
  this.loadCurrentUser();
}

loadCurrentUser(){
const token = localStorage.getItem("access_token");
const userInfo = token != null ? this.jwtHelperService.decodeToken(token): null;
const data = userInfo ? {
 userName : userInfo.userName,
 email: userInfo.email
} :null;

this.currentUser.next(data);
}
}
