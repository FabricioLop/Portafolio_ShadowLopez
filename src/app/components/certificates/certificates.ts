import { Component, inject, signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

interface Certificate {
  name: string;
  issued: string;
  verifyUrl: string;
}

interface CertCategory {
  icon: string;
  title: string;
  issuer: string;
  color: string;
  certs: Certificate[];
}

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [],
  templateUrl: './certificates.html',
  styleUrl: './certificates.css'
})
export class Certificates {
  ts = inject(TranslationService);
  openCategory = signal<number | null>(null);

  categories: CertCategory[] = [
    {
      icon: '🔐', title: 'Cybersecurity', issuer: 'Google · Coursera', color: '#4285F4',
      certs: [
        { name: 'Foundations of Cybersecurity',                    issued: 'Nov 2025', verifyUrl: 'https://www.coursera.org/verify/TEZN8JZRYLK3' },
        { name: 'Play It Safe: Manage Security Risks',             issued: 'Nov 2025', verifyUrl: 'https://www.coursera.org/verify/KS7VWKBOLS2Q' },
        { name: 'Connect and Protect: Networks and Network Security', issued: 'Nov 2025', verifyUrl: 'https://www.coursera.org/verify/ZS9LITG87PMD' },
        { name: 'Tools of the Trade: Linux and SQL',               issued: 'Nov 2025', verifyUrl: 'https://www.coursera.org/verify/HACZMH08QR3F' },
        { name: 'Assets, Threats, and Vulnerabilities',            issued: 'Dec 2025', verifyUrl: 'https://www.coursera.org/verify/QAGDM920ZX5D' },
        { name: 'Sound the Alarm: Detection and Response',         issued: 'Dec 2025', verifyUrl: 'https://www.coursera.org/verify/MA2XWMWIV4AH' },
        { name: 'Automate Cybersecurity Tasks with Python',        issued: 'Dec 2025', verifyUrl: 'https://www.coursera.org/verify/CXAZT4OI5UXY' },
        { name: 'IT Security: Defense against the Digital Dark Arts', issued: 'Nov 2025', verifyUrl: 'https://www.coursera.org/verify/RSIVPCGB6BXN' },
      ]
    },
    {
      icon: '☁️', title: 'Cloud & IT Infrastructure', issuer: 'Google / University of Minnesota · Coursera', color: '#FF6D00',
      certs: [
        { name: 'System Administration and IT Infrastructure Services', issued: 'Nov 2025', verifyUrl: 'https://www.coursera.org/verify/NRGPJ7O8PZSW' },
        { name: 'Cloud Security Basics',                           issued: 'Jun 2023', verifyUrl: 'https://www.coursera.org/verify/5NSUEBNZ6VL8' },
      ]
    },
    {
      icon: '📊', title: 'Supply Chain & Data Analytics', issuer: 'Rutgers University · Coursera', color: '#CC0000',
      certs: [
        { name: '⭐ Supply Chain Analytics Specialization',         issued: 'Nov 2023', verifyUrl: 'https://www.coursera.org/verify/29TXXN27EK2X' },
        { name: 'Supply Chain Analytics Essentials',               issued: 'Sep 2023', verifyUrl: 'https://www.coursera.org/verify/26YYP3X3JJVU' },
        { name: 'Inventory Analytics',                             issued: 'Sep 2023', verifyUrl: 'https://www.coursera.org/verify/ZE2NYTC4R6UX' },
        { name: 'Demand Analytics',                                issued: 'Nov 2023', verifyUrl: 'https://www.coursera.org/verify/3U36VM2E8PKA' },
        { name: 'Supply Chain Analytics',                          issued: 'Nov 2023', verifyUrl: 'https://www.coursera.org/verify/7XBV2RETWWUP' },
        { name: 'Business Intelligence and Competitive Analysis',  issued: 'Oct 2023', verifyUrl: 'https://www.coursera.org/verify/VS44XHSP2SVZ' },
      ]
    },
    {
      icon: '📱', title: 'Social Media Marketing', issuer: 'Meta · Coursera', color: '#0668E1',
      certs: [
        { name: 'Introducción al Marketing en Redes Sociales',     issued: 'Mar 2024', verifyUrl: 'https://www.coursera.org/verify/NVU9SCY5F4LY' },
        { name: 'Gestión de Redes Sociales',                       issued: 'Mar 2024', verifyUrl: 'https://www.coursera.org/verify/EWQTRHRD25P9' },
        { name: 'Fundamentos de la Publicidad en Redes Sociales',  issued: 'Apr 2024', verifyUrl: 'https://www.coursera.org/verify/4F8UGL7JZE5F' },
        { name: 'Publicidad con Meta',                             issued: 'Apr 2024', verifyUrl: 'https://www.coursera.org/verify/EP7D5KXUVHQU' },
        { name: 'Medir y Optimizar Campañas de Marketing',         issued: 'Apr 2024', verifyUrl: 'https://www.coursera.org/verify/9XGS52VTJ9MT' },
      ]
    },
    {
      icon: '💡', title: 'Otros Certificados', issuer: 'Macquarie · ORT Uruguay · SCRUMStudy', color: '#8a2be2',
      certs: [
        { name: 'Excel Skills for Business: Essentials',           issued: 'Jun 2025', verifyUrl: 'https://www.coursera.org/verify/BUVAMD2X7R4K' },
        { name: 'Excel Skills for Business: Intermediate I',       issued: 'Jun 2025', verifyUrl: 'https://www.coursera.org/verify/2AV50BPHO58E' },
        { name: '¡A Programar! Una Introducción a la Programación',issued: 'Apr 2023', verifyUrl: 'https://www.coursera.org/verify/TUU7286GZCY4' },
        { name: 'Scrum Fundamentals Certified (SFC)',              issued: 'Jun 2023', verifyUrl: 'https://www.scrumstudy.com/certification/verify?type=SFC&number=982605' },
      ]
    },
  ];

  get totalCerts(): number {
    return this.categories.reduce((sum, cat) => sum + cat.certs.length, 0);
  }

  toggle(index: number): void {
    this.openCategory.update(v => v === index ? null : index);
  }
}
