import { Prospect, Company } from './../../models/api.model';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { LeadService } from '../../services/lead.service';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UpdateProspect } from '../../models/update.model';
import { MessageHelperService } from '../../services/message-helper.service';

@Component({
  selector: 'app-editlead',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: './editlead.component.html',
  styleUrl: './editlead.component.scss',
})
export class EditleadComponent {
  prospectForm!: FormGroup;
  prospect!: Prospect;
  newprospect!: UpdateProspect;

  constructor(
    private fb: FormBuilder,
    private leadService: LeadService,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private msjHelper: MessageHelperService
  ) {
    this.getStateData();
  }

  ngOnInit() {}

  fillForms() {
    this.prospectForm = this.fb.group({
      name: [this.prospect.name, Validators.required],
      lastName: [this.prospect.lastName, Validators.required],
      email: [
        this.prospect.emails[0].address,
        [Validators.required, Validators.email],
      ],
      phone: [
        this.prospect.phones?.[0]?.phoneNumber,
        [Validators.pattern(/^(\+?56)?9\d{8}$/)],
      ],
      companyName: [
        { value: this.prospect.company.name, disabled: true },
        Validators.required,
      ],
      position: [this.prospect.position, Validators.required],
      linkedin: [
        this.prospect.socialNetworks[0].url,
        Validators.pattern(/https?:\/\/(www\.)?linkedin\.com\/.+/),
      ],
      companySize: [{ value: this.prospect.company.size, disabled: true }],
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.prospectForm.get(controlName);
    return !!control?.invalid && !!control?.touched;
  }

  onSubmit() {
    if (this.prospectForm.valid) {
      console.log('Datos enviados:', this.prospectForm.value);

      this.fillUpdateProspect();
      this.confirmUpdate();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Formulario inválido.',
        life: 3000,
      });
    }
  }

  private fillUpdateProspect() {
    this.newprospect = {
      id: this.prospect.id,
      name: this.prospectForm.value.name,
      lastName: this.prospectForm.value.lastName,
      fullName: `${this.prospectForm.value.name} ${this.prospectForm.value.lastName}`,
      emails: [
        {
          address: this.prospectForm.value.email,
          type: 'Personal',
          valid: true,
        },
      ],
      phones: [
        {
          phoneNumber: this.prospectForm.value.phone,
          type: 'Personal',
          valid: true,
        },
      ],
      company: this.prospect.company,
      position: this.prospectForm.value.position,
      socialNetworks: [
        { type: 'Linkedin', url: this.prospectForm.value.linkedin },
      ],
      dateModify: new Date(),
      userModify: this.authService.getUserName(),
    };
  }

  private callUpdate() {
    this.leadService.updateProspect(this.newprospect).subscribe({
      next: (data: Prospect) => {
        this.prospect = data;

        this.msjHelper.add({
          severity: 'info',
          summary: 'Información',
          detail: 'Datos actualizados.',
          life: 3000,
        });
        this.router.navigate(['contact'], { state: { data: this.prospect } });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al actualizadr datos.',
          life: 3000,
        });
      },
    });
  }

  private confirmUpdate() {
    this.confirmationService.confirm({
      message: 'Seguro de actualizar?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Actualizar',
      },
      accept: () => {
        this.callUpdate();
      },
      reject: () => {
        this.msjHelper.add({
          severity: 'info',
          summary: 'Información',
          detail: 'Modificación cancelada',
          life: 3000,
        });
        this.router.navigate(['contact'], { state: { data: this.prospect } });
      },
    });
  }

  getStateData(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.prospect = navigation.extras.state['data'];
      console.log('Datos recibidos:', this.prospect);
      this.fillForms();
    } else {
      console.log('No hay datos en el state.');
      this.router.navigate(['contact']);
    }
  }

  volver() {
    this.router.navigate(['contact'], { state: { data: this.prospect } });
  }

  hasError(field: string, errorType: string) {
    return this.prospectForm.get(field)?.hasError(errorType);
  }
}
