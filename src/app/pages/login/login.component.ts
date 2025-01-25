import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message, MessageModule } from 'primeng/message';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    ReactiveFormsModule,
    ToastModule,
    MessageModule,
    ConfirmDialogModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg!: String;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {
    // Initialize any necessary data or state here
    if (!environment.production) {
      console.log('LoginComponent initialized');
    }
    this.authService.logout();
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      console.log('Formulario inválido');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Formulario inválido',
        life: 3000,
      });
    }

    if (!environment.production)
      console.log('Formulario válido', this.loginForm.value);

    this.authService
      .login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe({
        next: (redirect) => {
          if (!environment.production)
            console.log(`redirecto: ${redirect.role}`);
          if (redirect.role == 'admin') this.router.navigate(['report']);
          else this.router.navigate(['executive']);
        },
        error: (error) => {
          if (!environment.production) console.log(error);
          this.errorMsg = 'Usuario o password incorrectas';
        },
      });
  }

  olvido() {
    this.confirmationService.confirm({
      header: 'Información',
      message: `Favor solicitar contraseña al administrador del sistema.<br/>admin@leadtrack.cl`,
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectVisible: false,
      acceptButtonProps: {
        label: 'OK',
      },
    });
  }
}
