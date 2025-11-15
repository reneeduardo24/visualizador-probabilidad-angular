import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CountingService } from '../../../core/services/counting.service';
import { NgIf } from '@angular/common';
import { CountingChartComponent } from '../counting-chart/counting-chart.component';
import { FormulaViewerComponent } from '../../../shared/components/formula-viewer/formula-viewer.component';

type TipoOperacion =
  | 'perm-sin-rep'
  | 'perm-con-rep'
  | 'comb-sin-rep'
  | 'comb-con-rep';

@Component({
  selector: 'app-counting-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CountingChartComponent, FormulaViewerComponent],
  templateUrl: './counting-page.component.html',
  styleUrls: ['./counting-page.component.scss'],
})
export class CountingPageComponent {

  form: FormGroup;
  resultado: number | null = null;
  error: string | null = null;
  descripcionOperacion = '';

  chartLabels: string[] = [];
  chartData: number[] = [];
  chartTituloGrafica = '';

  // Fórmulas
  formulaGeneral = '';
  formulaSustitucion = '';

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
    this.chartLabels = [];
    this.chartData = [];
    this.chartTituloGrafica = '';
    this.formulaGeneral = '';
    this.formulaSustitucion = '';

    const n = Number(this.form.value.n);
    const r = Number(this.form.value.r);
    const tipo: TipoOperacion = this.form.value.tipo;

    try {
      switch (tipo) {
        case 'perm-sin-rep':
          this.resultado = this.counting.permutacionesSinRepeticion(n, r);
          this.descripcionOperacion = `Permutaciones sin repetición P(${n}, ${r})`;
          this.formulaGeneral = 'P(n,r) = \\dfrac{n!}{(n-r)!}';
          this.formulaSustitucion = `P(${n},${r}) = \\dfrac{${n}!}{(${n}-${r})!}`;
          break;

        case 'perm-con-rep':
          if (!Number.isInteger(n) || !Number.isInteger(r) || n <= 0 || r < 0) {
            throw new Error('n debe ser entero > 0 y r entero ≥ 0');
          }
          this.resultado = this.counting.permutacionesConRepeticion(n, r);
          this.descripcionOperacion = `Permutaciones con repetición n^r con n=${n}, r=${r}`;
          this.formulaGeneral = 'P_{\\text{rep}}(n,r) = n^r';
          this.formulaSustitucion = `P_{\\text{rep}}(${n},${r}) = ${n}^{${r}}`;
          break;

        case 'comb-sin-rep':
          this.resultado = this.counting.combinacionesSinRepeticion(n, r);
          this.descripcionOperacion = `Combinaciones sin repetición C(${n}, ${r})`;
          this.formulaGeneral = 'C(n,r) = \\dfrac{n!}{r!(n-r)!}';
          this.formulaSustitucion = `C(${n},${r}) = \\dfrac{${n}!}{${r}!(${n}-${r})!}`;
          break;

        case 'comb-con-rep':
          if (!Number.isInteger(n) || !Number.isInteger(r) || n <= 0 || r < 0) {
            throw new Error('n debe ser entero > 0 y r entero ≥ 0');
          }
          this.resultado = this.counting.combinacionesConRepeticion(n, r);
          this.descripcionOperacion = `Combinaciones con repetición C(n+r-1, r) con n=${n}, r=${r}`;
          this.formulaGeneral = 'C_{\\text{rep}}(n,r) = C(n+r-1, r)';
          this.formulaSustitucion =
            `C_{\\text{rep}}(${n},${r}) = C(${n}+${r}-1, ${r}) = C(${n + r - 1}, ${r})`;
          break;
      }

      this.buildChartData(n, tipo);
    } catch (e: any) {
      this.error = e.message ?? 'Error al calcular la operación.';
    }
  }

  private buildChartData(n: number, tipo: TipoOperacion): void {
    if (!Number.isInteger(n) || n <= 0) {
      this.chartLabels = [];
      this.chartData = [];
      return;
    }

    const labels: string[] = [];
    const data: number[] = [];

    // Variamos r desde 0 hasta n para ver el comportamiento
    for (let r = 0; r <= n; r++) {
      let valor: number | null = null;

      try {
        switch (tipo) {
          case 'perm-sin-rep':
            valor = this.counting.permutacionesSinRepeticion(n, r);
            break;
          case 'perm-con-rep':
            valor = this.counting.permutacionesConRepeticion(n, r);
            break;
          case 'comb-sin-rep':
            valor = this.counting.combinacionesSinRepeticion(n, r);
            break;
          case 'comb-con-rep':
            valor = this.counting.combinacionesConRepeticion(n, r);
            break;
        }
      } catch {
        // Casos inválidos (ej. r > n en sin repetición) → los marcamos como null
        valor = null;
      }

      labels.push(String(r));
      data.push(valor ?? NaN);
    }

    this.chartLabels = labels;
    this.chartData = data;
    this.chartTituloGrafica = this.getTituloGrafica(tipo, n);
  }

  private getTituloGrafica(tipo: TipoOperacion, n: number): string {
    switch (tipo) {
      case 'perm-sin-rep':
        return `P(n, r) con n fijo = ${n}`;
      case 'perm-con-rep':
        return `n^r con n fijo = ${n}`;
      case 'comb-sin-rep':
        return `C(n, r) con n fijo = ${n}`;
      case 'comb-con-rep':
        return `C(n+r-1, r) con n fijo = ${n}`;
      default:
        return '';
    }
  }
}
