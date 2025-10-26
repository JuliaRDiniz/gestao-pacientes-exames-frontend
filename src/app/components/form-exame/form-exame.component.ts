import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExameService } from '../../servico/exame.service';
import { PacienteService } from '../../servico/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-exame',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-exame.component.html',
  styleUrl: './form-exame.component.scss',
})
export class FormExameComponent {
  formulario = new FormGroup({
    patientId: new FormControl('', Validators.required),
    modality: new FormControl('', Validators.required),
    procedure: new FormControl('', Validators.required),
    performedAt: new FormControl('', Validators.required),
  });

  pacientes: any[] = [];
  modalidades = [
    'CR',
    'CT',
    'DX',
    'MG',
    'MR',
    'NM',
    'OT',
    'CP',
    'ES',
    'EEG',
    'BMD',
    'US',
    'XA',
  ];
  loading = false;

  constructor(
    private exameService: ExameService,
    private pacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.carregarPacientes();

    // Se veio de um paciente específico

    const pacienteId = this.route.snapshot.queryParams['pacienteId'];
    if (pacienteId) {
      this.formulario.patchValue({ patientId: pacienteId });
    }
  }

  carregarPacientes() {
    this.pacienteService.listarTodos().subscribe({
      next: (res) => (this.pacientes = res.data),
    });
  }

  salvar() {
    if (this.formulario.valid) {
      this.loading = true;
      const dados = this.formulario.value;

      this.exameService.cadastrar(dados).subscribe({
        next: () => {
          this.loading = false;
          alert('Exame cadastrado com sucesso!');
          this.voltar();
        },
        error: (erro) => {
          this.loading = false;
          alert(
            'Erro ao cadastrar exame: ' +
              (erro.error?.mensagem || 'Erro desconhecido')
          );
        },
      });
    }
  }

  voltar() {
    this.router.navigate(['/pacientes']);
  }
}
