import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit{
  constructor(private _AuthService:AuthService, private _Router:Router){}
  isLoading:boolean = false;
  msgError!:string
  registerForm: FormGroup = new FormGroup({first_name: new FormControl(null, [ Validators.required, Validators.minLength(2),Validators.maxLength(25), ]),
    last_name: new FormControl(null, [ Validators.required,  Validators.minLength(2),  Validators.maxLength(25),]),
    age: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(80), ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [ Validators.required,  Validators.minLength(2), Validators.maxLength(10), Validators.pattern(/^[A-Z][\w]{1,10}$/),]),
  });
  ngOnInit(): void {
  }

  submitRegisterForm(registerForm:FormGroup){
    // console.log(registerForm);
    if(registerForm.valid){
      this._AuthService.registerForm(registerForm.value).subscribe((response)=>{
        if(response.message == 'success')
        {
          this._Router.navigate(['login']);
        }
        else{
          this.msgError = response.errors.email.message;
        }
      });
    }
  }
}
















