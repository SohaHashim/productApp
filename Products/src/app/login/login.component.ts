import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserDetails={email:'',password:''};
  loginForm = this.fb.group(
    {
      email:['',[Validators.required,Validators.pattern('')]],
      password:['',[Validators.required,Validators.minLength(6)]]
    }
  )
  constructor(private _auth:AuthService,private _router:Router,private fb:FormBuilder) { }
  loginUser(){
    console.log(this.loginForm.value);
    this._auth.loginUser(this.loginForm.value)
    .subscribe(
      res=> {console.log(res);
      localStorage.setItem('token',res.token);
      this._router.navigate(['/'])
    },
      err=>console.log(err)
    )
  }
  ngOnInit(): void {
  }

}
