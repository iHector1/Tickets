import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { HomeComponent } from './pages/home-component/home-component';
import { TicketNew } from './pages/tickets/ticket-new/ticket-new';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: HomeComponent },
   { path: 'tickets/new', component: TicketNew, title: 'Nuevo ticket' },
  /*404 */
  { path: '**', redirectTo: '/' }
];
