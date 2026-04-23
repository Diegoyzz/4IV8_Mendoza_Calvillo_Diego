const regexNumeroPositivo = /^[0-9]+(\.[0-9]{1,2})?$/;
const regexAnio = /^[0-9]{4}$/;
const regexCalificacion = /^(10|[0-9])(\.[0-9]{1,2})?$/;

function calcularGanancia() {
    const capitalInput = document.getElementById('capital');
    const errorElement = document.getElementById('errorCapital');
    const resultadoElement = document.getElementById('resultado1');
    
    errorElement.textContent = '';
    resultadoElement.textContent = '';

    if (!regexNumeroPositivo.test(capitalInput.value)) {
        errorElement.textContent = 'Ingresa un monto válido (solo números positivos)';
        return;
    }

    const capital = parseFloat(capitalInput.value);
    const tasaInteres = 0.02;
    const ganancia = capital * tasaInteres;
    const total = capital + ganancia;

    resultadoElement.textContent = `Ganancia: $${ganancia.toFixed(2)} | Total al final del mes: $${total.toFixed(2)}`;
}

function calcularSueldo() {
    const sueldoBaseInput = document.getElementById('sueldoBase');
    const venta1Input = document.getElementById('venta1');
    const venta2Input = document.getElementById('venta2');
    const venta3Input = document.getElementById('venta3');

    const errorSueldo = document.getElementById('errorSueldo');
    const errorVenta1 = document.getElementById('errorVenta1');
    const errorVenta2 = document.getElementById('errorVenta2');
    const errorVenta3 = document.getElementById('errorVenta3');
    const resultadoElement = document.getElementById('resultado2');

    errorSueldo.textContent = errorVenta1.textContent = errorVenta2.textContent = errorVenta3.textContent = '';
    resultadoElement.textContent = '';

    let esValido = true;
    if (!regexNumeroPositivo.test(sueldoBaseInput.value)) {
        errorSueldo.textContent = 'Ingresa un sueldo válido';
        esValido = false;
    }
    if (!regexNumeroPositivo.test(venta1Input.value)) {
        errorVenta1.textContent = 'Ingresa un monto válido';
        esValido = false;
    }
    if (!regexNumeroPositivo.test(venta2Input.value)) {
        errorVenta2.textContent = 'Ingresa un monto válido';
        esValido = false;
    }
    if (!regexNumeroPositivo.test(venta3Input.value)) {
        errorVenta3.textContent = 'Ingresa un monto válido';
        esValido = false;
    }

    if (!esValido) return;

    const sueldoBase = parseFloat(sueldoBaseInput.value);
    const venta1 = parseFloat(venta1Input.value);
    const venta2 = parseFloat(venta2Input.value);
    const venta3 = parseFloat(venta3Input.value);

    const totalVentas = venta1 + venta2 + venta3;
    const comision = totalVentas * 0.10;
    const sueldoTotal = sueldoBase + comision;

    resultadoElement.textContent = `Comisión total: $${comision.toFixed(2)} | Sueldo total: $${sueldoTotal.toFixed(2)}`;
}

function calcularDescuento() {
    const totalCompraInput = document.getElementById('totalCompra');
    const errorElement = document.getElementById('errorCompra');
    const resultadoElement = document.getElementById('resultado3');

    errorElement.textContent = '';
    resultadoElement.textContent = '';

    if (!regexNumeroPositivo.test(totalCompraInput.value)) {
        errorElement.textContent = 'Ingresa un monto válido';
        return;
    }

    const totalCompra = parseFloat(totalCompraInput.value);
    const descuento = totalCompra * 0.15;
    const totalPagar = totalCompra - descuento;

    resultadoElement.textContent = `Descuento aplicado: $${descuento.toFixed(2)} | Total a pagar: $${totalPagar.toFixed(2)}`;
}

function calcularCalificacion() {
    const parcial1Input = document.getElementById('parcial1');
    const parcial2Input = document.getElementById('parcial2');
    const parcial3Input = document.getElementById('parcial3');
    const examenInput = document.getElementById('examenFinal');
    const trabajoInput = document.getElementById('trabajoFinal');

    const errorP1 = document.getElementById('errorParcial1');
    const errorP2 = document.getElementById('errorParcial2');
    const errorP3 = document.getElementById('errorParcial3');
    const errorExamen = document.getElementById('errorExamen');
    const errorTrabajo = document.getElementById('errorTrabajo');
    const resultadoElement = document.getElementById('resultado4');

    errorP1.textContent = errorP2.textContent = errorP3.textContent = errorExamen.textContent = errorTrabajo.textContent = '';
    resultadoElement.textContent = '';

    let esValido = true;
    if (!regexCalificacion.test(parcial1Input.value)) {
        errorP1.textContent = 'Nota inválida (rango 0-10)';
        esValido = false;
    }
    if (!regexCalificacion.test(parcial2Input.value)) {
        errorP2.textContent = 'Nota inválida (rango 0-10)';
        esValido = false;
    }
    if (!regexCalificacion.test(parcial3Input.value)) {
        errorP3.textContent = 'Nota inválida (rango 0-10)';
        esValido = false;
    }
    if (!regexCalificacion.test(examenInput.value)) {
        errorExamen.textContent = 'Nota inválida (rango 0-10)';
        esValido = false;
    }
    if (!regexCalificacion.test(trabajoInput.value)) {
        errorTrabajo.textContent = 'Nota inválida (rango 0-10)';
        esValido = false;
    }

    if (!esValido) return;

    const p1 = parseFloat(parcial1Input.value);
    const p2 = parseFloat(parcial2Input.value);
    const p3 = parseFloat(parcial3Input.value);
    const promedioParciales = (p1 + p2 + p3) / 3;

    const examen = parseFloat(examenInput.value);
    const trabajo = parseFloat(trabajoInput.value);

    const calificacionFinal = (promedioParciales * 0.55) + (examen * 0.30) + (trabajo * 0.15);

    resultadoElement.textContent = `Calificación final: ${calificacionFinal.toFixed(2)}`;
}

function calcularPorcentajeGenero() {
    const hombresInput = document.getElementById('cantHombres');
    const mujeresInput = document.getElementById('cantMujeres');

    const errorHombres = document.getElementById('errorHombres');
    const errorMujeres = document.getElementById('errorMujeres');
    const resultadoElement = document.getElementById('resultado5');

    errorHombres.textContent = errorMujeres.textContent = '';
    resultadoElement.textContent = '';

    let esValido = true;
    if (!regexNumeroPositivo.test(hombresInput.value) || Number(hombresInput.value) < 0) {
        errorHombres.textContent = 'Ingresa una cantidad válida';
        esValido = false;
    }
    if (!regexNumeroPositivo.test(mujeresInput.value) || Number(mujeresInput.value) < 0) {
        errorMujeres.textContent = 'Ingresa una cantidad válida';
        esValido = false;
    }

    if (!esValido) return;

    const hombres = Number(hombresInput.value);
    const mujeres = Number(mujeresInput.value);
    const totalEstudiantes = hombres + mujeres;

    if (totalEstudiantes === 0) {
        resultadoElement.textContent = 'El total de estudiantes no puede ser cero';
        return;
    }

    const porcentajeHombres = (hombres / totalEstudiantes) * 100;
    const porcentajeMujeres = (mujeres / totalEstudiantes) * 100;

    resultadoElement.textContent = `Hombres: ${porcentajeHombres.toFixed(2)}% | Mujeres: ${porcentajeMujeres.toFixed(2)}%`;
}

function calcularEdad() {
    const anioNacimientoInput = document.getElementById('anioNacimiento');
    const anioActualInput = document.getElementById('anioActual');

    const errorAnio = document.getElementById('errorAnio');
    const errorAnioActual = document.getElementById('errorAnioActual');
    const resultadoElement = document.getElementById('resultado6');

    errorAnio.textContent = errorAnioActual.textContent = '';
    resultadoElement.textContent = '';

    let esValido = true;
    if (!regexAnio.test(anioNacimientoInput.value)) {
        errorAnio.textContent = 'Ingresa un año válido (4 dígitos)';
        esValido = false;
    }
    if (!regexAnio.test(anioActualInput.value)) {
        errorAnioActual.textContent = 'Ingresa un año válido (4 dígitos)';
        esValido = false;
    }

    if (!esValido) return;

    const anioNacimiento = Number(anioNacimientoInput.value);
    const anioActual = Number(anioActualInput.value);

    if (anioNacimiento > anioActual) {
        resultadoElement.textContent = 'El año de nacimiento no puede ser mayor al año actual';
        return;
    }

    const edad = anioActual - anioNacimiento;
    resultadoElement.textContent = `La edad de la persona es: ${edad} años`;
}
