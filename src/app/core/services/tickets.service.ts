import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TicketsService {
  private http = inject(HttpClient);
  private baseUrl = '/api'; // ajusta si usas proxy

  createTicket(fd: FormData) {
    return this.http.post<{ id: number }>(`${this.baseUrl}/tickets`, fd).toPromise();
  }
}
