import React from 'react';

const arrayRange = (start : number, stop: number, step: number) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );

// ideia futura: número de paginações é infinita, se tiver milhões de registros é necessário limitar.
export const Paginacao = ({ page, limit, total, onChangePage } : {page: number, limit: number, total: number, onChangePage: Function}) => {
  const anteriorDisabled = page <= 1 || total == 0;
  const proximoDisabled = page >= Math.ceil(total/limit) || total == 0;

  const anteriorClass = 'relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white' + (anteriorDisabled ? ' pointer-events-none' : '')

  const proximoClass = 'relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white' + (proximoDisabled ? ' pointer-events-none' : '')

  const selecionadoClass = "relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300"
  const naoSelecionadoClass = "relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white";

  const numPaginas = Math.ceil(total / limit);

  return (
    <nav className="mt-3">
      <ul className="list-style-none flex">
        <li>
          <a
            className={anteriorClass}
            href="#"
            onClick={() => onChangePage(page - 1)}
            >Anterior</a
          >
        </li>

        {arrayRange(1, numPaginas, 1).map((pagina, index) => {
          const currentClass = pagina == page ? selecionadoClass : naoSelecionadoClass;

          return (
            <li key={`paginacao_${index}`}>
              <a
                className={currentClass}
                href="#"
                onClick={() => onChangePage(pagina)}
                >{pagina}</a
              >
            </li>
          )
        })}

        <li>
          <a
            className={proximoClass}
            href="#"
            onClick={() => onChangePage(page + 1)}
            >Próximo</a
          >
        </li>
      </ul>
    </nav>
  )
}
