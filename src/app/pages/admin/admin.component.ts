import { Component, NgModule } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { LeadService } from '../../services/lead.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-admin',
  imports: [
    FileUploadModule,
    CommonModule,
    ButtonModule,
    ToastModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  uploadStatus: string = '';
  loading = false;

  constructor(
    private leadService: LeadService,
    private messageService: MessageService
  ) {}

  onFileSelect(event: any) {
    this.uploadStatus = '';
    this.selectedFile = event.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.uploadStatus = '';
      this.loading = true;
      this.leadService.uploadFile(this.selectedFile).subscribe({
        next: (event: []) => {
          console.log('status', event);
          this.uploadStatus = `Se cargaron ${event.length} prospectos`;
        },
        error: (err) => {
          this.loading = false;
          this.uploadStatus = 'Error al cargar el archivo.';

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al cargar el archivo.',
            life: 3000,
          });

          console.error(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Debe seleccionar un archivo',
        life: 3000,
      });
    }
  }
}
