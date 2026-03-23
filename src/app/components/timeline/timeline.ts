import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

interface TimelineItem {
  year: string;
  type: 'education' | 'project' | 'cert';
  icon: string;
  titleKey: string;
  placeKey: string;
  descKey: string;
  link?: string;
  status?: 'live' | 'inprogress' | 'offline' | 'pending';
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css'
})
export class Timeline {
  ts = inject(TranslationService);

  items: TimelineItem[] = [
    {
      year: '2022 — Presente', type: 'education', icon: '🎓',
      titleKey: 'upc_title', placeKey: 'upc_place', descKey: 'upc_desc'
    },
    {
      year: 'Jun 2023', type: 'cert', icon: '🏆',
      titleKey: 'scrum_title', placeKey: 'scrum_place', descKey: 'scrum_desc',
      link: 'https://www.scrumstudy.com/certification/verify?type=SFC&number=982605'
    },
    {
      year: 'Nov 2023', type: 'cert', icon: '📊',
      titleKey: 'rutgers_title', placeKey: 'rutgers_place', descKey: 'rutgers_desc',
      link: 'https://www.coursera.org/verify/29TXXN27EK2X'
    },
    {
      year: 'Jul 2025', type: 'project', icon: '⚡',
      titleKey: 'emsafe_title', placeKey: 'emsafe_place', descKey: 'emsafe_desc',
      link: 'https://github.com/EMSafeUPC', status: 'pending'
    },
    {
      year: 'Nov 2025', type: 'cert', icon: '🔐',
      titleKey: 'goog_title', placeKey: 'goog_place', descKey: 'goog_desc',
      link: 'https://www.coursera.org/verify/TEZN8JZRYLK3'
    },
    {
      year: 'Nov 2025', type: 'project', icon: '🐟',
      titleKey: 'ringent_title', placeKey: 'ringent_place', descKey: 'ringent_desc',
      link: 'https://github.com/RingenSoft', status: 'inprogress'
    },
    {
      year: '2025', type: 'project', icon: '🏠',
      titleKey: 'hogar_title', placeKey: 'hogar_place', descKey: 'hogar_desc',
      link: 'https://hogar-fin-web-app.vercel.app/', status: 'live'
    },
    {
      year: 'Mar 2026', type: 'project', icon: '💰',
      titleKey: 'smartfinance_title', placeKey: 'smartfinance_place', descKey: 'smartfinance_desc',
      link: 'https://smart-finance-api-production-42f4.up.railway.app/swagger-ui/index.html#/', status: 'inprogress'
    },
  ];

  getTypeLabel(type: string): string {
    const t = this.ts.t().timeline;
    if (type === 'education') return t.education_label;
    if (type === 'cert') return t.cert_label;
    return t.project_label;
  }

  getStatusLabel(status?: string): string {
    const t = this.ts.t().timeline;
    if (status === 'live')       return t.status_live;
    if (status === 'inprogress') return t.status_inprogress;
    if (status === 'pending')    return t.status_pending;
    return '';
  }

  getTitle(key: string): string { return (this.ts.t().timeline as any)[key] ?? key; }
  getPlace(key: string): string { return (this.ts.t().timeline as any)[key] ?? key; }
  getDesc(key: string):  string { return (this.ts.t().timeline as any)[key] ?? key; }
}
