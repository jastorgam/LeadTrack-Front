import { Component, OnInit } from '@angular/core';
import { LeadReport } from '../../models/report.model';
import { LeadService } from '../../services/lead.service';

import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-report',
  imports: [
    ChartModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    DecimalPipe,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  report!: LeadReport;

  constructor(private leadService: LeadService) {
    this.leadService.getReport().subscribe({
      next: (data: LeadReport) => {
        this.report = data;
      },
    });
  }

  ngOnInit(): void {}

  get contactRate(): number {
    return (
      (this.report.totalProspectContactedTrue / this.report.totalProspects) * 100
    );
  }

  get responseRate(): number {
    return this.report.totalProspectContactedTrue > 0
      ? (this.report.totalProspectContactedTrue /
          this.report.totalProspectContacted) *
          100
      : 0;
  }

  get interactionsPerProspect(): number {
    return this.report.totalInteractions / this.report.totalProspects;
  }

  get effectiveInteractionRate(): number {
    return (
      (this.report.totalProspectContactedTrue /
        this.report.totalProspectContacted) *
        100 || 0
    );
  }
}
