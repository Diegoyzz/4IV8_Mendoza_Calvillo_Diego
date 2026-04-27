function problema1() {
    const entrada = document.getElementById("p1-input").value.trim();
    const salida = document.getElementById("p1-output");

    if (!entrada) {
        salida.textContent = "Error: Ingresa al menos una palabra.";
        return;
    }

    const palabras = entrada.split(" ");
    const palabrasInvertidas = palabras.reverse();
    const resultado = palabrasInvertidas.join(" ");

    salida.textContent = `Resultado: ${resultado}`;
}

function problema2() {
    const p2_x1 = Number(document.querySelector("#p2-x1").value);
    const p2_x2 = Number(document.querySelector('#p2-x2').value);
    const p2_x3 = Number(document.querySelector('#p2-x3').value);
    const p2_x4 = Number(document.querySelector('#p2-x4').value);
    const p2_x5 = Number(document.querySelector('#p2-x5').value);

    const p2_y1 = Number(document.querySelector('#p2-y1').value);
    const p2_y2 = Number(document.querySelector('#p2-y2').value);
    const p2_y3 = Number(document.querySelector('#p2-y3').value);
    const p2_y4 = Number(document.querySelector('#p2-y4').value);
    const p2_y5 = Number(document.querySelector('#p2-y5').value);

    const salida = document.getElementById("p2-output");

    const valoresX = [p2_x1, p2_x2, p2_x3, p2_x4, p2_x5];
    const valoresY = [p2_y1, p2_y2, p2_y3, p2_y4, p2_y5];
    const todosValidos = [...valoresX, ...valoresY].every(valor => !isNaN(valor));

    if (!todosValidos) {
        salida.textContent = "Error: Ingresa valores numéricos en todos los campos.";
        return;
    }

    let v1 = [...valoresX];
    let v2 = [...valoresY];

    v1.sort((a, b) => b - a);
    v2.sort((a, b) => a - b);

    let p2_producto = 0;
    for (let i = 0; i < v1.length; i++) {
        p2_producto += v1[i] * v2[i];
    }

    salida.textContent = `El producto escalar mínimo es: ${p2_producto}`;
}

function problema3() {
    const entrada = document.getElementById("p3-input").value.trim();
    const salida = document.getElementById("p3-output");

    if (!entrada) {
        salida.textContent = "Error: Ingresa palabras separadas por coma.";
        return;
    }

    const palabras = entrada.split(",").map(palabra => palabra.trim().toUpperCase());

    const tieneEspacios = palabras.some(palabra => palabra.includes(" "));
    if (tieneEspacios) {
        salida.textContent = "Error: Las palabras no deben contener espacios.";
        return;
    }

    function contarCaracteresUnicos(palabra) {
        const caracteresUnicos = new Set(palabra.split(""));
        return caracteresUnicos.size;
    }

    const resultados = palabras.map(palabra => ({
        palabra: palabra,
        cantidad: contarCaracteresUnicos(palabra)
    }));

    const maxCantidad = Math.max(...resultados.map(res => res.cantidad));
    const palabrasGanadoras = resultados.filter(res => res.cantidad === maxCantidad);

    let mensaje = `El número máximo de caracteres únicos es: ${maxCantidad}\n`;
    mensaje += `Palabra(s) que cumplen esta condición:\n`;
    palabrasGanadoras.forEach(res => {
        mensaje += `- ${res.palabra}\n`;
    });

    salida.textContent = mensaje;
}