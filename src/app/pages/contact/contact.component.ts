import { Interaction } from '../../models/api.model';
import { afterNextRender, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Prospect } from '../../models/api.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LeadService } from '../../services/lead.service';
import { AuthService } from '../../services/auth.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-contact',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    CommonModule,
    ToastModule,
    TableModule,
    RouterModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  formProspect!: FormGroup;
  formInteraction!: FormGroup;
  data!: Prospect;
  prospect!: Prospect;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private leadService: LeadService,
    private authService: AuthService
  ) {
    this.getStateData();
  }

  ngOnInit(): void {
    // this.getStateData();
  }

  private fillForms() {
    this.formProspect = this.fb.group({
      nombre: [this.data.fullName, Validators.required],
      email: [
        this.data.emails[0].address,
        [Validators.required, Validators.email],
      ],
      telefono: [this.data.phones?.[0]?.phoneNumber],
      empresa: [this.data.company.name, Validators.required],
      cargo: [this.data.position, Validators.required],
      linkedin: [this.data.socialNetworks?.[0]?.url],
      tamanoEmpresa: [this.data.company.size, Validators.required],
    });

    this.formInteraction = this.fb.group({
      fecha: [new Date(), Validators.required],
      tipoContacto: [null, Validators.required],
      notas: [null, Validators.required],
      contesto: [false, Validators.required],
    });
  }

  getStateData(): void {
    // Recupera los datos del state
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.data = navigation.extras.state['data'];
      this.prospect = this.data;
      console.log('Datos recibidos:', this.data);

      this.leadService.getProspect(this.data.id).subscribe({
        next: (data: Prospect) => {
          this.prospect = data;
          this.fillForms();
        },
      });
    } else {
      console.log('No hay datos en el state.');

      this.router.navigate(['executive']);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Errro al recibir datos',
        life: 3000,
      });
    }
  }

  saveProspect() {
    if (this.formProspect.valid) {
      console.log('Datos de la sección:', this.formProspect.value);
    } else {
      console.log('Formulario de la sección 1 inválido');
    }
  }

  saveInteraction() {
    if (!this.formInteraction.valid) {
      this.formInteraction.markAllAsTouched();
      return;
    }
    console.log('Datos de la sección:', this.formInteraction.value);

    let inter: Interaction;
    inter = {
      userName: this.authService.getUserName(),
      date: this.formInteraction.get('fecha')?.value,
      answer: this.formInteraction.get('contesto')?.value,
      notes: this.formInteraction.get('notas')?.value,
      prospectId: this.prospect.id,
      type: this.formInteraction.get('tipoContacto')?.value,
    };

    inter.type = inter.type === 'Email' ? 'Email' : 'Call';

    this.leadService.addInteraction(inter).subscribe({
      next: (data: Prospect) => {
        if (data.id != null) {
          this.leadService.getProspect(data.id).subscribe({
            next: (data) => {
              this.prospect = data;
              this.messageService.add({
                severity: 'info',
                summary: 'Información',
                detail: 'Datos guardados',
                life: 3000,
              });
              this.limpiarInteraction();
            },
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error,
                life: 3000,
              });
            },
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al guardar intercción',
          life: 3000,
        });
      },
      complete: () => {
        console.log('completado');
      },
    });
  }

  limpiarInteraction() {
    this.formInteraction.reset();
    this.formInteraction.get('date')?.setValue(new Date());
  }
}
