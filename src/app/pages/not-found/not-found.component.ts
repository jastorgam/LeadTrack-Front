import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-not-found',
  imports: [ButtonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor(private router: Router, private authService: AuthService) {}
  home() {
    const role = this.authService.getRole();

    if (role == 'admin') this.router.navigate(['report']);
    else if (role == 'executive') this.router.navigate(['executive']);
    else this.router.navigate(['login']);
  }
}
