import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from '../Validators/confirmpassword';
import { AuthServicesService } from '../AuthServices/auth-services.service'
import Swal from 'sweetalert2';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.scss']
})
export class RegisterpageComponent implements OnInit {
  token: boolean = true;
  loading: boolean = false;
  registerform = new FormGroup({})
  phone_number : any
  constructor(private fb: FormBuilder, private registerService: AuthServicesService, private router : Router) { }

  ngOnInit(): void {
    this.registerform = this.createform()
  }
  createform() {
    return this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]],
      phone_code : ['+963'],
      phone_iso_code : ['sy'],
      phone_number : ['957770047'],
      account_type: ['user'],
      firebase_token : ['token'],
      date_of_birth : ['1990/01/01']
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
  onSubmit() {
    this.loading= true;
    let body = {
      first_name: this.registerform.get('first_name')?.value,
      last_name: this.registerform.get('last_name')?.value,
      email: this.registerform.get('email')?.value,
     password: this.registerform.get('password')?.value,
     password_confirmation: this.registerform.get('password_confirmation')?.value,
     phone_code : this.registerform.get('phone_code')?.value,
     phone_iso_code : this.registerform.get('phone_iso_code')?.value,
     phone_number: this.registerform.get('phone_number')?.value,
     account_type : this.registerform.get('account_type')?.value,
     firebase_token : this.registerform.get('firebase_token')?.value,
     date_of_birth : this.registerform.get('date_of_birth')?.value

  }
    this.registerService.register(body).subscribe(
    resp => { 
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Registered successfully'
      })
      this.loading = false;
      this.router.navigate(['/'])
     },
     error =>{
      Swal.fire({
        icon: 'error',
        title: 'Registeration not complete!',
        text: 'Please Try again',
      })
      this.loading = false;
     }

  )

  }
  get firstname(){
  return this.registerform.get('first_name')
}
  get lastname(){
  return this.registerform.get('last_name')
}
  get email(){
  return this.registerform.get('email')
}
  get password(){
  return this.registerform.get('password')
}
  get confirmPassword(){
  return this.registerform.get('password_confirmation')
}


}
