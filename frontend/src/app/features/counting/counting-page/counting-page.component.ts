import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CountingService } from '../../../core/services/counting.service';
import { NgIf } from '@angular/common';

type TipoOperacion =
  | 'perm-sin-rep'
  | 'perm-con-rep'
  | 'comb-sin-rep'
  | 'comb-con-rep';

@Component({
  selector: 'app-counting-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './counting-page.component.html',
  styleUrls: ['./counting-page.component.scss'],
})
export class CountingPageComponent {

  form: FormGroup;
  resultado: number | null = null;
  error: string | null = null;
  descripcionOperacion = '';

  constructor(
    private fb: FormBuilder,
    private counting: CountingService,
  ) {
    this.form = this.fb.group({
      n: [null],
      r: [null],
      tipo: ['perm-sin-rep'],
    });
  }

  onSubmit(): void {
    this.resultado = null;
    this.error = null;
    this.descripcionOperacion = '';

    const n = Number(this.form.value.n);
    const r = Number(this.form.value.r);
    const tipo: TipoOperacion = this.form.value.tipo;

    try {
      switch (tipo) {
        case 'perm-sin-rep':
          this.resultado = this.counting.permutacionesSinRepeticion(n, r);
          this.descripcionOperacion = `Permutaciones sin repetición P(${n}, ${r})`;
          break;
        case 'perm-con-rep':
          // Para perm con repetición permitimos r > n
          if (!Number.isInteger(n) || !Number.isInteger(r) || n <= 0 || r < 0) {
            throw new Error('n debe ser entero > 0 y r entero ≥ 0');
          }
          this.resultado = this.counting.permutacionesConRepeticion(n, r);
          this.descripcionOperacion = `Permutaciones con repetición n^r con n=${n}, r=${r}`;
          break;
        case 'comb-sin-rep':
          this.resultado = this.counting.combinacionesSinRepeticion(n, r);
          this.descripcionOperacion = `Combinaciones sin repetición C(${n}, ${r})`;
          break;
        case 'comb-con-rep':
          // n > 0, r ≥ 0, r puede ser mayor a n
          if (!Number.isInteger(n) || !Number.isInteger(r) || n <= 0 || r < 0) {
            throw new Error('n debe ser entero > 0 y r entero ≥ 0');
          }
          this.resultado = this.counting.combinacionesConRepeticion(n, r);
          this.descripcionOperacion = `Combinaciones con repetición C(n+r-1, r) con n=${n}, r=${r}`;
          break;
      }
    } catch (e: any) {
      this.error = e.message ?? 'Error al calcular la operación.';
    }
  }
}
