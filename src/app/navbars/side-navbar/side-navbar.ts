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
  readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  isMobile = false;
  sidebarOpen = true;

  private navSub?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.isBrowser) {
      this.updateViewportFlags();

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
    if (this.isBrowser && typeof window !== 'undefined') {
      this.isMobile = window.matchMedia('(max-width: 639px)').matches;
      this.sidebarOpen = !this.isMobile;
    }
  }
}