import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-unauthorized',
  imports: [ButtonModule],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss',
})
export class UnauthorizedComponent {
  constructor(private router: Router, private authService: AuthService) {}
  home() {
    const role = this.authService.getRole();

    if (role == 'admin') this.router.navigate(['report']);
    else if (role == 'executive') this.router.navigate(['executive']);
    else this.router.navigate(['login']);
  }
}
