const generarNumeroAleatorio = (): number => Math.floor(Math.random() * 101);

const numeroParaAceptar: number = generarNumeroAleatorio();

type Estado =
  | "NO_ES_UN_NUMERO"
  | "EL_NUMERO_ES_MAYOR"
  | "EL_NUMERO_ES_MENOR"
  | "ES_EL_NUMERO_SECRETO"
  | "GAME_OVER_MAXIMO_INTENTOS";

const MAXIMO_INTENTOS: number = 5;
let numeroDeIntentos: number = 0;

const hasSuperadoElNumeroMaximoDeIntentos = (): boolean =>
  numeroDeIntentos >= MAXIMO_INTENTOS;

const muestraNumeroDeIntentos = () => {
  const elementoIntentos = document.getElementById("intentos");

  if (elementoIntentos) {
    elementoIntentos.innerHTML = `${numeroDeIntentos} de ${MAXIMO_INTENTOS}`;
  } else {
    console.error(
      "muestraNumeroDeIntento: No se ha encontrado el elemento con id intentos"
    );
  }
};

document.addEventListener("DOMContentLoaded", muestraNumeroDeIntentos);

const gestionarGameOver = (estado: Estado) => {
  if (estado === "GAME_OVER_MAXIMO_INTENTOS") {
    const elementoComprobar = document.getElementById("comprobar");
    if (elementoComprobar && elementoComprobar instanceof HTMLButtonElement)
      elementoComprobar.disabled = true;
  } else {
    console.error(
      "gestionarGameOver: No se ha encontrado el elemento con id comprobar"
    );
  }
};

// ESTA FUNCIÓN SOLO MUESTRA EL MENSAJE
const muestraMensajeComprobacion = (texto: string, estado: Estado) => {
  let mensaje: string = "";

  switch (estado) {
    case "NO_ES_UN_NUMERO":
      mensaje = `${texto} no es un número pillín`;
      break;
    case "EL_NUMERO_ES_MAYOR":
      mensaje = `UUUYYY! El número ${texto}, es mayor que el número secreto`;
      break;
    case "EL_NUMERO_ES_MENOR":
      mensaje = `UUUYYY! El número ${texto}, es menor que el número secreto`;
      break;
    case "GAME_OVER_MAXIMO_INTENTOS":
      mensaje = `GAME OVER, muchos intentos`;
      break;
    case "ES_EL_NUMERO_SECRETO":
      mensaje = `${texto}, enhorabuena, es el número correcto`;
      break;
    default:
      mensaje = `No sé que ha pasado, pero esto no debería de estar ocurriendo`;
      break;
  }

  const elementoResultado = document.getElementById("resultado");
  if (elementoResultado) {
    elementoResultado.innerHTML = mensaje;
  } else {
    console.error(
      "muestraNumeroDeIntento: No se ha encontrado el elemento con id intentos"
    );
  }
};

// ESTÁ FUNCIÓN COMPRUEBA SI EL NUMERO ES CORRECTO
function comprobarNumero(texto: string): Estado {
  const numero = parseInt(texto);
  const esUnNumero = !isNaN(numero);

  if (!esUnNumero) {
    return "NO_ES_UN_NUMERO";
  }

  if (numero === numeroParaAceptar) {
    return "ES_EL_NUMERO_SECRETO";
  }

  if (hasSuperadoElNumeroMaximoDeIntentos()) {
    return "GAME_OVER_MAXIMO_INTENTOS";
  }

  return numero > numeroParaAceptar
    ? "EL_NUMERO_ES_MAYOR"
    : "EL_NUMERO_ES_MENOR";
}

// ESTA FUNCIÓN EJECUTA LA MUESTRA DEL MENSAJE DE COMPROBACIÓN
const handleCompruebClick = () => {
  let texto: string = "";
  const inputElement = document.getElementById("numero");
  if (inputElement && inputElement instanceof HTMLInputElement) {
    texto = inputElement.value;
  }
  const estado: Estado = comprobarNumero(texto);
  muestraMensajeComprobacion(texto, estado);
  numeroDeIntentos++;
  muestraNumeroDeIntentos();
  gestionarGameOver(estado);
};

// EL BOTÓN NOS MUESTRA EL NÚMERO
const botonComprobar = document.getElementById("comprobar");
botonComprobar?.addEventListener("click", handleCompruebClick);
