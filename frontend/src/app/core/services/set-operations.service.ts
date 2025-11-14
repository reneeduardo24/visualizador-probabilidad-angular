import { Injectable } from '@angular/core';

export type Elemento = string;
export type Conjunto = Elemento[];

@Injectable({
  providedIn: 'root',
})
export class SetOperationsService {

  /** Elimina duplicados y ordena opcionalmente */
  normalizar(conjunto: Conjunto): Conjunto {
    const sinDuplicados = Array.from(new Set(conjunto));
    return sinDuplicados.sort(); // opcional: ordénalo alfabéticamente
  }

  /** Unión: A ∪ B */
  union(A: Conjunto, B: Conjunto): Conjunto {
    return this.normalizar([...A, ...B]);
  }

  /** Intersección: A ∩ B */
  interseccion(A: Conjunto, B: Conjunto): Conjunto {
    const setB = new Set(B);
    return this.normalizar(A.filter(x => setB.has(x)));
  }

  /** Diferencia: A − B */
  diferencia(A: Conjunto, B: Conjunto): Conjunto {
    const setB = new Set(B);
    return this.normalizar(A.filter(x => !setB.has(x)));
  }

  /** Complemento: Ā respecto a S */
  complemento(A: Conjunto, S: Conjunto): Conjunto {
    const setA = new Set(A);
    return this.normalizar(S.filter(x => !setA.has(x)));
  }

  /** Intersección triple: A ∩ B ∩ C */
  interseccionTriple(A: Conjunto, B: Conjunto, C: Conjunto): Conjunto {
    return this.interseccion(this.interseccion(A, B), C);
  }

  /** Unión triple: A ∪ B ∪ C */
  unionTriple(A: Conjunto, B: Conjunto, C: Conjunto): Conjunto {
    return this.union(this.union(A, B), C);
  }

  /** ¿Son disjuntos (A ∩ B = ∅)? */
  sonDisjuntos(A: Conjunto, B: Conjunto): boolean {
    return this.interseccion(A, B).length === 0;
  }

  /** Convierte un string "1,2,3" a ['1','2','3'] */
  parsearConjunto(valor: string): Conjunto {
    if (!valor) return [];
    return valor
      .split(',')
      .map(e => e.trim())
      .filter(e => e.length > 0);
  }

  /** Convierte un conjunto a "{a, b, c}" */
  formatearConjunto(conjunto: Conjunto): string {
    const normalizado = this.normalizar(conjunto);
    return `{ ${normalizado.join(', ')} }`;
  }

  /** Verifica si A ⊆ S */
  esSubconjunto(A: Conjunto, S: Conjunto): boolean {
    const setS = new Set(S);
    return A.every(x => setS.has(x));
  }
}
