import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { AlertifyService } from 'src/app/services/Alertify.service';
import { AuthServiceService } from 'src/app/services/AuthService.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerationForm : FormGroup;
  userSubmitted : boolean;
  //user: User;
  constructor(private fb: FormBuilder,
              private alertify: AlertifyService, private authService: AuthServiceService,
              private router:Router) { }

  ngOnInit() {
    this.createRegisterationForm();
  }

  //Getter methods for all form controls
  get userName(){
    return this.registerationForm.get('userName') as FormControl;
  }
  get email(){
    return this.registerationForm.get('email') as FormControl;
  }

  get password(){
    return this.registerationForm.get('password') as FormControl;
  }
  get confirmPassword(){
    return this.registerationForm.get('confirmPassword') as FormControl;
  }
createRegisterationForm(){
  this.registerationForm= this.fb.group({
    userName :[null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(8)]],
    confirmPassword: [null, Validators.required]
  });

}

// userData() : User{
//   return this.user ={
//     userName : this.userName.value,
//     email : this.email.value,
//     password: this.password.value,

//   }

// }

passwordMatchingValidator(fg : FormGroup): Validators{
  return fg.get('password').value == fg.get('confirmPassword').value ? null : {notmatched :true}
}

  onSubmit(){
    console.log(this.registerationForm.value);
    // this.userSubmitted= true;
    // this.user =Object.assign(this.user, this.registerationForm.value);

      this.authService.registerUser([
        this.registerationForm.value.userName,
        this.registerationForm.value.email,
        this.registerationForm.value.password
      ]).subscribe(res => {
        if(res=='success'){
          this.alertify.success('Congrats, you are successfully registered');
          this.userSubmitted= true;
          this.router.navigateByUrl('login');

          this.registerationForm.reset();
        }else if(res =='Already exist'){
          this.alertify.warning('Acount already exist, Try another email');
          this.userSubmitted= false;
        } else{
          this.alertify.error('Kindly provide the required fields');
          this.userSubmitted= false;
        }

      });
      //this.userService.addUser(this.userData())

    // this.userSubmitted= false;



}
}
