import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.scss',
  imports: [RouterModule, FooterComponent],
})
export class LoginLayoutComponent {}
