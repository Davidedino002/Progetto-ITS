import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  url = 'http://localhost:5000/api/v1/register';
  constructor(private http: HttpClient) {}
  registerUser(data: any) {
    return this.http.post(this.url, data);
  }
}
