import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //registeredUser = {email:'',password:''}
  registerUserDetails={email:'',password:''};
  registerForm = this.fb.group(
    {
      email:['',[Validators.required,Validators.pattern('')]],
      password:['',[Validators.required,Validators.minLength(6)]]
    }
  )
  constructor(private _auth:AuthService,private _router:Router,private fb:FormBuilder) { }
  registerUser()
  {
    console.log(this.registerForm.value);
    this._auth.registerUser(this.registerForm.value)
    .subscribe(
      res=> {console.log(res);
      localStorage.setItem('token',res.token);
      this._router.navigate(['/login'])
    },
      err=>console.log(err)
    )
  }
  ngOnInit(): void {
  }

}
