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
import { Conjunto } from '../../../core/services/set-operations.service';

// venn.js no tiene tipos, lo tratamos como any
import * as venn from 'venn.js';
import * as d3 from 'd3';

@Component({
  selector: 'app-venn-diagram',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './venn-diagram.component.html',
  styleUrls: ['./venn-diagram.component.scss'],
})
export class VennDiagramComponent implements AfterViewInit, OnChanges {

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef<HTMLDivElement>;

  @Input() conjuntoA: Conjunto = [];
  @Input() conjuntoB: Conjunto = [];

  private initialized = false;
  interseccionAB: Conjunto = [];

  ngAfterViewInit(): void {
    this.initialized = true;
    this.renderDiagram();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialized) {
      this.renderDiagram();
    }
  }

 private renderDiagram(): void {
  const container = this.chartContainer.nativeElement;

  // Limpiar cualquier SVG previo
  d3.select(container).selectAll('*').remove();

  // Calcular intersección A ∩ B una sola vez
  this.interseccionAB = this.conjuntoA.filter(x => this.conjuntoB.includes(x));

  const sets = [
    { sets: ['A'], size: this.conjuntoA.length, label: 'A' },
    { sets: ['B'], size: this.conjuntoB.length, label: 'B' },
    { sets: ['A', 'B'], size: this.interseccionAB.length },
  ];

  const chart = (venn as any).VennDiagram()
    .width(400)
    .height(300);

  const div = d3.select(container);
  div.datum(sets).call(chart);

  div.selectAll('text')
    .style('font-size', '14px')
    .style('font-family', 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif');
}

}
