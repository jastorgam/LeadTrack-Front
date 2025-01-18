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
    this.selectedFile = event.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.loading = true;
      this.leadService.uploadFile(this.selectedFile).subscribe({
        next: (event: any) => {
          // if (event.status === 'progress') {
          //   this.uploadProgress = event.percentage;
          // } else if (event.status === 'success') {
          //   this.uploadStatus = 'Archivo cargado con éxito!';
          // }
        },
        error: (err) => {
          this.uploadStatus = 'Error al cargar el archivo.';
          console.error(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }
}
