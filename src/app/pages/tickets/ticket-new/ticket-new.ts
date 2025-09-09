import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TicketsService } from '../../../core/services/tickets.service';

@Component({
  selector: 'app-ticket-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './ticket-new.html',
  styleUrls: ['./ticket-new.css']
})
export class TicketNew {
  private fb = inject(FormBuilder);
  private api = inject(TicketsService);
  private router = inject(Router);

  priorities = [
    { value: 'low', label: 'Baja' },
    { value: 'medium', label: 'Media' },
    { value: 'high', label: 'Alta' },
    { value: 'urgent', label: 'Urgente' },
  ];
  categories = [
    { id: 1, name: 'Soporte TI' },
    { id: 2, name: 'Mantenimiento' },
    { id: 3, name: 'Desarrollo' },
  ];
  projects = [
    { id: 1, name: 'Backoffice' },
    { id: 2, name: 'App Móvil' },
  ];
  users = [
    { id: 101, name: 'Aldo Rodríguez' },
    { id: 102, name: 'Soporte Nivel 1' },
  ];

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(160)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    priority: ['medium', Validators.required],
    categoryId: [null as number | null, Validators.required],
    projectId: [null as number | null, Validators.required],
    assigneeId: [null as number | null],
    dueAt: [''],
    tags: [''],
    files: [null as File[] | null],
  });

  get f() { return this.form.controls; }

  onFileChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : null;
    //this.form.patchValue({ files });
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;
    const fd = new FormData();
    fd.append('title', v.title!);
    fd.append('description', v.description!);
    fd.append('priority', v.priority!);
    fd.append('categoryId', String(v.categoryId));
    fd.append('projectId', String(v.projectId));
    if (v.assigneeId) fd.append('assigneeId', String(v.assigneeId));
    if (v.dueAt) fd.append('dueAt', v.dueAt!);
    if (v.tags) fd.append('tags', v.tags!);
    //(v.files || []).forEach(file => fd.append('files', file));

    try { 
      const created: any = 1///await this.api.createTicket(fd);
      this.router.navigate(['/tickets', created?.id ?? '']);
    } catch (e) {
      console.error(e);
      alert('No se pudo crear el ticket');
    }
  }
}