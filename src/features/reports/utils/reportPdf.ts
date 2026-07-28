import { jsPDF } from 'jspdf';

import type { Report } from '../types/report';

function formatDate(date: string) {
  const [year, month, day] = date.slice(0, 10).split('-');

  return `${day}/${month}/${year}`;
}

function formatType(type: Report['type']) {
  const labels = {
    'portfolio-performance': 'Desempenho das carteiras',
    'client-summary': 'Resumo dos clientes',
    'risk-analysis': 'Análise de risco',
  };

  return labels[type];
}

export function downloadReport(report: Report) {
  const pdf = new jsPDF();

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(20);
  pdf.text('FinSight', 20, 20);

  pdf.setFontSize(16);
  pdf.text(report.name, 20, 35);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(12);

  pdf.text(`Tipo: ${formatType(report.type)}`, 20, 55);

  pdf.text(`Formato: ${report.format.toUpperCase()}`, 20, 65);

  pdf.text(
    `Período: ${formatDate(report.startDate)} até ${formatDate(
      report.endDate,
    )}`,
    20,
    75,
  );

  pdf.text(`Status: Concluído`, 20, 85);

  pdf.text(
    `Gerado em: ${new Date().toLocaleString('pt-BR')}`,
    20,
    95,
  );

  pdf.save(
    `${report.name.replace(/\s+/g, '-')}.pdf`,
  );
}