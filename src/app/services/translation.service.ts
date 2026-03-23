import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Language } from './language';

const TRANSLATIONS = {
  es: {
    nav: {
      about: 'Sobre Mí', projects: 'Proyectos', skills: 'Skills',
      certificates: 'Certificados', timeline: 'Trayectoria', contact: 'Contacto',
    },
    hero: {
      subtitle: 'Software Engineer | Backend & Full Stack',
      cta_projects: 'Ver mis proyectos', cta_contact: 'Contactarme',
      terminal_1: '$ init_system --user ShadowLopez',
      terminal_2: '> Cargando entorno de desarrollo...',
      terminal_3: '> [OK] Lógica de negocio verificada.',
      terminal_4: '> [OK] Arquitectura Backend lista.',
      terminal_5: '$ await connection',
    },
    about: {
      title: 'Sobre', title_highlight: 'Mí',
      lead: 'Soy Fabricio Lopez, estudiante de Ingeniería de Software en la UPC, con 21 años y una obsesión genuina por construir sistemas que funcionen de verdad. No me conformo con que el código compile — quiero que resuelva problemas reales, que escale bajo presión y que deje huella. Me especializo en Backend y arquitecturas Cloud-native, y cada proyecto que arranco lo abordo con mentalidad de producción desde el primer commit.',
      vision_title: 'Mi Visión',
      vision_desc: 'Construir sistemas distribuidos que resistan el caos del mundo real. El camino es concreto: dominar el Backend → Cloud-native → DevSecOps → IA aplicada al producto. Cada tecnología que incorporo no es un adorno en el CV, es un bloque más en la arquitectura que estoy levantando.',
      value_title: 'Valor de Negocio',
      value_desc: 'Tengo algo que pocos developers tienen: formación simultánea en ingeniería de software y en analítica de datos, finanzas y supply chain. Eso me permite entender qué problema de negocio estoy resolviendo, cuánto cuesta no resolverlo y cómo medir el impacto real — no solo si el test pasa.',
      philosophy_title: 'Filosofía de Trabajo',
      philosophy_desc: 'Prefiero un MVP desplegado a diez ideas en el backlog. Trabajo con mentalidad ágil, itero rápido y trato cada bug como información, no como fracaso. El código limpio no es opcional — es respeto al equipo y al yo del futuro que va a mantener ese sistema a las 2am.',
      discipline_title: 'Disciplina y Estrategia',
      discipline_desc: 'El gym me enseñó que los resultados vienen del proceso sostenido, no de la motivación del momento. Aplico eso al código: constancia diaria, incrementos pequeños y visión a largo plazo. Los problemas difíciles no se resuelven con inspiración — se resuelven con estructura y la cabeza fría de quien ya hizo sus 5 series antes de abrir el IDE.',
      stat_certs: 'Certificados', stat_projects: 'Proyectos', stat_langs: 'Lenguajes', stat_months: 'Meses formándome',
      available: 'Disponible para prácticas',
      interests_label: 'Intereses & Hobbies',
      learning_label: 'Actualmente aprendiendo',
    },
    projects: {
      title: 'Mis', title_highlight: 'Proyectos',
      role_smartfinance: 'Full Stack + Cloud + AI Automation',
      desc_smartfinance: 'Sistema inteligente de control de gastos e ingresos con automatización end-to-end. Dos flujos n8n leen correos de transacciones bancarias para registrar gastos e ingresos automáticamente. Incluye un bot IA con Gemini en WhatsApp (activo en EC2 AWS) para registrar gastos por chat. A futuro, el bot centraliza todo el control financiero del usuario directamente desde WhatsApp.',
      role_ringent: 'Full Stack Developer',
      desc_ringent: 'Sistema de optimización de rutas para la recolección de anchoveta. Construido con API REST y arquitectura DDD. El mayor reto técnico fue diseñar el algoritmo de trazado adaptado a las necesidades reales de los pescadores, sentando una base escalable para futuras iteraciones.',
      role_hogarfin: 'Full Stack Developer | Fintech',
      desc_hogarfin: 'Simulador financiero para créditos hipotecarios con autenticación de usuarios y base de datos en tiempo real via Supabase. Calcula el Bono Mivivienda con persistencia inmediata. Actualmente en proceso de refactorización para mejorar arquitectura y rendimiento.',
      role_emsafe: 'Full Stack & Cloud Deployment',
      desc_emsafe: 'Sistema de monitoreo de carga electromagnética con arquitectura DDD y API REST en Java. Backend optimizado y listo para integración IoT en tiempo real. El servidor está apagado — pendiente de reconfigurar el deploy en nueva instancia cloud.',
      btn_repo: 'Ver Repositorio', btn_live: 'Visitar App', btn_github: 'GitHub', btn_api: 'Ver API ↗',
      badge_wip: 'En Desarrollo 🔨', badge_live: 'Live 🌐',
      badge_deploy_pending: 'Deploy Pendiente ⚡',
    },
    skills: {
      title: 'Mi Arsenal', title_highlight: 'Tecnológico',
      subtitle: 'Herramientas, lenguajes y metodologías que utilizo para construir soluciones.',
      box_backend: 'Backend & Arquitectura', box_frontend: 'Frontend & Diseño',
      box_cloud: 'Cloud & DevOps', box_data: 'Datos & Análisis',
      box_mgmt: 'Gestión & Metodologías', box_proj: 'Proyección & Idiomas',
    },
    certificates: {
      title: 'Mis', title_highlight: 'Certificaciones',
      subtitle: 'Aprendizaje continuo a través de plataformas internacionales.',
      obtained: 'certificados obtenidos', verify: 'Verificar ↗',
    },
    timeline: {
      title: 'Mi', title_highlight: 'Trayectoria',
      subtitle: 'Formación académica, proyectos y hitos clave de mi desarrollo profesional.',
      education_label: 'Educación', project_label: 'Proyecto', cert_label: 'Certificación',
      status_live: '🟢 Live', status_inprogress: '🟡 En Desarrollo', status_pending: '🔵 Deploy Pendiente',
      // Education
      upc_title: 'Ingeniería de Software', upc_place: 'UPC — Universidad Peruana de Ciencias Aplicadas',
      upc_desc: 'Carrera de 5 años enfocada en arquitectura de software, bases de datos, cloud computing, metodologías ágiles y ciclo completo de desarrollo de productos digitales.',
      // Certs
      scrum_title: 'Scrum Fundamentals Certified (SFC)', scrum_place: 'SCRUMStudy',
      scrum_desc: 'Certificación internacional en fundamentos de Scrum: roles, eventos, artefactos y principios del framework ágil. Base metodológica para todos mis proyectos.',
      rutgers_title: 'Supply Chain Analytics Specialization', rutgers_place: 'Rutgers University · Coursera',
      rutgers_desc: 'Especialización completa en analítica de cadena de suministro: demand analytics, inventory analytics, supply chain analytics y business intelligence. 6 cursos — fundamento de mi visión de negocio.',
      goog_title: 'Google Cybersecurity Certificate', goog_place: 'Google · Coursera',
      goog_desc: '8 cursos especializados: fundamentos, gestión de riesgos, redes, Linux, SQL, activos y amenazas, detección de respuesta, y automatización con Python. Directamente aplicado a mi enfoque DevSecOps.',
      // Projects
      emsafe_title: 'EMSafe — Monitoreo Electromagnético', emsafe_place: 'Proyecto Académico · Java + AWS',
      emsafe_desc: 'Sistema de monitoreo de carga electromagnética con DDD, API REST en Spring Boot y arquitectura preparada para IoT. Deploy anterior completado — pendiente reconfigurar en nueva instancia cloud.',
      ringent_title: 'RingentSoft — Optimización de Rutas', ringent_place: 'Proyecto en Desarrollo · Desde Nov 2025',
      ringent_desc: 'Algoritmo de optimización de rutas para la recolección de anchoveta. Angular + FastAPI + MySQL. En desarrollo activo: actualmente mejorando arquitectura y preparando deploy.',
      hogar_title: 'HogarFin — Simulador Hipotecario', hogar_place: 'Proyecto Personal · Live en Vercel',
      hogar_desc: 'App fintech en producción con autenticación y base de datos en tiempo real usando Supabase + Next.js. Calcula el Bono Mivivienda. Actualmente en refactorización para mejorar arquitectura.',
      smartfinance_title: 'SmartFinance-Core — Control Financiero IA', smartfinance_place: 'Proyecto Personal · Back en Railway · Mar 2026',
      smartfinance_desc: 'Sistema de control de gastos e ingresos con automatización via n8n (lectura de correos bancarios) y bot Gemini IA en WhatsApp sobre EC2 AWS. Backend desplegado en Railway. Frontend en desarrollo.',
    },
    contact: {
      title: 'Hablemos',
      availability: 'Disponible para prácticas pre-profesionales',
      form_title: 'Envíame un mensaje',
      name: 'Tu Nombre', email: 'Tu Email',
      subject: 'Asunto', message: 'Mensaje',
      send: 'Enviar Mensaje', sending: 'Enviando...',
      success: '¡Mensaje enviado con éxito! 🎉', error: 'Error al enviar. Intenta por email directamente.',
      connect: 'Conecta Conmigo',
      download_es: 'Descargar CV (Español)', download_en: 'Download CV (English)',
    },
    footer_bottom: {
      rights: 'Todos los derechos reservados.',
      quick_about: '> Sobre Mí', quick_projects: '> Proyectos',
      quick_skills: '> Skills', quick_certs: '> Certificados', quick_timeline: '> Trayectoria',
    },
    splash: {
      line1: '$ Iniciando entorno de Fabricio Lopez...',
      line2: '> [OK] Cargando proyectos...',
      line3: '> [OK] Activando modo ShadowLopez...',
      line4: '> Sistema listo. Bienvenido 🚀',
      skip: 'Presiona cualquier tecla para continuar',
    }
  },

  en: {
    nav: {
      about: 'About', projects: 'Projects', skills: 'Skills',
      certificates: 'Certificates', timeline: 'Journey', contact: 'Contact',
    },
    hero: {
      subtitle: 'Software Engineer | Backend & Full Stack',
      cta_projects: 'View my projects', cta_contact: 'Contact me',
      terminal_1: '$ init_system --user ShadowLopez',
      terminal_2: '> Loading development environment...',
      terminal_3: '> [OK] Business logic verified.',
      terminal_4: '> [OK] Backend architecture ready.',
      terminal_5: '$ await connection',
    },
    about: {
      title: 'About', title_highlight: 'Me',
      lead: "I'm Fabricio Lopez, a Software Engineering student at UPC, 21 years old with a genuine obsession for building systems that actually work. I'm not satisfied with code that just compiles — I want it to solve real problems, scale under pressure, and leave a mark. I specialize in Backend and Cloud-native architectures, approaching every project with a production mindset from the very first commit.",
      vision_title: 'My Vision',
      vision_desc: 'Build distributed systems that withstand real-world chaos. The roadmap is concrete: master Backend → Cloud-native → DevSecOps → AI applied to product. Every technology I add isn\'t a resume decoration — it\'s another block in the architecture I\'m building.',
      value_title: 'Business Value',
      value_desc: "I have something few developers have: simultaneous training in software engineering and data analytics, finance, and supply chain. That lets me understand what business problem I'm solving, how much it costs to leave it unsolved, and how to measure real impact — not just whether the test passes.",
      philosophy_title: 'Work Philosophy',
      philosophy_desc: "I'd rather ship a working MVP than have ten ideas stuck in the backlog. I work with an agile mindset, iterate fast, and treat every bug as information, not failure. Clean code isn't optional — it's respect for the team and the future me who'll maintain that system at 2am.",
      discipline_title: 'Discipline & Strategy',
      discipline_desc: "The gym taught me that results come from sustained process, not momentary motivation. I apply that to code: daily consistency, small increments, and long-term vision. Hard problems aren't solved with inspiration — they're solved with structure and the clear head of someone who already did their 5 sets before opening the IDE.",
      stat_certs: 'Certificates', stat_projects: 'Projects', stat_langs: 'Languages', stat_months: 'Months learning',
      available: 'Available for internships',
      interests_label: 'Interests & Hobbies',
      learning_label: 'Currently learning',
    },
    projects: {
      title: 'My', title_highlight: 'Projects',
      role_smartfinance: 'Full Stack + Cloud + AI Automation',
      desc_smartfinance: 'Intelligent expense and income tracking system with end-to-end automation. Two n8n flows read bank transaction emails to automatically log expenses and income. Includes an AI bot powered by Gemini on WhatsApp (running on AWS EC2) for logging expenses via chat. Future vision: the bot centralizes all financial control directly from WhatsApp.',
      role_ringent: 'Full Stack Developer',
      desc_ringent: 'Route optimization system for anchovy collection. Built with REST API and DDD architecture. Main challenge was designing the routing algorithm adapted to real fishermen workflows, laying a scalable foundation for future iterations.',
      role_hogarfin: 'Full Stack Developer | Fintech',
      desc_hogarfin: 'Mortgage credit financial simulator with user authentication and real-time database via Supabase. Calculates the Bono Mivivienda with immediate persistence. Currently being refactored to improve architecture and performance.',
      role_emsafe: 'Full Stack & Cloud Deployment',
      desc_emsafe: 'Electromagnetic load monitoring system with DDD architecture and Java REST API. Optimized backend ready for real-time IoT integration. Server currently down — pending reconfiguration on new cloud instance.',
      btn_repo: 'View Repository', btn_live: 'Visit App', btn_github: 'GitHub', btn_api: 'View API ↗',
      badge_wip: 'In Development 🔨', badge_live: 'Live 🌐',
      badge_deploy_pending: 'Deploy Pending ⚡',
    },
    skills: {
      title: 'My Tech', title_highlight: 'Arsenal',
      subtitle: 'Tools, languages and methodologies I use to build solutions.',
      box_backend: 'Backend & Architecture', box_frontend: 'Frontend & Design',
      box_cloud: 'Cloud & DevOps', box_data: 'Data & Analytics',
      box_mgmt: 'Management & Methodologies', box_proj: 'Projection & Languages',
    },
    certificates: {
      title: 'My', title_highlight: 'Certifications',
      subtitle: 'Continuous learning through international platforms.',
      obtained: 'certificates obtained', verify: 'Verify ↗',
    },
    timeline: {
      title: 'My', title_highlight: 'Journey',
      subtitle: 'Academic background, projects and key professional milestones.',
      education_label: 'Education', project_label: 'Project', cert_label: 'Certification',
      status_live: '🟢 Live', status_inprogress: '🟡 In Development', status_pending: '🔵 Deploy Pending',
      upc_title: 'Software Engineering', upc_place: 'UPC — Universidad Peruana de Ciencias Aplicadas',
      upc_desc: '5-year degree focused on software architecture, databases, cloud computing, agile methodologies and the full lifecycle of digital product development.',
      scrum_title: 'Scrum Fundamentals Certified (SFC)', scrum_place: 'SCRUMStudy',
      scrum_desc: 'International certification in Scrum fundamentals: roles, events, artifacts and agile framework principles. Methodological foundation for all my projects.',
      rutgers_title: 'Supply Chain Analytics Specialization', rutgers_place: 'Rutgers University · Coursera',
      rutgers_desc: 'Full specialization in supply chain analytics: demand analytics, inventory analytics, supply chain analytics and business intelligence. 6 courses — foundation of my business vision.',
      goog_title: 'Google Cybersecurity Certificate', goog_place: 'Google · Coursera',
      goog_desc: '8 specialized courses: foundations, risk management, networks, Linux, SQL, assets & threats, detection & response, and Python automation. Directly applied to my DevSecOps focus.',
      emsafe_title: 'EMSafe — Electromagnetic Monitoring', emsafe_place: 'Academic Project · Java + AWS',
      emsafe_desc: 'Electromagnetic load monitoring system with DDD, Spring Boot REST API and IoT-ready architecture. Previous deployment completed — pending reconfiguration on new cloud instance.',
      ringent_title: 'RingentSoft — Route Optimization', ringent_place: 'In Development · Since Nov 2025',
      ringent_desc: 'Route optimization algorithm for anchovy collection. Angular + FastAPI + MySQL. Actively in development: improving architecture and preparing deployment.',
      hogar_title: 'HogarFin — Mortgage Simulator', hogar_place: 'Personal Project · Live on Vercel',
      hogar_desc: 'Fintech app in production with authentication and real-time database using Supabase + Next.js. Calculates the Bono Mivivienda. Currently being refactored to improve architecture.',
      smartfinance_title: 'SmartFinance-Core — AI Financial Control', smartfinance_place: 'Personal Project · Backend on Railway · Mar 2026',
      smartfinance_desc: 'Expense and income control system with n8n automation (bank email parsing) and Gemini AI bot on WhatsApp over AWS EC2. Backend deployed on Railway. Frontend in development.',
    },
    contact: {
      title: "Let's Talk",
      availability: 'Available for internships',
      form_title: 'Send me a message',
      name: 'Your Name', email: 'Your Email',
      subject: 'Subject', message: 'Message',
      send: 'Send Message', sending: 'Sending...',
      success: 'Message sent successfully! 🎉', error: 'Error sending. Try via email directly.',
      connect: 'Connect with Me',
      download_es: 'Descargar CV (Español)', download_en: 'Download CV (English)',
    },
    footer_bottom: {
      rights: 'All rights reserved.',
      quick_about: '> About Me', quick_projects: '> Projects',
      quick_skills: '> Skills', quick_certs: '> Certificates', quick_timeline: '> Journey',
    },
    splash: {
      line1: '$ Initializing Fabricio Lopez environment...',
      line2: '> [OK] Loading projects...',
      line3: '> [OK] Activating ShadowLopez mode...',
      line4: '> System ready. Welcome 🚀',
      skip: 'Press any key to continue',
    }
  }
} as const;

type Lang = keyof typeof TRANSLATIONS;

export type Translations = {
  nav: { about: string; projects: string; skills: string; certificates: string; timeline: string; contact: string };
  hero: { subtitle: string; cta_projects: string; cta_contact: string; terminal_1: string; terminal_2: string; terminal_3: string; terminal_4: string; terminal_5: string };
  about: { title: string; title_highlight: string; lead: string; vision_title: string; vision_desc: string; value_title: string; value_desc: string; philosophy_title: string; philosophy_desc: string; discipline_title: string; discipline_desc: string; stat_certs: string; stat_projects: string; stat_langs: string; stat_months: string; available: string; interests_label: string; learning_label: string };
  projects: { title: string; title_highlight: string; role_smartfinance: string; desc_smartfinance: string; role_ringent: string; desc_ringent: string; role_hogarfin: string; desc_hogarfin: string; role_emsafe: string; desc_emsafe: string; btn_repo: string; btn_live: string; btn_github: string; btn_api: string; badge_wip: string; badge_live: string; badge_deploy_pending: string };
  skills: { title: string; title_highlight: string; subtitle: string; box_backend: string; box_frontend: string; box_cloud: string; box_data: string; box_mgmt: string; box_proj: string };
  certificates: { title: string; title_highlight: string; subtitle: string; obtained: string; verify: string };
  timeline: { title: string; title_highlight: string; subtitle: string; education_label: string; project_label: string; cert_label: string; status_live: string; status_inprogress: string; status_pending: string; upc_title: string; upc_place: string; upc_desc: string; scrum_title: string; scrum_place: string; scrum_desc: string; rutgers_title: string; rutgers_place: string; rutgers_desc: string; goog_title: string; goog_place: string; goog_desc: string; emsafe_title: string; emsafe_place: string; emsafe_desc: string; ringent_title: string; ringent_place: string; ringent_desc: string; hogar_title: string; hogar_place: string; hogar_desc: string; smartfinance_title: string; smartfinance_place: string; smartfinance_desc: string };
  contact: { title: string; availability: string; form_title: string; name: string; email: string; subject: string; message: string; send: string; sending: string; success: string; error: string; connect: string; download_es: string; download_en: string };
  footer_bottom: { rights: string; quick_about: string; quick_projects: string; quick_skills: string; quick_certs: string; quick_timeline: string };
  splash: { line1: string; line2: string; line3: string; line4: string; skip: string };
};

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private langService = inject(Language);
  private lang = toSignal(this.langService.currentLanguage$, { initialValue: 'es' as string });

  t = computed(() => (TRANSLATIONS[this.lang() as Lang] ?? TRANSLATIONS['es']) as any as Translations);
}
