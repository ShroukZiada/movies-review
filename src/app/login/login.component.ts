import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private _AuthService:AuthService, private _Router:Router){}
  isLoading:boolean = false;
  msgError!:string
  logInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
      Validators.pattern(/^[A-Z][\w]{1,10}$/), ]),
  });
  ngOnInit(): void {}


  submitlogInForm(logInForm:FormGroup){
    // console.log(registerForm);
    if(logInForm.valid){
      this._AuthService.logInForm(logInForm.value).subscribe((response)=>{
        if(response.message == 'success')
        {
          localStorage.setItem('userToken', response.token);
          this._AuthService.saveUserData();
          this._Router.navigate(['home']);
        }
        else{
          this.msgError = response.errors.email.message;
        }
      });
    }
  }

}
