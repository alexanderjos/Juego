const wordList = [
    { word: "PERRO", image: "imagenes/perro.png", hint: "Es un animal doméstico que ladra.", audio: "audios/perro.mp3" },
    { word: "GATO", image: "imagenes/gato.png", hint: "Es un animal doméstico que maúlla.", audio: "audios/gato.mp3" },
    { word: "ELEFANTE", image: "imagenes/elefante.png", hint: "Es un animal muy grande con orejas grandes.", audio: "audios/elefante.mp3" },

    
];

let currentRound = 0;  // Ronda actual
let score = 0;         // Puntaje
let lives = 3;         // Vidas iniciales
let audioElement = null; // Variable global para controlar el audio

// Función para generar los cuadros de letras
function generateLetterBoxes() {
    const letterBoxesContainer = document.getElementById("letter-boxes");
    letterBoxesContainer.innerHTML = ""; // Limpiar el contenedor

    const word = wordList[currentRound].word;
    for (let i = 0; i < word.length; i++) {
        const box = document.createElement("div");
        box.classList.add("letter-box");

        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.classList.add("input-box");
        input.oninput = () => input.value = input.value.toUpperCase(); // Convertir a mayúsculas
        box.appendChild(input);

        letterBoxesContainer.appendChild(box);
    }
}

// Función para mostrar la pista en el modal y cargar el audio correspondiente
function showHelp() {
    const hint = wordList[currentRound].hint;
    const audioSrc = wordList[currentRound].audio;

    // Mostrar la pista
    document.getElementById("helpText").innerText = hint;

    // Crear un nuevo elemento de audio y no reproducirlo automáticamente
    const helpAudio = document.getElementById("helpAudio");
    helpAudio.src = audioSrc;

    // Mostrar el modal de ayuda
    document.getElementById("helpModal").style.display = "flex";
}

// Función para cerrar el modal de ayuda
function closeHelp() {
    // Detener el audio al cerrar el modal
    const helpAudio = document.getElementById("helpAudio");
    helpAudio.pause();
    helpAudio.currentTime = 0;  // Resetear la posición del audio

    // Ocultar el modal de ayuda
    document.getElementById("helpModal").style.display = "none";
}

// Verificar la respuesta
function checkAnswer() {
    const inputs = document.querySelectorAll(".input-box");
    let userAnswer = "";

    inputs.forEach(input => {
        userAnswer += input.value.toUpperCase();
    });

    const correctAnswer = wordList[currentRound].word;
    const messageElement = document.getElementById("message");

    if (userAnswer === correctAnswer) {
        score += 100;
        messageElement.innerText = "¡Correcto! Has adivinado la palabra.";
        messageElement.classList.remove("incorrect");
        messageElement.classList.add("correct");
    } else {
        lives--;  // Restar una vida
        messageElement.innerText = `Incorrecto. Te quedan : ${lives} vidas`;
        messageElement.classList.remove("correct");
        messageElement.classList.add("incorrect");

        // Actualizar las vidas en pantalla
        updateLives();
    }

    // Mostrar el mensaje y las vidas restantes
    messageElement.style.display = "block";
    document.getElementById("score-container").innerText = `Puntaje: ${score}`;

    // Si no hay vidas restantes, termina el juego
    if (lives <= 0) {
        showGameOverModal();
    } else {
        // Pasar automáticamente a la siguiente ronda después de 2 segundos
        setTimeout(nextRound, 2000);
    }
}

// Función para actualizar los iconos de vidas
function updateLives() {
    const livesContainer = document.getElementById("lives-container");
    livesContainer.innerHTML = "";  // Limpiar los iconos de vida antes de agregarlos

    for (let i = 0; i < lives; i++) {
        const heart = document.createElement("i");
        heart.classList.add("fas", "fa-heart", "heart");
        livesContainer.appendChild(heart);
    }

    if (lives <= 0) {
        showGameOverModal();
    }
}

// Avanzar a la siguiente ronda o terminar el juego
function nextRound() {
    currentRound++;
    if (currentRound >= wordList.length) {
        showWinModal();
    } else {
        generateLetterBoxes();
        document.getElementById("game-image").src = wordList[currentRound].image;
        document.getElementById("message").style.display = "none";  // Ocultar el mensaje
        updateLives();  // Actualizar las vidas
    }
}

// Mostrar el modal de fin de juego
function showGameOverModal() {
    const finalScoreElement = document.getElementById("finalScore");
    finalScoreElement.innerText = `Tu puntaje fue: ${score}`;
    document.getElementById("gameOverModal").style.display = "flex";
}

// Mostrar el modal de fin de juego
function showWinModal() {
    const finalScoreElement = document.getElementById("finalScore");
    finalScoreElement.innerText = `Tu puntaje fue: ${score}`;
    document.getElementById("winModal").style.display = "flex";
}

// Reiniciar el juego
function restartGame() {
    currentRound = 0;
    score = 0;
    lives = 3;  // Reiniciar las vidas
    generateLetterBoxes();
    document.getElementById("game-image").src = wordList[currentRound].image;
    document.getElementById("gameOverModal").style.display = "none"; 
    document.getElementById("winModal").style.display = "none";  // Ocultar el modal de fin de juego
    document.getElementById("message").style.display = "none";  // Ocultar el mensaje
    updateLives();  // Reiniciar las vidas al valor inicial
    document.getElementById("score-container").innerText = `Puntaje: 0`; // Reiniciar puntaje
}

// Inicializar el juego
generateLetterBoxes();
updateLives();  // Mostrar las vidas iniciales
