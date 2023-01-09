import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  constructor(private http: HttpClient) {
    
   }
   
   register(data: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    let requestOptions = { headers: headers };
    const url = 'http://192.168.0.46:8000/api/sign-up';
    return this.http.post(url ,data  )
   }
}
