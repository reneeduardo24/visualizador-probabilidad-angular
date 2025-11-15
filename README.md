# Visualizador Interactivo de Probabilidad

Aplicación web en Angular para apoyar la enseñanza de probabilidad y conteo:

- Módulo de **Conjuntos** con diagramas de Venn (A, B, C).
- Descomposición completa de las 7 regiones de A, B y C.
- Inspector en tiempo real de errores en los conjuntos.
- Módulo de **Técnicas de conteo** con fórmulas (MathJax) y gráficas (Chart.js).

## Tecnologías principales

- Angular 19 (standalone components)
- TypeScript
- SCSS
- venn.js + d3 (diagramas de Venn)
- Chart.js + ng2-charts (gráficas)
- MathJax (fórmulas matemáticas)

## Funcionalidades destacadas

### Módulo de Conjuntos

- Captura del espacio muestral S y subconjuntos A, B, C.
- Verificación de que A, B y C sean subconjuntos de S.
- Operaciones:
  - Uniones, intersecciones, diferencias, complementos.
  - Descomposición de A, B y C en 7 regiones disjuntas:
    - A − B − C
    - B − A − C
    - C − A − B
    - (A ∩ B) − C
    - (A ∩ C) − B
    - (B ∩ C) − A
    - A ∩ B ∩ C
- Diagrama de Venn para 2 o 3 conjuntos (según si C está vacío).
- Resaltado dinámico de regiones al seleccionar filas en la tabla.
- Inspector en tiempo real:
  - Elementos fuera de S.
  - Duplicados dentro de A, B o C.
- Ejemplos rápidos prediseñados para uso en clase.

### Módulo de Técnicas de Conteo

- Cálculo de:
  - Permutaciones con y sin repetición.
  - Combinaciones con y sin repetición.
- Visualización:
  - Fórmula general y fórmula con sustitución (MathJax).
  - Gráfica del comportamiento de la función al variar r para n fijo.

## Cómo ejecutar el proyecto

```bash
git clone https://github.com/tu-usuario/probabilidad-web.git
cd probabilidad-web/frontend
npm install
ng serve -o
