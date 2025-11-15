import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

declare const MathJax: any; // para que TS no se queje

@Component({
  selector: 'app-formula-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formula-viewer.component.html',
  styleUrls: ['./formula-viewer.component.scss'],
})
export class FormulaViewerComponent implements AfterViewInit, OnChanges {

  @Input() formula = '';          // LaTeX sin delimitadores externos
  @Input() displayMode = true;    // true = bloque, false = inline
  @ViewChild('formulaContainer', { static: true }) container!: ElementRef<HTMLDivElement>;

  wrappedFormula = '';

  ngAfterViewInit(): void {
    this.updateFormula();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formula'] && !changes['formula'].firstChange) {
      this.updateFormula();
    }
  }

  private updateFormula(): void {
    if (!this.container) return;

    // Envolvemos con los delimitadores apropiados
    if (this.displayMode) {
      this.wrappedFormula = `\\[ ${this.formula} \\]`;
    } else {
      this.wrappedFormula = `\\( ${this.formula} \\)`;
    }

    // Esperar al siguiente ciclo de render para que innerHTML se aplique
    setTimeout(() => {
      this.typeset();
    }, 0);
  }

  private typeset(): void {
    const el = this.container.nativeElement;
    if ((window as any).MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise([el]).catch((err: any) => console.error('MathJax error', err));
    }
  }
}
