import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/Authservice/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedComponent } from '../shared/conformModal.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private AuthService: AuthService,
    private modalService: NgbModal
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }
  userLogin() {
    this.AuthService.authenticateUser(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).subscribe(
      (user: any) => {
        if (user) {
          console.log(user);
          const loginModal = this.modalService.open(SharedComponent);
          loginModal.componentInstance.login = 'Login Successful';
          loginModal.result.then((result) => {
            if (result === true) { 
              localStorage.setItem('loggedUser', JSON.stringify(user));
              this.router.navigate(['']);
            }
          });
        }
      },
      (err: any) => {
        alert('Something went wrong');
      }
    );
  }
}
