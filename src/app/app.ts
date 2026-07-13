import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  tags: string[];
  icon: string;
  category: 'Angular' | 'MEAN' | 'AWS' | 'Other' | 'MERN';
  link?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Navigation & UI States
  protected readonly isDarkMode = signal(false);
  protected readonly isContactOpen = signal(false);
  protected readonly isMobileMenuOpen = signal(false);
  protected readonly activeFilter = signal<string>('All');
  protected readonly formSubmitted = signal(false);
  protected readonly isSending = signal(false);
  protected readonly contactForm = signal({ name: '', email: '', message: '' });

  constructor() {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      this.isDarkMode.set(shouldBeDark);
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  toggleTheme(): void {
    if (typeof window !== 'undefined') {
      const newDark = !this.isDarkMode();
      this.isDarkMode.set(newDark);
      if (newDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }

  // Data signals
  protected readonly skills = signal([
    'Angular', 'TypeScript', 'RxJS', 'NGRX', 'JavaScript', 
    'HTML5 / SCSS', 'NodeJS', 'MongoDB', 'AI Tools', 'Bootstrap', 'Git'
  ]);

  protected readonly experiences = signal([
    {
      role: 'Software Engineer',
      company: 'Beinex Consulting Pvt. Ltd',
      period: 'Dec 2024 - Present',
      points: [
        'Drive the development of enterprise web applications using Angular 18/19 and TypeScript, delivering robust, modular, and maintainable frontend architectures.',
        'Contributed to migrating a large-scale monolithic application into a multi-repository Micro Frontend architecture leveraging Module Federation.',
        'Integrate AI tool capabilities and large language models (LLMs) into internal applications to enhance developer productivity and feature automation.',
        'Optimize complex asynchronous data flows and state reactivity using RxJS streams and NgRx state management, reducing render times and memory leaks.',
        'Maintain robust Git workflows, manage CI/CD pipeline pull requests, and resolve SonarQube quality gate and security issues to ensure clean, compliant code.',
        'Collaborate with backend engineers, designers, and product managers to define system specifications and deliver high-fidelity UI components.'
      ],
      skills: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'AI Tools', 'SCSS', 'Git', 'Micro FE', 'Module Federation'],
      isCurrent: true
    },
    {
      role: 'Angular Developer',
      company: 'Techwyse Internet Marketing',
      period: 'Feb 2022 - Oct 2024',
      points: [
        'Led frontend development for diverse marketing technology platforms, building responsive, SEO-friendly Angular applications and cross-browser compatible interfaces.',
        'Implemented Angular Universal (SSR) to improve search engine rankings, initial page load speed, and core web vitals for international client sites.',
        'Developed custom reusable UI component libraries using Tailwind CSS and Bootstrap, improving design consistency across marketing campaigns.',
        'Integrated RESTful APIs and optimized performance to support dynamic content rendering and tracking integrations.'
      ],
      skills: ['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS', 'Angular Material', 'Syncfusion' , 'Bootstrap', 'REST APIs'],
      isCurrent: false
    },
    {
      role: 'Junior Software Engineer',
      company: 'Bramma IT Solutions',
      period: 'Dec 2021 - Feb 2022',
      points: [
        'Contributed to the development and maintenance of client web applications using HTML5, SCSS, JavaScript, and introductory React patterns.',
        'Collaborated with senior engineers to implement UI components and fix front-end bugs, ensuring design compliance and clean markup.',
        'Participated in daily standups and agile development cycles, refining Git workflow and collaboration practices.'
      ],
      skills: ['HTML5', 'SCSS', 'JavaScript', 'React', 'Git', 'Bootstrap'],
      isCurrent: false
    }
  ]);

  protected readonly projects = signal<Project[]>([
    {
      title: 'Performance Dashboard',
      description: 'A real-time telemetry and SRE performance dashboard featuring live-simulated server vitals, interactive incident log alerting, historical performance reports with pagination, and developer support ticket portals.',
      tags: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'Tailwind'],
      icon: 'monitoring',
      category: 'MERN',
      link: 'https://performace-dashboard.vercel.app/'
    },
    {
      title: 'Redstore Ecommerce',
      description: 'A feature-rich ecommerce platform built with Angular, focusing on seamless product discovery and state-driven cart management.',
      tags: ['Angular', 'RxJS', 'Firebase'],
      icon: 'shopping_bag',
      category: 'Angular',
      link: 'https://redstoreout.netlify.app/'
    },
    {
      title: 'Netflix Clone',
      description: 'High-fidelity recreation of the Netflix UI featuring dynamic content loading and a highly responsive media catalog interface.',
      tags: ['Angular', 'TMDB API', 'Tailwind'],
      icon: 'movie',
      category: 'Angular',
      link: 'https://netv18flix.netlify.app/'
    },
    {
      title: 'AWS Drive Management',
      description: 'Administrative dashboard for cloud asset management, integrating AWS SDKs with a powerful Angular frontend for file operations.',
      tags: ['AWS', 'TypeScript', 'NGRX'],
      icon: 'cloud',
      category: 'AWS',
      link: 'http://drivemanagements.s3-website-us-east-1.amazonaws.com/'
    },
    {
      title: 'Social Media Application',
      description: 'Real-time networking platform featuring live feeds, instant messaging, and profile management systems.',
      tags: ['MEAN Stack', 'Socket.io', 'SCSS'],
      icon: 'groups',
      category: 'MEAN',
      link: 'https://konnectsme.netlify.app/'
    }
  ]);

  protected readonly education = signal([
    {
      degree: 'Bachelor of Science in Mechanical Engineering',
      institution: 'Universal Engineering College, Thrissur',
      period: '2012-2016',
      notes: 'Foundational engineering background providing strong analytical and problem-solving skills.'
    },
    {
      degree: 'Software Engineering Specialization',
      institution: 'Verzeo, Bangalore',
      period: '2021',
      notes: 'Intensive immersion into full-stack development and modern software architecture patterns.'
    }
  ]);

  // Computed signal for project filtering
  protected readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    const allProjects = this.projects();
    if (filter === 'All') return allProjects;
    return allProjects.filter(p => p.category === filter);
  });

  // Modal controls
  openContactModal(): void {
    this.isContactOpen.set(true);
    this.formSubmitted.set(false);
  }

  closeContactModal(): void {
    this.isContactOpen.set(false);
  }

  updateFormField(field: 'name' | 'email' | 'message', event: Event): void {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    this.contactForm.update(form => ({ ...form, [field]: value }));
  }

  submitContactForm(event: Event): void {
    event.preventDefault();
    this.isSending.set(true);
    const formData = this.contactForm();
    
    fetch("https://formsubmit.co/ajax/ajaynanda57@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        Name: formData.name,
        Email: formData.email,
        Message: formData.message
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('FormSubmit.co Success:', data);
      this.isSending.set(false);
      this.formSubmitted.set(true);
      this.contactForm.set({ name: '', email: '', message: '' });
      
      // Auto close modal after brief delay
      setTimeout(() => {
        this.closeContactModal();
      }, 2000);
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      this.isSending.set(false);
      alert('Something went wrong. Please try again.');
    });
  }
}
