import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SetOperationsService, Conjunto } from '../../../core/services/set-operations.service';
import { NgIf } from '@angular/common';
import { VennDiagramComponent } from '../venn-diagram/venn-diagram.component';
import { FormulaViewerComponent } from "../../../shared/components/formula-viewer/formula-viewer.component";

@Component({
  selector: 'app-sets-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, VennDiagramComponent, FormulaViewerComponent],
  templateUrl: './sets-page.component.html',
  styleUrls: ['./sets-page.component.scss'],
})
export class SetsPageComponent {

  form: FormGroup;

  // Resultados
  conjuntoS: Conjunto = [];
  conjuntoA: Conjunto = [];
  conjuntoB: Conjunto = [];
  conjuntoC: Conjunto = [];

  resultadoUnionAB: Conjunto = [];
  resultadoInterAB: Conjunto = [];
  resultadoDifAB: Conjunto = [];
  resultadoDifBA: Conjunto = [];
  resultadoComplA: Conjunto = [];

  mensajeValidacion: string | null = null;
  mostrarResultados = false;

  constructor(
    private fb: FormBuilder,
    private setOps: SetOperationsService,
  ) {
    this.form = this.fb.group({
      S: [''],
      A: [''],
      B: [''],
      C: [''],
    });
  }

  onSubmit(): void {
    this.mensajeValidacion = null;
    this.mostrarResultados = false;

    const S = this.setOps.parsearConjunto(this.form.value.S);
    const A = this.setOps.parsearConjunto(this.form.value.A);
    const B = this.setOps.parsearConjunto(this.form.value.B);
    const C = this.setOps.parsearConjunto(this.form.value.C);

    // Validar subconjuntos
    if (!this.setOps.esSubconjunto(A, S) ||
        !this.setOps.esSubconjunto(B, S) ||
        !this.setOps.esSubconjunto(C, S)) {
      this.mensajeValidacion = 'Todos los conjuntos A, B y C deben ser subconjuntos de S.';
      return;
    }

    this.conjuntoS = this.setOps.normalizar(S);
    this.conjuntoA = this.setOps.normalizar(A);
    this.conjuntoB = this.setOps.normalizar(B);
    this.conjuntoC = this.setOps.normalizar(C);

    this.resultadoUnionAB = this.setOps.union(A, B);
    this.resultadoInterAB = this.setOps.interseccion(A, B);
    this.resultadoDifAB = this.setOps.diferencia(A, B);
    this.resultadoDifBA = this.setOps.diferencia(B, A);
    this.resultadoComplA = this.setOps.complemento(A, S);

    this.mostrarResultados = true;
  }

  formatear(conjunto: Conjunto): string {
    return this.setOps.formatearConjunto(conjunto);
  }
}
