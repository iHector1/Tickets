// src/app/navbars/side-navbar/side-navbar.ts
import { Component, OnInit, OnDestroy, HostListener, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-side-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './side-navbar.html',
  styleUrls: ['./side-navbar.css']
})
export class SideNavbar implements OnInit, OnDestroy {
  logoSrc = '/img/logo.png';

  // ✅ Seguro para SSR: no depende del orden del constructor
  readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // Estado responsive calculado SOLO en navegador
  isMobile = false;      // < 640px
  sidebarOpen = true;    // abierto por defecto en desktop

  private navSub?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.isBrowser) {
      this.updateViewportFlags();

      // Cierra el sidebar al navegar SOLO en móvil
      this.navSub = this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(() => {
          if (this.isMobile) this.sidebarOpen = false;
        });
    }
  }

  ngOnDestroy(): void {
    this.navSub?.unsubscribe();
  }

  @HostListener('window:resize')
  onResize() {
    if (!this.isBrowser) return;
    this.updateViewportFlags();
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  private updateViewportFlags() {
    // Usa matchMedia para alinear con el breakpoint sm de Tailwind
    if (this.isBrowser && typeof window !== 'undefined') {
      this.isMobile = window.matchMedia('(max-width: 639px)').matches;
      this.sidebarOpen = !this.isMobile;
    }
  }
}
