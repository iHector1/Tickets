import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavbar } from "./navbars/side-navbar/side-navbar";

@Component({
  selector: 'app-root',
  imports: [SideNavbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Tickets');
}
