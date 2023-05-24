'use client';

import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>A página que você tentou acessar não foi encontrada!</h2>
    </div>
  );
}
