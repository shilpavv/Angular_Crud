import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/Authservice/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedComponent } from './shared/conformModal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router,private AuthService: AuthService,private modalService: NgbModal, ) {}
  shouldShowNavbar(): boolean {
    // Hide navbar on the login page
    return this.router.url !== '/login';
  }
  logout() {
    // Clear local storage
    const logoutModal = this.modalService.open(SharedComponent);
    // set the action message
    logoutModal.componentInstance.actionMessage = 'logout';
    logoutModal.result.then((result) => {
      if (result === true) {
        // The user clicked "OK" in the modal, navigate to the logout page
        localStorage.removeItem('loggedUser');
        this.router.navigate(['/login']); // Navigate to the login page
      }
    });
  }
}
