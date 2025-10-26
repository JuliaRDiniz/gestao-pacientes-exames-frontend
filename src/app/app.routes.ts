import { Routes } from '@angular/router';
import { ListaPacientesComponent } from './components/lista-pacientes/lista-pacientes.component';
import { FormPacienteComponent } from './components/form-paciente/form-paciente.component';
import { DetalhesPacienteComponent } from './components/detalhes-paciente/detalhes-paciente.component';
import { FormExameComponent } from './components/form-exame/form-exame.component';
import { DetalhesExameComponent } from './components/detalhes-exame/detalhes-exame.component';
import { ListaExamesComponent } from './components/lista-exames/lista-exames.component';

export const routes: Routes = [
  { path: 'pacientes', component: ListaPacientesComponent },
  { path: 'pacientes/novo', component: FormPacienteComponent },
  { path: 'pacientes/:id/editar', component: FormPacienteComponent },
  { path: 'pacientes/:id', component: DetalhesPacienteComponent },
  { path: 'exames/novo', component: FormExameComponent },
  { path: 'exames/:id', component: DetalhesExameComponent },

  { path: 'exames', component: ListaExamesComponent },
  { path: '', redirectTo: '/pacientes', pathMatch: 'full' },
  { path: '**', redirectTo: '/pacientes' },
];
