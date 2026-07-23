import { Directive, ElementRef, OnInit, Renderer2, input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[animateOnScroll]',
  standalone: true
})
export class AnimateOnScrollDirective implements OnInit {
  animationType = input<'fade' | 'slide-up' | 'zoom'>('slide-up');
  delay = input<number>(0);

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const initialClasses = this.getInitialClasses();
    initialClasses.forEach(cls => this.renderer.addClass(this.el.nativeElement, cls));
    
    this.renderer.addClass(this.el.nativeElement, 'transition-all');
    this.renderer.addClass(this.el.nativeElement, 'duration-700');
    this.renderer.addClass(this.el.nativeElement, 'ease-out');

    if (this.delay() > 0) {
      this.renderer.setStyle(this.el.nativeElement, 'transition-delay', `${this.delay()}ms`);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            initialClasses.forEach(cls => this.renderer.removeClass(this.el.nativeElement, cls));
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(this.el.nativeElement);
  }

  private getInitialClasses(): string[] {
    switch (this.animationType()) {
      case 'fade':
        return ['opacity-0'];
      case 'zoom':
        return ['opacity-0', 'scale-95'];
      case 'slide-up':
      default:
        return ['opacity-0', 'translate-y-8'];
    }
  }
}
