import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../servico/paciente.service';

@Component({
  selector: 'app-form-paciente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-paciente.component.html',
  styleUrls: ['./form-paciente.component.scss'],
})
export class FormPacienteComponent implements OnInit {
  // Formulário SIMPLES - sem validações customizadas complexas
  formulario = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    document: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    birthDate: new FormControl('', [Validators.required]),
  });

  editando = false;
  pacienteId: string | null = null;
  loading = false;

  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.pacienteId = this.route.snapshot.params['id'];
    if (this.pacienteId) {
      this.editando = true;
      this.carregarPaciente();
    }
  }

  validarDados() {
    const erros = [];

    const dataNasc = new Date(this.formulario.value.birthDate || '');
    const hoje = new Date();

    if (dataNasc > hoje) {
      erros.push('Data de nascimento não pode ser no futuro');
    }

    // Validação de CPF básica
    const cpf = this.formulario.value.document?.replace(/\D/g, '') || '';
    if (cpf.length !== 11) {
      erros.push('CPF deve ter 11 dígitos');
    }

    return erros;
  }

  carregarPaciente() {
    if (this.pacienteId) {
      this.loading = true;
      this.pacienteService.buscarPorId(this.pacienteId).subscribe({
        next: (paciente) => {
          this.formulario.patchValue({
            name: paciente.name,
            document: paciente.document,
            birthDate: paciente.birthDate.split('T')[0],
          });
          this.loading = false;
        },
        error: (erro) => {
          console.error('Erro ao carregar paciente:', erro);
          this.loading = false;
        },
      });
    }
  }

  salvar() {
    // Marca todos como touched para mostrar erros
    this.formulario.markAllAsTouched();

    if (this.formulario.valid) {
      const errosValidacao = this.validarDados();

      if (errosValidacao.length > 0) {
        // Mostra erros de validação customizados
        alert(errosValidacao.join('\n'));
        return;
      }

      this.loading = true;

      const dados = {
        ...this.formulario.value,
        document: this.formulario.value.document?.replace(/\D/g, ''),
      };

      if (this.editando && this.pacienteId) {
        this.pacienteService.atualizar(this.pacienteId, dados).subscribe({
          next: () => this.voltar(),
          error: (erro) => {
            this.loading = false;
            if (erro.status === 409) {
              alert('CPF já cadastrado no sistema');
            } else {
              alert('Erro ao salvar paciente');
            }
          },
        });
      } else {
        this.pacienteService.cadastrar(dados).subscribe({
          next: () => this.voltar(),
          error: (erro) => {
            this.loading = false;
            if (erro.status === 409) {
              alert('CPF já cadastrado no sistema');
            } else {
              alert('Erro ao cadastrar paciente');
            }
          },
        });
      }
    }
  }

  excluirPaciente() {
    if (!this.pacienteId) return;

    const confirmacao = confirm(
      'Tem certeza que deseja excluir este paciente?\n' +
        'Todos os exames relacionados também serão excluídos.\n' +
        'Esta ação não pode ser desfeita.'
    );

    if (confirmacao) {
      this.loading = true;

      this.pacienteService.excluir(this.pacienteId).subscribe({
        next: () => {
          this.loading = false;
          alert('Paciente excluído com sucesso!');
          this.router.navigate(['/pacientes']);
        },
        error: (erro) => {
          this.loading = false;

          
          if (erro.status === 404) {
            alert('Paciente não encontrado');
          } else if (erro.status === 409) {
            alert('Não é possível excluir paciente com exames cadastrados');
          } else {
            alert(
              'Erro ao excluir paciente: ' +
                (erro.error?.message || 'Erro desconhecido')
            );
          }
        },
      });
    }
  }

  voltar() {
    this.router.navigate(['/pacientes']);
  }
}
