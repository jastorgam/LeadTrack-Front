import { Component, OnInit } from '@angular/core';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Prospect } from '../../models/api-response';
import { LeadService } from '../../services/lead.service';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-executive',
  imports: [
    TableModule,
    MessageModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
    DatePipe,
    CheckboxModule,
  ],
  templateUrl: './executive.component.html',
  styleUrls: ['./executive.component.scss'],
})
export class ExecutiveComponent implements OnInit {
  searchValue: string | undefined;
  prospects: Prospect[] = [];
  loading: boolean = true;
  pageSize: number = 10;
  totalRecords: number = 0;
  selectedRow!: Prospect;

  constructor(private leadService: LeadService, private router: Router) {
    this.loading = true;
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  ngOnInit(): void {
    this.leadService.getProspectsCount().subscribe({
      next: (data: number) => {
        this.totalRecords = data;
        this.fetchProspects(1, this.pageSize);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  fetchProspects(page: number, pageSize: number): void {
    this.loading = true;
    this.leadService.getProspects(page, pageSize).subscribe({
      next: (data) => {
        this.prospects = data;
      },
      error: (error) => {
        this.loading = false;
        console.error('Error fetching prospects:', error);
      },
      complete: () => {
        this.loading = false;
        console.log('Prospect data fetching complete.'); // Opcional
      },
    });
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const page = event.first! / event.rows! + 1;
    this.fetchProspects(page, event.rows!);
  }

  onRowSelect(event: any): void {
    console.log('Fila seleccionada:', event.data);
    this.router.navigate(['contact'], { state: { data: event.data } });
  }
}
