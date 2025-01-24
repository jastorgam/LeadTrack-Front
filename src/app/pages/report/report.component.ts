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

  constructor(private leadService: LeadService) {}

  ngOnInit(): void {
    this.leadService.getReport().subscribe({
      next: (data: LeadReport) => {
        this.report = data;
      },
    });
  }

  get contactRate(): number {
    return (
      (this.report.totalProspectContacted / this.report.totalProspects) * 100
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
    const totalEffectiveInteractions =
      this.report.totalInteractionsByPhoneTrue +
      this.report.totalInteractionsByEmailTrue;
    return (
      (totalEffectiveInteractions / this.report.totalInteractions) * 100 || 0
    );
  }
}
