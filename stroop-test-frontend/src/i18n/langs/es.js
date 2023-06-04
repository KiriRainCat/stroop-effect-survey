import esLocale from 'element-plus/lib/locale/lang/es'

const es = {
  home: {
    welcome: 'Bienvenido/a a la encuesta de prueba del efecto Stroop',
    instruction: 'Por favor, responda las preguntas con calma. Completar la encuesta tomará aproximadamente de 30 a 60 segundos.',
    lang: 'Seleccione el idioma con el que se sienta más familiarizado/a:',
  },
  survey: {
    instruction: 'Su objetivo es seleccionar el color que coincide con el color de la palabra',
    question: 'Por favor, seleccione la opción que coincide con el color de la palabra de las 5 opciones disponibles',
    ready: 'Estoy listo/a',
  },
  result: {
    instruction: 'Por favor, complete el siguiente formulario. Su informe de prueba se mostrará después de enviar el formulario.',
    matchedAvgTime: 'Cuando el color del texto y el significado coinciden:',
    unmatchedAvgTime: 'Cuando el color del texto y el significado no coinciden:',
    diffBetweenTwoAvg: 'Diferencia entre los dos tiempos de respuesta promedio:',
    totalWrong: 'Total de respuestas incorrectas:',
    specialWrong: 'Incorrectas, pero la opción elegida coincide con el significado de la palabra:',
    success: 'Gracias por su paciencia. ¡Que tenga un buen día!',
    invalidData: 'Conjunto de datos no válido, demasiados tiempos de espera o respuestas incorrectas. Por favor, realice la prueba nuevamente. Gracias',
    title: 'Sus resultados de prueba son los siguientes:',
    done: 'Ha completado la encuesta. Estos son sus resultados',
  },
  words: {
    instruction: 'Instrucciones',
    age: 'Edad',
    submit: 'Enviar',
    avgResponseTime: 'Tiempo promedio de respuesta',
    seconds: 'segundos',
    incorrectAnswers: 'Respuestas incorrectas',
    times: 'veces',
    variables: 'Variables',
    pleaseInput: 'Por favor, ingrese',
    clickToBegin: 'Haga clic aquí para comenzar',
    date: 'fecha',
    red: 'rojo',
    blue: 'azul',
    green: 'verde',
    black: 'negro',
    yellow: 'amarillo',
  },
  messages: {
    createBy: 'Creado por: KiriRainCat (Sam Zhou)',
    error: 'Se produjo un error. Por favor, póngase en contacto con el administrador o el desarrollador.',
    ageLimit: 'La edad debe estar entre 1 y 120',
    gpaLimit: 'El GPA debe estar entre 0.1 y 5.5',
    fillForm: 'Por favor, complete el formulario correctamente',
  },
  ...esLocale,
}

export default es
