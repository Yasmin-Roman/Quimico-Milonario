// ====================================================================
// === 1. VARIABLES GLOBALES Y ELEMENTOS DEL DOM ===
// ====================================================================

// --- ESTADO DEL JUEGO ---
let preguntasActuales = [];
let indicePreguntaActual = 0;
let puntuacion = 0;
let preguntasRespondidas = 0;
const MAX_PREGUNTAS = 10;
let musicaSuspenso; // Variable global para controlar la música de fondo


// --- TEMPORIZADOR ---
let tiempoLimite = 45; // Tiempo en segundos
let tiempoRestante = tiempoLimite;
let temporizadorID; // Referencia del setInterval

// --- ESTADO DE COMODINES ---
let comodin5050Usado = false;
let comodinAudienciaUsado = false;
let comodinPistaUsado = false;

// --- ELEMENTOS DEL DOM ---
const inicioContainer = document.getElementById('inicio-container');
const registroForm = document.getElementById('registro-form');
const GOOGLE_FORM_ID = '1FAIpQLSeCgAzb6fWLDhM7fAJaFx4CWRQ9q6Lsdpxyp6c_Bc9MUSLWbw'; 
const ENTRY_NOMBRE = 'entry.1071194020'; 
const ENTRY_CEDULA = 'entry.678524081'; 
const ENTRY_CORREO = 'entry.544834782'; 
const ENTRY_PUNTUACION = 'entry.1655494894'; 
const ENTRY_DIAGNOSTICO = 'entry.989143805';

const juegoContainer = document.getElementById('juego-container');
const preguntaTitulo = document.getElementById('pregunta-titulo');
const opcionesContainer = document.getElementById('opciones-container');
const tiempoRestanteDisplay = document.getElementById('tiempo-restante');
const puntuacionTotal = document.getElementById('puntuacion-total');
const preguntaContadorDisplay = document.getElementById('pregunta-contador');
const muerteSubitaIndicador = document.getElementById('muerte-subita-indicador');
const resultadoFinalContainer = document.getElementById('resultado-final');
const puntuacionFinalDisplay = document.getElementById('puntuacion-final');
const siguienteBtn = document.getElementById('siguiente-btn');

// Elementos del Modal
const feedbackModal = document.getElementById('feedback-modal');
const modalTitulo = document.getElementById('modal-titulo');
const modalMensaje = document.getElementById('modal-mensaje');
const modalCerrarBtn = document.getElementById('modal-cerrar');

// Botones de Comodines
const comodin5050Btn = document.getElementById('comodin-5050');
const comodinAudienciaBtn = document.getElementById('comodin-audiencia');
const comodinPistaBtn = document.getElementById('comodin-pista');


// ====================================================================
// === 2. FUNCIONES AUXILIARES (AUDIO, BARAJE Y MODAL) ===
// ====================================================================

// --- A. Audio ---
// --- En la función reproducirSuspenso() ---
function reproducirSuspenso() {
    // 1. Detener y limpiar cualquier música anterior
    if (musicaSuspenso) {
        musicaSuspenso.pause();
        musicaSuspenso.currentTime = 0; 
    }
    
    // 2. Cargar y configurar el bucle
    musicaSuspenso = new Audio('sounds/suspenso.mp3');
    musicaSuspenso.volume = 0.5; // Volumen medio
    musicaSuspenso.loop = true; // ¡Habilitar el bucle!
    musicaSuspenso.play().catch(error => console.warn("Error al reproducir suspenso:", error));
}

// --- La función reproducirSonido es la base para Acierto/Error ---
function reproducirSonido(filePath) {
    const audio = new Audio(filePath);
    audio.volume = 0.7;
    // El catch es importante para evitar errores de políticas de autoplay
    audio.play().catch(error => console.warn("Error al intentar reproducir audio:", error)); 
}
// Las funciones reproducirAcierto/Error deben llamar a reproducirSonido
function reproducirAcierto() {
    reproducirSonido('sounds/acierto.mp3'); 
}
function reproducirError() {
    reproducirSonido('sounds/error.mp3');
}

// --- B. Baraje de Opciones (Fisher-Yates) ---
function barajarOpciones(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// --- C. Modal ---
function mostrarModal(titulo, mensaje, tipo) {
    modalTitulo.textContent = titulo;
    modalMensaje.innerHTML = mensaje; 
    feedbackModal.style.display = 'flex';
}

function cerrarModal() {
    feedbackModal.style.display = 'none';
    modalCerrarBtn.onclick = cerrarModal; // Restablecer el listener por defecto
}


// ====================================================================
// === 3. LÓGICA DE TEMPORIZADOR ===
// ====================================================================

// --- 3.1 Función para actualizar la visualización del tiempo ---
function actualizarTiempoDisplay() {
    tiempoRestanteDisplay.textContent = tiempoRestante; 
}

// --- 3.2 Función para detener el temporizador (y el audio) ---
function detenerTemporizador() {
    if (temporizadorID) {
        clearInterval(temporizadorID);
        temporizadorID = null;
    }
    
    // Dejamos el control de audio limpio y funcional aquí
    if (musicaSuspenso) {
        musicaSuspenso.pause();
    }
}

// --- 3.3 Función para iniciar el temporizador ---
function iniciarTemporizador() {
    // 1. Limpieza segura del temporizador anterior
    if (temporizadorID) {
        clearInterval(temporizadorID); 
        temporizadorID = null;
    }

    // 2. Reinicio de la variable de tiempo y el temporizador
    tiempoRestante = 45; // Asumimos 45 segundos
    actualizarTiempoDisplay(); 

    // 3. Establecer el nuevo intervalo
    temporizadorID = setInterval(() => {
        tiempoRestante--;
        actualizarTiempoDisplay();

        if (tiempoRestante <= 0) {
            detenerTemporizador(); 
            manejarTiempoAgotado(); // Llama a la lógica de tiempo agotado
        }
    }, 1000);
}

// --- 3.4 Función para manejar el tiempo agotado ---
function manejarTiempoAgotado() {
    reproducirError();
    document.querySelectorAll('.btn-opcion').forEach(btn => btn.disabled = true);
    
    const preguntaActual = preguntasActuales[indicePreguntaActual];
    
    // Mostrar la respuesta correcta
    const botonCorrecto = Array.from(document.querySelectorAll('.btn-opcion'))
        .find(btn => btn.textContent === preguntaActual.respuestaCorrecta);
    if (botonCorrecto) {
        botonCorrecto.classList.add('correcto');
    }

    mostrarModal("¡Tiempo Agotado!", `No respondiste a tiempo. La respuesta correcta era: ${preguntaActual.respuestaCorrecta}.`, 'error');
    
    // Configurar el botón del modal para terminar el juego
    modalCerrarBtn.onclick = terminarJuego;
}
// ====================================================================
// === 4. LÓGICA PRINCIPAL DEL JUEGO ===
// ====================================================================

function iniciarJuego() {
    inicioContainer.style.display = 'none';
    juegoContainer.style.display = 'block';

    // Cargar preguntas en ORDEN (de menor a mayor dificultad)
    preguntasActuales = [...preguntas]; 
    
    // Configurar Event Listeners de Comodines y Modal
    comodin5050Btn.addEventListener('click', usarComodin5050);
    comodinAudienciaBtn.addEventListener('click', usarComodinAudiencia);
    comodinPistaBtn.addEventListener('click', usarComodinPista);
    modalCerrarBtn.onclick = cerrarModal; 

    cargarPregunta(indicePreguntaActual);
}

function cargarPregunta(indice) {
    if (indice >= preguntasActuales.length) {
        terminarJuego();
        return;
    }
    
    reproducirSuspenso(); 

    const pregunta = preguntasActuales[indice];
    
    // Barajar y preparar las opciones
    const opcionesBarajadas = barajarOpciones([...pregunta.opciones]); // Crea una copia para barajar
    
    // Actualizar Contadores
    preguntasRespondidas = indice + 1; // Usar el índice para asegurar la numeración correcta
    preguntaContadorDisplay.textContent = `${preguntasRespondidas}/${MAX_PREGUNTAS}`;
    preguntaTitulo.textContent = pregunta.pregunta;
    opcionesContainer.innerHTML = ''; 
    siguienteBtn.style.display = 'none'; 

    // Muerte Súbita
    muerteSubitaIndicador.style.display = pregunta.mortal ? 'block' : 'none';

    // Crear botones
    opcionesBarajadas.forEach(opcionTexto => {
        const btnOpcion = document.createElement('button');
        btnOpcion.classList.add('btn-opcion');
        btnOpcion.textContent = opcionTexto;
        
        btnOpcion.addEventListener('click', () => {
            verificarRespuesta(opcionTexto, pregunta, btnOpcion);
        });
        opcionesContainer.appendChild(btnOpcion);
    });

    iniciarTemporizador(); // Iniciar el temporizador para la nueva pregunta
}

function verificarRespuesta(seleccion, pregunta, boton) {
    detenerTemporizador(); // DETENER EL TIEMPO AL RESPONDER
    document.querySelectorAll('.btn-opcion').forEach(btn => btn.disabled = true);
    
    // Bandera para saber si es la última pregunta
    const esUltimaPregunta = (indicePreguntaActual === preguntasActuales.length - 1);

    if (seleccion === pregunta.respuestaCorrecta) {
        // --- RESPUESTA CORRECTA ---
        reproducirAcierto();
        puntuacion += pregunta.valorPuntos;
        puntuacionTotal.textContent = puntuacion;
        boton.classList.add('correcto');
 
        if (esUltimaPregunta) {
            // Última pregunta: Ocultar Siguiente y configurar Modal para TERMINAR JUEGO
            siguienteBtn.style.display = 'none';
            modalCerrarBtn.onclick = terminarJuego; 
            
            mostrarModal("¡Respuesta Correcta!", 
                         `¡Felicidades! Completaste el juego. Ganaste ${pregunta.valorPuntos} puntos. Explicación: ${pregunta.explicacionDetallada}`, 
                         'success');
            return; // Terminar la ejecución aquí
        }

        // Si NO es la última pregunta, configurar para AVANZAR
        mostrarModal("¡Respuesta Correcta!", `Ganaste ${pregunta.valorPuntos} puntos. Explicación: ${pregunta.explicacionDetallada}`, 'success');
        siguienteBtn.style.display = 'block';
        siguienteBtn.onclick = avanzarPregunta;


    } else {
        // --- RESPUESTA INCORRECTA ---
        reproducirError();
        boton.classList.add('incorrecto');
        
        // Mostrar la respuesta correcta
        const botonCorrecto = Array.from(document.querySelectorAll('.btn-opcion'))
            .find(btn => btn.textContent === pregunta.respuestaCorrecta);
        if (botonCorrecto) {
            botonCorrecto.classList.add('correcto');
        }

        if (pregunta.mortal || esUltimaPregunta) { 
            // Si es Muerte Súbita O la Última Pregunta (y es incorrecta)
            const mensajeTitulo = pregunta.mortal ? "❌ ¡Fin del Juego!" : "¡Juego Terminado!";
            
            mostrarModal(mensajeTitulo, 
                         `Respuesta incorrecta. Explicación: ${pregunta.explicacionDetallada}`, 
                         'error');
            
            // Siempre terminar el juego en este caso
            modalCerrarBtn.onclick = terminarJuego;
            siguienteBtn.style.display = 'none';
        } else {
            // Incorrecta pero NO Muerte Súbita y NO es la última pregunta
            mostrarModal("Incorrecto.", `Perdiste esta pregunta. Explicación: ${pregunta.explicacionDetallada}`, 'warning');
            siguienteBtn.style.display = 'block';
            siguienteBtn.onclick = avanzarPregunta;
        }
    }
}
function avanzarPregunta() {
    // Si el modal está abierto, primero ciérralo
    cerrarModal(); 

    if (indicePreguntaActual < preguntasActuales.length - 1) {
        indicePreguntaActual++;
        cargarPregunta(indicePreguntaActual);
    } else {
        terminarJuego(); 
    }
}

// En script.js (función terminarJuego)

/**
 * Muestra la pantalla de resultados finales y genera un mensaje de diagnóstico.
 */
function terminarJuego() {
    detenerTemporizador();
    juegoContainer.style.display = 'none';
    resultadoFinalContainer.style.display = 'block';
    
    // 1. Mostrar la puntuación total
    puntuacionFinalDisplay.textContent = puntuacion;
    
    // 2. Generar el mensaje de diagnóstico basado en la puntuación
    const mensajeDiagnostico = generarDiagnostico(puntuacion);
    
    // 3. Crear un nuevo elemento para el mensaje y adjuntarlo (o usar uno existente)
    // Suponiendo que tienes un elemento con ID 'diagnostico-final' en tu HTML
    let diagnosticoDisplay = document.getElementById('diagnostico-final');
    if (!diagnosticoDisplay) {
        // Si no existe, lo creamos justo debajo de la puntuación
        diagnosticoDisplay = document.createElement('p');
        diagnosticoDisplay.id = 'diagnostico-final';
        diagnosticoDisplay.classList.add('mensaje-diagnostico');
        resultadoFinalContainer.appendChild(diagnosticoDisplay);
    }
    diagnosticoDisplay.innerHTML = mensajeDiagnostico;
    
    // Ocultar modal si estaba abierto antes de terminar el juego
    feedbackModal.style.display = 'none'; 
    // >>> INICIO DEL BLOQUE DE RECOLECCIÓN DE DATOS SEGURO (GOOGLE FORMS) <<<
    
    // Recolección Segura: Obtener los valores en el último momento posible (y verificar si existen)
    // El '?' es un operador ternario que previene el error si el elemento no existe.
    const nombre = document.getElementById('nombre-input') ? document.getElementById('nombre-input').value.trim() : 'N/A';
    const cedula = document.getElementById('cedula-input') ? document.getElementById('cedula-input').value.trim() : 'N/A';
    const correo = document.getElementById('correo-input') ? document.getElementById('correo-input').value.trim() : 'N/A';

    const datosFinales = {
        Nombre: nombre, 
        Cedula: cedula, 
        Correo: correo,
        Puntuacion: puntuacion,
        // Limpiamos el HTML del diagnóstico antes de enviarlo
        Diagnostico: generarDiagnostico(puntuacion).replace(/<[^>]*>?/gm, '') 
    };

    enviarResultados(datosFinales); // ¡LLAMADA A Google Forms!
    // >>> FIN DEL BLOQUE DE RECOLECCIÓN <<<
}

/**
 * Genera un mensaje de retroalimentación basado en la puntuación.
 * @param {number} puntos - Puntuación total obtenida.
 * @returns {string} Mensaje de diagnóstico HTML.
 */
function generarDiagnostico(puntos) {
    const MAX_PUNTUACION_POSIBLE = 190110; // Suma de todos los puntos de las 10 preguntas
    const porcentaje = (puntos / MAX_PUNTUACION_POSIBLE) * 100;

    let titulo, mensaje;

    if (porcentaje >= 90) {
        titulo = "🎓 ¡MAESTRÍA EN ANÁLISIS QUÍMICO!";
        mensaje = "Tu dominio del contenido es excepcional. ¡Felicidades, demuestras un profundo conocimiento de la materia!";
    } else if (porcentaje >= 65) {
        titulo = "✅ RESULTADO ACEPTABLE Y SÓLIDO.";
        mensaje = "Tienes una base muy fuerte. Lograste superar la mayoría de los desafíos con éxito.";
    } else if (porcentaje >= 40) {
        titulo = "⚠️ NECESITAS REFORZAR ALGUNOS TEMAS.";
        mensaje = "Lograste pasar las preguntas básicas, pero es necesario revisar la Gravimetría y los cálculos.";
    } else {
        titulo = "❌ REVISA LOS FUNDAMENTOS.";
        mensaje = "Te recomendamos revisar los conceptos básicos de Precisión, Exactitud y los Fundamentos de Gravimetría.";
    }

    return `<h2 style="color: var(--color-principal); margin-top: 15px;">${titulo}</h2><p>${mensaje}</p>`;
}

// ====================================================================
// === 5. LÓGICA DE COMODINES ===
// ====================================================================

function usarComodin5050() {
    if (comodin5050Usado) return;
    comodin5050Usado = true;
    comodin5050Btn.disabled = true;
    comodin5050Btn.classList.add('usado');

    const pregunta = preguntasActuales[indicePreguntaActual];
    const comodinData = pregunta.comodin5050; // Array: [correcta, 1 incorrecta]

    const botones = document.querySelectorAll('.btn-opcion');
    
    botones.forEach(btn => {
        if (!comodinData.includes(btn.textContent)) {
            // Ocultar las que NO están en comodinData
            btn.style.opacity = '0.3';
            btn.style.pointerEvents = 'none'; 
        }
    });

    mostrarModal("Comodín 50:50 Activado", "Se han eliminado dos opciones incorrectas.", 'info');
}

function usarComodinAudiencia() {
    if (comodinAudienciaUsado) return;
    comodinAudienciaUsado = true;
    comodinAudienciaBtn.disabled = true;
    comodinAudienciaBtn.classList.add('usado');

    const pregunta = preguntasActuales[indicePreguntaActual];
    const resultados = pregunta.comodinAudiencia;

   let mensaje = "El público vota de la siguiente manera:<br>";
    
    // Generar la visualización con barras de progreso
    for (const [opcion, porcentaje] of Object.entries(resultados)) {
        // Aseguramos que la barra más alta se vea en color destacado
        const colorBarra = (porcentaje >= 50) ? '#238636' : '#58a6ff'; // Verde para alta confianza, Azul para el resto

        mensaje += `
            <div style="margin: 10px 0; font-size: 0.9em;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                    <span>${opcion}</span> 
                    <strong>${porcentaje}%</strong>
                </div>
                <div style="background-color: #30363d; height: 10px; border-radius: 5px;">
                    <div style="background-color: ${colorBarra}; width: ${porcentaje}%; height: 100%; border-radius: 5px; transition: width 0.5s;"></div>
                </div>
            </div>
        `;
    }

    mostrarModal("Voto de la Audiencia", mensaje, 'info');
}
function usarComodinPista() {
    if (comodinPistaUsado) return;
    comodinPistaUsado = true;
    comodinPistaBtn.disabled = true;
    comodinPistaBtn.classList.add('usado');

    const pregunta = preguntasActuales[indicePreguntaActual];
    const pista = pregunta.pistaProfesor;

    mostrarModal("Pista del Profesor", `¡Cuidado! La pista es: **${pista}**`, 'info');
}


// ====================================================================
// === 6. ASIGNACIÓN DE EVENTOS INICIALES ===
// ====================================================================

registroForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    iniciarJuego();
});
// CÓDIGO A REEMPLAZAR en la Sección 7 (Lógica de Google Forms)

function enviarResultados(datos) {
    // 1. Codificar los datos para la URL
    const nombreCodificado = encodeURIComponent(datos.Nombre);
    const cedulaCodificada = encodeURIComponent(datos.Cedula);
    const correoCodificado = encodeURIComponent(datos.Correo);
    const puntuacionCodificada = encodeURIComponent(datos.Puntuacion);
    const diagnosticoCodificado = encodeURIComponent(datos.Diagnostico);

    // 2. Construir la URL completa de Google Forms
    const url = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse?` +
        `${ENTRY_NOMBRE}=${nombreCodificado}&` +
        `${ENTRY_CEDULA}=${cedulaCodificada}&` +
        `${ENTRY_CORREO}=${correoCodificado}&` +
        `${ENTRY_PUNTUACION}=${puntuacionCodificada}&` +
        `${ENTRY_DIAGNOSTICO}=${diagnosticoCodificado}&` +
        `submit=Submit`;

    // 3. Método garantizado: Abrir y cerrar una pestaña para forzar el envío
    // Esto evita los problemas de seguridad (CORS) de GitHub Pages.
    try {
        const ventanaEmergente = window.open(url, '_blank');
        
        // Esperar un momento (500ms) para que el navegador registre el envío de la URL
        // y luego cerrar la ventana para que sea invisible al usuario.
        setTimeout(() => {
            if (ventanaEmergente) {
                ventanaEmergente.close();
                console.log("Resultados enviados exitosamente por redirección temporal.");
            }
        }, 500); 
        
    } catch (error) {
        console.error('Error al intentar abrir la ventana de envío (Posiblemente bloqueada):', error);
    }
}



