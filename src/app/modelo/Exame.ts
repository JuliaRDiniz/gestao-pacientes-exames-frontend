import { Paciente } from './Paciente';

export class Exame {
  id?: string;
  patientId: string;
  modality: string; // CT, US, MR, etc.
  procedure: string; // Descrição do exame
  performedAt: string;
  createdAt?: string;
  patient?: Paciente; // Dados do paciente
}
