import { Component, input, output, effect, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 overflow-y-auto">
        <!-- Backdrop Overlay -->
        <div class="fixed inset-0 bg-primary/40 backdrop-blur-sm transition-opacity" (click)="onClose()"></div>

        <!-- Dialog Window Box -->
        <div class="relative bg-surface-container-lowest rounded-xl shadow-2xl max-w-2xl w-full p-8 border border-outline-variant/50 z-10 transition-all transform scale-100 max-h-[90vh] flex flex-col">
          
          <!-- Close Trigger Button -->
          <button (click)="onClose()" class="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors focus:outline-none" aria-label="Close dialog">
            <span class="material-symbols-outlined text-2xl">close</span>
          </button>

          <!-- Dynamic Header -->
          @if (title()) {
            <h3 class="font-headline-md text-headline-md text-primary mb-6 pr-8">{{ title() }}</h3>
          }

          <!-- Project/Form Custom Content Area -->
          <div class="flex-1 overflow-y-auto min-h-0 pr-1">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    }
  `
})
export class ModalComponent implements OnDestroy {
  isOpen = input<boolean>(false);
  title = input<string>('');
  close = output<void>();

  constructor() {
    // Prevent backdrop webpage from scrolling when the modal dialog is open
    effect(() => {
      if (typeof document !== 'undefined') {
        if (this.isOpen()) {
          document.body.classList.add('overflow-hidden');
        } else {
          document.body.classList.remove('overflow-hidden');
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('overflow-hidden');
    }
  }

  onClose(): void {
    this.close.emit();
  }

  // Handle escape keyboard button press
  @HostListener('document:keydown.escape')
  handleEscapeKey(): void {
    if (this.isOpen()) {
      this.onClose();
    }
  }
}
