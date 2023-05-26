import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <div className="lg:container mx-auto flex w-full flex-wrap items-center justify-between px-4">
        <div className="grid grid-cols-1 gap-4">
          <h1 className="">Bem vindo!</h1>
          <p className="">
            Este projeto é a implementação do desafio da FW7.
            <br />O código-fonte encontra-se no <a className="text-blue-700" href="https://github.com/kafeltz/fw7">github</a>
          </p>
          <p className="">
            Para continuar clique <a href="/encurtador" className="text-blue-700">aqui</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
