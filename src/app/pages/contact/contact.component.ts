import { Component } from '@angular/core';
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
import { Router } from '@angular/router';
import { Prospect } from '../../models/api-response';

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
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  seccion1Form: FormGroup;
  seccion2Form: FormGroup;
  data!: Prospect;

  constructor(private fb: FormBuilder, private router: Router) {
    this.getStateData();

    this.seccion1Form = this.fb.group({
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

    this.seccion2Form = this.fb.group({
      fecha: [Date.now, Validators.required],
      tipoContacto: ['', Validators.required],
      notas: [''],
      contesto: [false],
    });
  }

  getStateData(): void {
    // Recupera los datos del state
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.data = navigation.extras.state['data'];
      console.log('Datos recibidos:', this.data);
    } else {
      console.log('No hay datos en el state.');
    }
  }

  guardarSeccion1() {
    if (this.seccion1Form.valid) {
      console.log('Datos de la sección 1:', this.seccion1Form.value);
    } else {
      console.log('Formulario de la sección 1 inválido');
    }
  }

  guardarSeccion2() {
    if (this.seccion2Form.valid) {
      console.log('Datos de la sección 2:', this.seccion2Form.value);
    } else {
      console.log('Formulario de la sección 2 inválido');
    }
  }

  limpiarSeccion2() {
    this.seccion2Form.reset();
  }
}
