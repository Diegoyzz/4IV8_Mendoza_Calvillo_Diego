// =========================================================================
// 1. BASE DE DATOS REMOTA (API REST con SQLite)
// =========================================================================
const BaseDeDatos = {
    obtenerVideos() {
        return fetch('/api/videos')
            .then(res => {
                if (!res.ok) throw new Error('No se pudo obtener los videos.');
                return res.json();
            });
    },

    guardarVideo(nuevoVideo) {
        return fetch('/api/videos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                titulo: nuevoVideo.titulo,
                canal: nuevoVideo.canal,
                categoria: nuevoVideo.categoria,
                puntuacion: parseInt(nuevoVideo.puntuacion, 10),
                resena: nuevoVideo.resena
            })
        }).then(async (res) => {
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error || 'Error al guardar el video.');
            }
            return res.json();
        });
    },

    eliminarVideo(id) {
        return fetch(`/api/videos/${id}`, { method: 'DELETE' })
            .then(async (res) => {
                if (!res.ok) {
                    const body = await res.json().catch(() => ({}));
                    throw new Error(body.error || 'Error al eliminar el video.');
                }
            });
    },

    editarVideo(id, cambios) {
        return fetch(`/api/videos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                titulo: cambios.titulo,
                canal: cambios.canal,
                categoria: cambios.categoria,
                puntuacion: parseInt(cambios.puntuacion, 10),
                resena: cambios.resena
            })
        }).then(async (res) => {
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error || 'Error al actualizar el video.');
            }
            return res.json();
        });
    }
};

// =========================================================================
// 2. CAPA DE SEGURIDAD EN FRONTEND (Filtro Anti-XSS)
// =========================================================================
const Seguridad = {
    // Transforma caracteres especiales de HTML en texto inofensivo
    escaparHTML(texto) {
        if (typeof texto !== 'string') return '';
        return texto.replace(/[&<>"'/]/g, (caracter) => {
            const mapaEntidades = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                '/': '&#x2F;'
            };
            return mapaEntidades[caracter];
        });
    }
};

// =========================================================================
// 3. INTERACTIVIDAD DE LA APLICACIÓN (Controlador y Vista)
// =========================================================================
const App = {
    formulario: document.getElementById('videoForm'),
    tabla: document.getElementById('tablaVideos'),
    alertBox: document.getElementById('alertBox'),

    init() {
        this.formulario.addEventListener('submit', (e) => this.manejadorSubmit(e));
        this.renderizarTabla();
    },

    mostrarAlerta(mensaje, tipo) {
        this.alertBox.textContent = mensaje;
        this.alertBox.className = `alert alert-${tipo}`;
        setTimeout(() => { this.alertBox.className = 'alert'; }, 4000);
    },

    async manejadorSubmit(evento) {
        evento.preventDefault();

        const datosForm = {
            titulo: document.getElementById('txtTitulo').value.trim(),
            canal: document.getElementById('txtCanal').value.trim(),
            categoria: document.getElementById('txtCategoria').value,
            puntuacion: document.getElementById('txtPuntuacion').value,
            resena: document.getElementById('txtResena').value.trim()
        };

        if (!datosForm.titulo || !datosForm.canal || !datosForm.categoria || !datosForm.puntuacion || !datosForm.resena) {
            this.mostrarAlerta('Error: Por favor, llena todos los apartados y escribe una reseña.', 'error');
            return;
        }

        const numEstrellas = parseInt(datosForm.puntuacion, 10);
        if (isNaN(numEstrellas) || numEstrellas < 1 || numEstrellas > 5) {
            this.mostrarAlerta('Error: Puntuación inválida.', 'error');
            return;
        }

        try {
            await BaseDeDatos.guardarVideo(datosForm);
            this.formulario.reset();
            this.mostrarAlerta('¡Video añadido a tus favoritos con éxito!', 'success');
            await this.renderizarTabla();
        } catch (error) {
            this.mostrarAlerta(`Error: ${error.message}`, 'error');
        }
    },

    async renderizarTabla() {
        this.tabla.innerHTML = '';

        let videos;
        try {
            videos = await BaseDeDatos.obtenerVideos();
        } catch (error) {
            this.tabla.innerHTML = `<tr><td colspan="6" class="no-data">No se pudo cargar la lista de videos.</td></tr>`;
            this.mostrarAlerta(`Error: ${error.message}`, 'error');
            return;
        }

        if (videos.length === 0) {
            this.tabla.innerHTML = `<tr><td colspan="6" class="no-data">No has agregado videos a tu lista de favoritos.</td></tr>`;
            return;
        }

        videos.forEach(video => {
            const fila = document.createElement('tr');
            const tituloSeguro = Seguridad.escaparHTML(video.titulo);
            const canalSeguro = Seguridad.escaparHTML(video.canal);
            const categoriaSeguro = Seguridad.escaparHTML(video.categoria);
            const resenaSeguro = Seguridad.escaparHTML(video.resena);
            const estrellasVisuales = '⭐'.repeat(video.puntuacion);

            fila.innerHTML = `
                <td><strong>${tituloSeguro}</strong></td>
                <td>${canalSeguro}</td>
                <td>${categoriaSeguro}</td>
                <td>${estrellasVisuales}</td>
                <td><div class="resena-texto">${resenaSeguro}</div></td>
                <td>
                    <button class="btn-edit" data-id="${video.id}">✏️ Editar</button>
                    <button class="btn-delete" data-id="${video.id}">❌ Eliminar</button>
                </td>
            `;

            fila.querySelector('.btn-edit').addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                const tituloActual = video.titulo;
                const canalActual = video.canal;
                const categoriaActual = video.categoria;
                const puntuacionActual = video.puntuacion;
                const resenaActual = video.resena;

                const nuevoTitulo = prompt('Edita el título:', tituloActual);
                if (nuevoTitulo === null) return;

                const nuevoCanal = prompt('Edita el canal:', canalActual);
                if (nuevoCanal === null) return;

                const nuevaCategoria = prompt('Edita la categoría:', categoriaActual);
                if (nuevaCategoria === null) return;

                const nuevaPuntuacion = prompt('Edita la puntuación (1-5):', puntuacionActual);
                if (nuevaPuntuacion === null) return;

                const nuevaResena = prompt('Edita la reseña:', resenaActual);
                if (nuevaResena === null) return;

                const tituloLimpio = nuevoTitulo.trim();
                const canalLimpio = nuevoCanal.trim();
                const categoriaLimpia = nuevaCategoria.trim();
                const puntuacionValidada = parseInt(nuevaPuntuacion, 10);
                const resenaLimpia = nuevaResena.trim();

                if (!tituloLimpio || !canalLimpio || !categoriaLimpia || !resenaLimpia) {
                    this.mostrarAlerta('Error: Todos los campos deben estar completos.', 'error');
                    return;
                }

                if (isNaN(puntuacionValidada) || puntuacionValidada < 1 || puntuacionValidada > 5) {
                    this.mostrarAlerta('Error: La puntuación debe ser un número entre 1 y 5.', 'error');
                    return;
                }

                try {
                    await BaseDeDatos.editarVideo(id, {
                        titulo: tituloLimpio,
                        canal: canalLimpio,
                        categoria: categoriaLimpia,
                        puntuacion: puntuacionValidada,
                        resena: resenaLimpia
                    });
                    await this.renderizarTabla();
                    this.mostrarAlerta('Video actualizado correctamente.', 'success');
                } catch (error) {
                    this.mostrarAlerta(`Error: ${error.message}`, 'error');
                }
            });

            fila.querySelector('.btn-delete').addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                if (!confirm('¿Deseas eliminar este video de tus favoritos?')) return;

                try {
                    await BaseDeDatos.eliminarVideo(id);
                    await this.renderizarTabla();
                    this.mostrarAlerta('Video eliminado de la lista.', 'success');
                } catch (error) {
                    this.mostrarAlerta(`Error: ${error.message}`, 'error');
                }
            });

            this.tabla.appendChild(fila);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());