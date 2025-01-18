import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean = true;
  role: string | null | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    console.log('Role', this.role);
  }

  home() {
    console.log('Role', this.role);
    this.router.navigate([this.authService.getRole()]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
