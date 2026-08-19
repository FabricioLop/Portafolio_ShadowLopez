import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { MANDU_START, monthsSince } from '../../utils/experience';

interface TimelineItem {
  year: string;
  type: 'education' | 'project' | 'cert' | 'work';
  icon: string;
  titleKey: string;
  placeKey: string;
  descKey: string;
  link?: string;
  status?: 'live' | 'inprogress' | 'done' | 'pending';
  /** Si está presente, se muestra la antigüedad junto al año y se recalcula sola. */
  since?: Date;
  /** Añade "— Presente" / "— Present" según el idioma activo. */
  ongoing?: boolean;
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
      year: '2022', ongoing: true, type: 'education', icon: '🎓',
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
      year: '2025', type: 'project', icon: '🏠',
      titleKey: 'hogar_title', placeKey: 'hogar_place', descKey: 'hogar_desc',
      link: 'https://hogar-fin-web-app.vercel.app/', status: 'live'
    },
    {
      year: 'Nov 2025', type: 'cert', icon: '🔐',
      titleKey: 'goog_title', placeKey: 'goog_place', descKey: 'goog_desc',
      link: 'https://www.coursera.org/verify/TEZN8JZRYLK3'
    },
    {
      year: 'Nov 2025', type: 'project', icon: '🐟',
      titleKey: 'ringent_title', placeKey: 'ringent_place', descKey: 'ringent_desc',
      link: 'https://github.com/RingenSoft', status: 'done'
    },
    {
      year: 'Mar 2026', type: 'project', icon: '💰',
      titleKey: 'smartfinance_title', placeKey: 'smartfinance_place', descKey: 'smartfinance_desc',
      link: 'https://smart-finance-api-production-42f4.up.railway.app/swagger-ui/index.html#/', status: 'inprogress'
    },
    {
      year: 'Mar 2026', ongoing: true, type: 'work', icon: '',
      titleKey: 'mandu_title', placeKey: 'mandu_place', descKey: 'mandu_desc',
      since: MANDU_START
    },
  ];

  getTypeLabel(type: string): string {
    const t = this.ts.t().timeline;
    if (type === 'education') return t.education_label;
    if (type === 'cert') return t.cert_label;
    if (type === 'work') return t.work_label;
    return t.project_label;
  }

  getStatusLabel(status?: string): string {
    const t = this.ts.t().timeline;
    if (status === 'live')       return t.status_live;
    if (status === 'inprogress') return t.status_inprogress;
    if (status === 'pending')    return t.status_pending;
    if (status === 'done')       return t.status_done;
    return '';
  }

  /** Resuelve una clave suelta del bloque `timeline` de las traducciones. */
  tr(key: string): string { return (this.ts.t().timeline as any)[key] ?? key; }

  /** "2022" → "2022 — Presente" cuando sigue en curso. */
  period(item: TimelineItem): string {
    return item.ongoing ? `${item.year} — ${this.ts.t().timeline.present}` : item.year;
  }

  /** "4 meses" / "1 mes" — calculado desde la fecha de inicio, no hardcodeado. */
  duration(item: TimelineItem): string {
    if (!item.since) return '';
    const n = monthsSince(item.since);
    const t = this.ts.t().timeline;
    if (n < 1) return t.month_less;
    return `${n} ${n === 1 ? t.month_one : t.month_many}`;
  }
}
