//Variables
const form = document.querySelector('#formulario');
const listTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners
eventListeners();
function eventListeners() {
    form.addEventListener('submit', addTweet);
}
//Functions
function addTweet(e) {
    e.preventDefault();

    //Text Area donde el user escribe
    const tweet = document.querySelector('#tweet').value;

    //validacion
    if (tweet == '') {
        showError('Fallo el proceso de la creación');
        return; // esto detiene las demas ejecuciones de código dentro de la function.
    }

    // añadir al arreglo de tweets
    const tweetObj = {
        id: Date.now(),
        tweet
    }

    tweets = [...tweets, tweetObj];

    //limpiar html
    limpiarHTML();
    // Crear html
    crearHTML();
    // Reiniciar el formulario
    form.reset();
}

//Mostrar mensaje de error
function showError(error) {
    const errorMessage = document.createElement('P');
    errorMessage.textContent = error;
    errorMessage.classList.add('error');

    //Insertar en el documento.
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(errorMessage);
    setTimeout(() => {
        errorMessage.remove();
    }, 3000)
}

// Muestra un listado de los tweets
function crearHTML() {
    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            // agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //añadir la funcion para eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            };
            // crear html
            const li = document.createElement('li');
            // añadir texto
            li.innerText = tweet.tweet.trim();
            //asignar boton
            li.appendChild(btnEliminar);
            // insertarlo en el html
            listTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}

// Agregar los tweets actuales al localStorage
function sincronizarStorage() {
    //Cuando el usuario agrega un nuevo tweet
    localStorage.setItem('tweets', JSON.stringify(tweets));

    // cuando el documento esta listo.
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
    })
}

// limpiar el html
function limpiarHTML() {
    while (listTweets.firstChild) {
        listTweets.removeChild(listTweets.firstChild);
    }
}

function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    limpiarHTML();
    crearHTML();
}