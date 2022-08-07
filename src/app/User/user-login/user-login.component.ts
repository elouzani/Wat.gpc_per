import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AlertifyService } from 'src/app/services/Alertify.service';
import { AuthServiceService } from 'src/app/services/AuthService.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {


  constructor(private authService: AuthServiceService , private alertify: AlertifyService,private router: Router ) { }

  ngOnInit() {
  }
  isUserValid : boolean =false;

  loginForm =new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[
      Validators.required,
      Validators.minLength(6)

    ])
  });

  get Email(): FormControl{
    return this.loginForm.get('email') as FormControl;
  }

  get Password():FormControl{
    return this.loginForm.get('password') as FormControl;
  }

  onLogin(){
     console.log(this.loginForm.value);
     this.authService.loginUser([this.loginForm.value.email,this.loginForm.value.password]).subscribe(res=> {
        if(res=='failure'){
          this.isUserValid=false;
          this.alertify.error("Login Unsuccesful");
        }else{
          this.isUserValid =true;

          this.authService.setToken(res);
          this.router.navigateByUrl('home');
          this.alertify.success('login succesful');

        }
     });
    // const token= this.authService.authUser((loginForm.value));
    // if(token){
    //   localStorage.setItem('token', token.userName);
    //   this.alertify.success('Login successful');
  // }

  }

}
