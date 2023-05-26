"use client";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Paginacao } from '../../components/paginacao'


export default function Page() {
  const router = useRouter();
  const [urls, setUrls] = useState([]);
  const [page, setPage] = useState(1); // primeira página é 1 e não 0.
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const url = `/api/url/?page=${page}&limit=${limit}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setUrls(data['rows']);

      setTotal(data['total'])
    });
  }, [page]);


  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente apagar esta URL?')) {
      const body = JSON.stringify({
        "action": "delete",
        "id": id
      });

      const init: RequestInit = {
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/json',
        },
      }

      fetch('/api/url/', init)
      .then(res => res.json())
      .then(res => {
        if (res) {
          alert('URL removida com sucesso!');

          const urls_copia = urls.filter(x => x['id'] != id)
          setUrls(urls_copia);
        } else {
          alert('URL não foi removida!');
        }
      });
    }
  }

  const handleAccess = (short_url: string) => {
    window.open(`/a/${short_url}`);
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-2">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <button
                onClick={() => router.push('/encurtador-add')}
                type="button"
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Nova URL</button>
            </div>
          </div>
          </div>
        </div>

      <div className="flex flex-col justify-center items-center">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">#</th>
                    <th scope="col" className="px-6 py-4">URL</th>
                    <th scope="col" className="px-6 py-4">Short</th>
                    <th scope="col" className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {(urls.map((u, i) => (
                      <tr key={`url_${i}`} className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{u['id']}</td>
                        <td className="whitespace-nowrap px-6 py-4">{u['url']}</td>
                        <td className="whitespace-nowrap px-6 py-4">{u['short_url']}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <button
                            type="button"
                            onClick={(e) => handleAccess(u['short_url'])}
                            className="mr-3 inline-block rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            data-te-ripple-init>Acessar</button>

                          <button
                            type="button"
                            onClick={() => handleDelete(u['id'])}
                            className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                            data-te-ripple-init>
                            Remover
                          </button>
                        </td>
                      </tr>
                  )))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col justify-center items-center">
                <Paginacao page={page} limit={limit} total={total} onChangePage={(p:number) => setPage(p)} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
