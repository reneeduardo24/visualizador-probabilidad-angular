import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountingService {

  factorial(n: number): number {
    if (n < 0) {
      throw new Error('El factorial no está definido para n < 0');
    }
    let res = 1;
    for (let i = 2; i <= n; i++) {
      res *= i;
    }
    return res;
  }

  /** Permutaciones sin repetición: P(n,r) = n! / (n-r)! */
  permutacionesSinRepeticion(n: number, r: number): number {
    this.validarNyR(n, r);
    return this.factorial(n) / this.factorial(n - r);
  }

  /** Permutaciones con repetición: n^r */
  permutacionesConRepeticion(n: number, r: number): number {
    this.validarNyR(n, r);
    return Math.pow(n, r);
  }

  /** Combinaciones sin repetición: C(n,r) = n! / (r!(n-r)!) */
  combinacionesSinRepeticion(n: number, r: number): number {
    this.validarNyR(n, r);
    return this.factorial(n) / (this.factorial(r) * this.factorial(n - r));
  }

  /** Combinaciones con repetición: C(n+r-1, r) */
  combinacionesConRepeticion(n: number, r: number): number {
    this.validarNyR(n, r);
    const total = n + r - 1;
    return this.combinacionesSinRepeticion(total, r);
  }

  private validarNyR(n: number, r: number): void {
    if (!Number.isInteger(n) || !Number.isInteger(r)) {
      throw new Error('n y r deben ser enteros');
    }
    if (n <= 0) {
      throw new Error('n debe ser mayor que 0');
    }
    if (r < 0) {
      throw new Error('r no puede ser negativo');
    }
    if (r > n) {
      // Para perm/combin sin repetición es inválido; en con repetición sí se permite,
      // pero aquí mantenemos simple: controlas en el componente.
      throw new Error('Para esta operación se requiere que r ≤ n');
    }
  }
}
