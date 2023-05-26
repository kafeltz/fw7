"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function Example() {
  const router = useRouter();
  const [url, setUrl] = useState('');

  const handleOnChange = (e: InputEvent) => {
    setUrl(e.currentTarget.value);
  }

  const handleOnCancel = () => {
    router.back();
  }

  const handleOnSave = async () => {

    const body = JSON.stringify({ url: url });

    const init: RequestInit = {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await fetch('/api/url/', init)
    .then(res => {
      if (res.status == 409) {
        alert('A URL informada já existe!');
        throw 'error';
      } else if (res.status != 200) {
        alert('Ocorreu um erro no sistema!');
        throw 'error';
      } else {
        return res;
      }
    })
    .then((res) => res.json())
    .then((data) => {
      alert('Tudo certo! Redirect!');
      console.log(data);
      router.push('/encurtador');
    })
    .catch(res => {
      console.error(res);
    });
  }

  return (
    <>
      <div className="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">
        <div className="py-12">
          <div className="grid grid-cols-1 gap-6 mb-6">
            <label className="block">
              <span className="text-gray-700">URL</span>
              <input
                type="text"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                placeholder=""
                value={url}
                onChange={handleOnChange}
                />
            </label>
          </div>

            <button
              type="button"
              onClick={handleOnCancel}
              className="mr-4 inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
              Voltar
            </button>

            <button
              onClick={handleOnSave}
              type="button"
              className="inline-block rounded bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]">
              Gravar
            </button>
        </div>
      </div>
    </>
  );
}
