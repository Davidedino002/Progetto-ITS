import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.setForm();
  }
  constructor(private _router: Router, private _login: LoginService) {}
  setForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  invia() {
    if (this.loginForm.valid) {
      this._login.loginUser(this.loginForm.value).subscribe({
        next: (resp: any) => {
          console.log(resp);

          localStorage.setItem('Nome', resp.result.Nome);
          localStorage.setItem('Cognome', resp.result.Cognome);
          localStorage.setItem('email', resp.result.email);
          localStorage.setItem('id', resp.result._id);
          localStorage.setItem('token', resp.token);

          let timerInterval: any;

          Swal.fire({
            position: 'top-end',
            title: 'Login Ricevuto con Successo!',
            html: 'I will close in <b></b> milliseconds.',
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
              (Swal.getConfirmButton());
              const timer: any = Swal.getPopup()?.querySelector('b');
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer');
              this._router.navigate(['home',])
            }
          });

        
        },
        error: (err) => {
          if (err.status == 500) {
              Swal.fire({
              title: "Login Fallito",
              text: err.error.msg,
              icon: "error"
            });
          }
        },
      });
    }
  }
}
