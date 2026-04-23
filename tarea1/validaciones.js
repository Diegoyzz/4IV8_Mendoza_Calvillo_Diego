const formulario = document.getElementById('miFormulario');
const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const telefono = document.getElementById('telefono');
const mensaje = document.getElementById('mensaje');

const errorNombre = document.getElementById('errorNombre');
const errorCorreo = document.getElementById('errorCorreo');
const errorTelefono = document.getElementById('errorTelefono');
const errorMensaje = document.getElementById('errorMensaje');

const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTelefono = /^[0-9]{10}$/;

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    let formularioValido = true;

    if(nombre.value.trim() === '') {
        errorNombre.textContent = 'El nombre es obligatorio';
        formularioValido = false;
    } else if(nombre.value.length < 3) {
        errorNombre.textContent = 'El nombre debe tener al menos 3 caracteres';
        formularioValido = false;
    } else {
        errorNombre.textContent = '';
    }

    if(correo.value.trim() === '') {
        errorCorreo.textContent = 'El correo es obligatorio';
        formularioValido = false;
    } else if(!regexCorreo.test(correo.value)) {
        errorCorreo.textContent = 'El formato del correo es inválido';
        formularioValido = false;
    } else {
        errorCorreo.textContent = '';
    }

    if(telefono.value.trim() === '') {
        errorTelefono.textContent = 'El teléfono es obligatorio';
        formularioValido = false;
    } else if(!regexTelefono.test(telefono.value)) {
        errorTelefono.textContent = 'El teléfono debe tener 10 dígitos numéricos';
        formularioValido = false;
    } else {
        errorTelefono.textContent = '';
    }

    if(mensaje.value.trim() === '') {
        errorMensaje.textContent = 'El mensaje no puede estar vacío';
        formularioValido = false;
    } else if(mensaje.value.length < 10) {
        errorMensaje.textContent = 'El mensaje debe tener al menos 10 caracteres';
        formularioValido = false;
    } else {
        errorMensaje.textContent = '';
    }

    if(formularioValido) {
        alert('¡Formulario enviado correctamente!');
        formulario.reset();
    }
});
