const preguntas = [
    // Pregunta 1
    {
        pregunta: "1. ¿Cuál es el objetivo principal del Análisis Químico Cualitativo?",
        opciones: ["Medir concentraciones.", "Identificar la sustancia.", "Determinar la humedad.", "Calibrar equipos."],
        respuestaCorrecta: "Identificar la sustancia.",
        valorPuntos: 10,
        mortal: false,
        pistaProfesor: "El nombre 'Cualitativo' se refiere a la calidad o naturaleza de algo.",
        explicacionDetallada: "El Análisis Cualitativo identifica componentes, mientras que el Cuantitativo se encarga de medir su concentración.",
        comodin5050: ["Identificar la sustancia.", "Medir concentraciones."],
        comodinAudiencia: { "Identificar la sustancia.": 85, "Medir concentraciones.": 10, "Determinar la humedad.": 3, "Calibrar equipos.": 2 }
    },

    // Pregunta 2
    {
        pregunta: "2. ¿Qué tipo de error afecta principalmente la Precisión de un análisis?",
        opciones: ["Sistemático (Ej. Coprecipitación).", "Aleatorio (Ej. Lectura de bureta).", "Error absoluto.", "Error relativo."],
        respuestaCorrecta: "Aleatorio (Ej. Lectura de bureta).",
        valorPuntos: 100,
        mortal: false,
        pistaProfesor: "El error aleatorio o indeterminado solo afecta la precisión.",
        explicacionDetallada: "Este error ocurre al azar, no se le conoce su causa y no se pueden evitar, mientras que el error determinado o sistemático se puede calcular, corregir y evitar.",
        comodin5050: ["Aleatorio (Ej. Lectura de bureta).", "Sistemático (Ej. Coprecipitación)."],
        comodinAudiencia: { "Aleatorio (Ej. Lectura de bureta).": 70, "Sistemático (Ej. Coprecipitación).": 20, "Error absoluto.": 5, "Error relativo.": 5 }
    },

    // Pregunta 3
    {
        pregunta: "3. En el Análisis Gravimétrico, ¿qué representa el Factor Gravimétrico (FG)?",
        opciones: ["El porcentaje de impurezas.", "El peso atómico del analito.", "La relación entre la masa del analito y la masa del precipitado.", "El porcentaje de humedad."],
        respuestaCorrecta: "La relación entre la masa del analito y la masa del precipitado.",
        valorPuntos: 500,
        mortal: false,
        pistaProfesor: "Es un cociente de pesos moleculares.",
        explicacionDetallada: "El FG es el factor estequiométrico que convierte la masa de la sustancia pesada (precipitado) en la masa del analito que se desea determinar.",
        comodin5050: ["La relación entre la masa del analito y la masa del precipitado.", "El porcentaje de impurezas."],
        comodinAudiencia: { "La relación entre la masa del analito y la masa del precipitado.": 90, "El porcentaje de humedad.": 5, "El peso atómico del analito.": 5 }
    },

    // Pregunta 4
    {
        pregunta: "4. Un analista obtiene valores muy dispersos para 5 réplicas. El método es:",
        opciones: ["Impreciso.", "Inexacto.", "Preciso y Exacto.", "Aceptable."],
        respuestaCorrecta: "Impreciso.",
        valorPuntos: 1000,
        mortal: false,
        pistaProfesor: "La dispersión se relaciona con la reproducibilidad de la medida.",
        explicacionDetallada: "La precisión mide la concordancia entre réplicas. Si están dispersas, el método es impreciso.",
        comodin5050: ["Impreciso.", "Inexacto."],
        comodinAudiencia: { "Impreciso.": 80, "Inexacto.": 15, "Preciso y Exacto.": 5 }
    },

    // Pregunta 5
    {
        pregunta: "5. El óxido de hierro ($Fe_2O_3$) se usa para determinar el % de Hierro (Fe). ¿Cuál es el factor estequiométrico (a/b) en el cálculo del FG?",
        opciones: ["1/1", "2/1", "1/2", "3/2"],
        respuestaCorrecta: "2/1",
        valorPuntos: 2000,
        mortal: false,
        pistaProfesor: "Mire cuántos átomos de Fe hay en la fórmula del óxido.",
        explicacionDetallada: "Hay 2 átomos de Fe en la fórmula ($Fe_2O_3$), por lo tanto el factor estequiométrico es 2/1.",
        comodin5050: ["2/1", "1/1"],
        comodinAudiencia: { "2/1": 70, "1/1": 20, "1/2": 10 }
    },

    // Pregunta 6
    {
        pregunta: "6. Si el Error Relativo de un análisis es del -15%, esto indica que el valor obtenido es:",
        opciones: ["Muy preciso.", "Muy por debajo del valor verdadero.", "Muy por encima del valor verdadero.", "Inaceptable."],
        respuestaCorrecta: "Muy por debajo del valor verdadero.",
        valorPuntos: 5000,
        mortal: false,
        pistaProfesor: "Un error negativo significa que el valor medido es menor que el valor real.",
        explicacionDetallada: "El Error Relativo se calcula como (Valor Medido - Valor Verdadero) / Valor Verdadero. Un resultado negativo implica que el Valor Medido es inferior al Valor Verdadero.",
        comodin5050: ["Muy por debajo del valor verdadero.", "Muy por encima del valor verdadero."],
        comodinAudiencia: { "Muy por debajo del valor verdadero.": 75, "Muy por encima del valor verdadero.": 15, "Muy preciso.": 10 }
    },

    // Pregunta 7
    {
        pregunta: "7. ¿Cuál de las siguientes etapas NO es crítica para asegurar la pureza del precipitado en Gravimetría?",
        opciones: ["Digestión.", "Lavado.", "Precipitación.", "Cálculo del porcentaje."],
        respuestaCorrecta: "Cálculo del porcentaje.",
        valorPuntos: 10000,
        mortal: false,
        pistaProfesor: "Las etapas A, B, y C son manipulaciones físicas o químicas de la muestra.",
        explicacionDetallada: "La pureza se establece durante las etapas de formación y manipulación del precipitado (Precipitación, Digestión y Lavado). El cálculo es una operación matemática posterior.",
        comodin5050: ["Cálculo del porcentaje.", "Digestión."],
        comodinAudiencia: { "Cálculo del porcentaje.": 80, "Digestión.": 10, "Lavado.": 5, "Precipitación.": 5 }
    },

    // Pregunta 8 (Cálculo de Humedad y MUERTE SÚBITA)
    {
        pregunta: "8. Una muestra húmeda de 2.00 g pierde 0.05 g después de secarse. ¿Cuál es su % de Humedad? (Cálculo: (0.05 / 2.00) * 100)",
        opciones: ["2.0%", "2.2%", "2.5%", "5.0%"],
        respuestaCorrecta: "2.5%",
        valorPuntos: 20000, 
        mortal: true, 
        pistaProfesor: "La fórmula es: (Pérdida de Masa / Masa Original) * 100.",
        explicacionDetallada: "El porcentaje se calcula dividiendo la masa de agua (0.05 g) entre la masa húmeda total (2.00 g) y multiplicando por 100, resultando en 2.5%.",
        comodin5050: ["2.5%", "5.0%"],
        comodinAudiencia: { "2.5%": 75, "2.0%": 15, "2.2%": 5, "5.0%": 5 }
    },

    // Pregunta 9
    {
        pregunta: "9. El FG de Ni/Ni(DMG) es 0.203. Si obtienes 1.00 g de precipitado, ¿cuántos gramos de Ni están presentes? (Cálculo: 1.00 g * 0.203)",
        opciones: ["0.050 g", "0.101 g", "0.203 g", "0.406 g"],
        respuestaCorrecta: "0.203 g",
        valorPuntos: 50000, 
        mortal: true, 
        pistaProfesor: "El factor gravimétrico es la proporción de gramos de analito por gramo de precipitado.",
        explicacionDetallada: "Masa de Ni = Masa de Precipitado * FG = 1.00 g * 0.203 = 0.203 g.",
        comodin5050: ["0.203 g", "0.406 g"],
        comodinAudiencia: { "0.203 g": 95, "0.406 g": 5 }
    },

    // Pregunta 10 (El gran final - Diagnóstico)
    {
        pregunta: "10. Media 69.2, Verdadero 43.5. Diagnóstico.",
        opciones: ["El método es Preciso y Exacto (Bajo Error).", "El método es Preciso pero Inexacto (Error Sistemático).", "El método es Impreciso y Exacto (Error Aleatorio).", "El método es Impreciso e Inexacto."],
        respuestaCorrecta: "El método es Preciso pero Inexacto (Error Sistemático).",
        valorPuntos: 100000, 
        mortal: true, 
        pistaProfesor: "Si la media está lejos del valor verdadero, hay un problema de exactitud (sesgo).",
        explicacionDetallada: "El valor medio (69.2) está muy lejos del valor verdadero (43.5), lo que indica Inexactitud o Error Sistemático.",
        comodin5050: ["El método es Preciso pero Inexacto (Error Sistemático).", "El método es Preciso y Exacto (Bajo Error)."],
        comodinAudiencia: { "El método es Preciso pero Inexacto (Error Sistemático).": 80, "El método es Preciso y Exacto (Bajo Error).": 10, "El método es Impreciso y Exacto (Error Aleatorio).": 5, "El método es Impreciso e Inexacto.": 5 }
    }
];