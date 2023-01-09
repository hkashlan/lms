import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from '../Validators/confirmpassword';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {

loginFrom = new FormGroup({})
  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {

  }
  logincord(){
return this.fb.group(
  {
    first_name : ['',[Validators.required]],
    last_name : ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]],
    password : ['', Validators.required],
    confirm_password : ['',[Validators.required]]



  },
  {
    validators: [
      MatchPassword('password', 'password_confirmation'),
    ],
    asyncValidators: [],
    updateOn: 'change'

  }
)
  }

}
