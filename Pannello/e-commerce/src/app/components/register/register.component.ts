import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  constructor(private _register: RegisterService) {}
  userRegForm!: FormGroup;
  ngOnInit(): void {
    this.setForm();
  }
  setForm() {
    this.userRegForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }
  registrazione() {
    console.log(this.userRegForm.value);
    console.log(this.userRegForm.valid);
     if (this.userRegForm.valid) {
      console.log(this.userRegForm.value);
      this._register
        .registerUser(this.userRegForm.value)
        .subscribe((data: any) => {
          console.log(data);
          this.userRegForm.reset();
          alert(data.msg);
        });
    } else {
      alert('Si prega di compilare i dettagli validi..!');
    }
  }
}


