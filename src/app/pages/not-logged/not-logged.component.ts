import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-not-logged',
  imports: [ButtonModule, RouterModule],
  templateUrl: './not-logged.component.html',
  styleUrl: './not-logged.component.scss',
})
export class NotLoggedComponent {}
