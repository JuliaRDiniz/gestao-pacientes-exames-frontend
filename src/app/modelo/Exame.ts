import { Paciente } from './Paciente';

export class Exame {
  id?: string;
  patientId: string;
  modality: string;
  procedure: string;
  performedAt: string;
  createdAt?: string;
  patient?: Paciente;
}
