// https://stackoverflow.com/questions/742013/how-do-i-create-a-url-shortener

const LETRAS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const BASE = 62;

function encode(number) {
  const result = [];

  if (number == 0) {
    return LETRAS[number];
  }

  while (number > 0) {
    const indice = number % BASE;
    const letra = LETRAS[indice];
    result.push(letra);
    number = Math.floor(number / BASE);
  }

  return result.reverse().join("");
}

function decode(input) {
  const splitted = input.split("");

  let output = 0;
  for (let i = 0, total = splitted.length; i < total; i++) {
    let letra = splitted[i];
    let index = LETRAS.indexOf(letra);
    output = output * BASE + index;
  }

  return output;
}

var x = encode(1001);
console.log(x);

var y = decode(x);
console.log(y);
