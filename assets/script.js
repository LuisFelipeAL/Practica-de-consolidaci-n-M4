//  FUNCION DICCIONARIO (LA API TIENE TODAS LAS COSAS COMPLETAS EN INGLES)
const diccionario = {
    "Catalyst": "Catalizador",
    "Claymore": "Mandoble",
    "Bow": "Arco",
    "Sword": "Espada Ligera",
    "Polearm": "Lanza"
};

function traducir(palabra) {
    return diccionario[palabra] || "Palabra no encontrada";
}

// SCRIPT PARA PERSONAJES -------------------------------------------------------------------------------------------------

//Obtener personajes de la api
const getCharacters = async () => {
    const respuesta = await fetch("https://genshin.jmp.blue/characters/all?lang=en");
    const respuestaJSON = await respuesta.json();
    return respuestaJSON;
};
// Contador Estrellas

const generarEstrellas = (rarity) => {
    let estrellasHTML = '';
    for (let i = 0; i < rarity; i++) {
        estrellasHTML += '<i class="bi bi-star-fill"></i>'; 
    }
    return estrellasHTML;
};

let personajesCargados = []; // Para almacenar personajes
let personajesMostrados = 0; 

const agregarPersonajeAleatorio = async () => {
     
    if (personajesCargados.length === 0) {
        personajesCargados = await getCharacters();
    }

    // Validación de 5 personajes mostrados
    if (personajesMostrados >= 5) {
        alert("Ya has agregado 5 personajes. Recarga la página para agregar más.");
        return;
    }

    
    const personajeAleatorio = personajesCargados[Math.floor(Math.random() * personajesCargados.length)];

    // Crea la carta de cada personaje
    const htmlPersonaje = `
        <div class="col">
            <div class="card">
                <img src="https://genshin.jmp.blue/characters/${personajeAleatorio.id}/icon-big" class="card-img-top" />
                <div class="card-body">
                    <h5 class="card-title mb-0">${personajeAleatorio.name}</h5>
                    <p>${personajeAleatorio.nation} - ${personajeAleatorio.vision}</p>
                    <h6>Arma</h6>
                    <p>${traducir(personajeAleatorio.weapon)}</p>
                    <h6>Rareza</h6>
                <p>${generarEstrellas(personajeAleatorio.rarity)}</p>
                </div>
            </div>
        </div>
    `;

    // Agrega el personaje al contenedor
    const contenedorPersonajes = document.getElementById("contenedorPersonajes");
    contenedorPersonajes.insertAdjacentHTML('beforeend', htmlPersonaje);


    personajesMostrados++;
};

// Click
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("personajes").addEventListener("click", agregarPersonajeAleatorio);
});

// SCRIPT PARA NACIONES ----------------------------------------------------------------------------------------------------

const getNations = async () => {
    const respuesta = await fetch("https://genshin.jmp.blue/nations/all");
    const respuestaJSON = await respuesta.json();
    return respuestaJSON;
};

let nacionesCargadas = [];
let indiceNacionActual = 0; 

const agregarNacion = async () => {
    
    if (nacionesCargadas.length === 0) {
        nacionesCargadas = await getNations();
    }

    
    if (indiceNacionActual >= nacionesCargadas.length) {
        alert("Ya se han mostrado todas las naciones.");
        return;
    }

    
    const nacionActual = nacionesCargadas[indiceNacionActual];

    
    const imagenUrl = `https://genshin.jmp.blue/nations/${nacionActual.id.toLowerCase()}/icon`; 

    
    const htmlNaciones = `
        <div class="col">
            <div class="card">
                <img src="${imagenUrl}" class="card-img-top" />
                <div class="card-body">
                    <h5 class="card-title mb-0">${nacionActual.name}</h5>
                    <p>${nacionActual.element}<br>
                    Arconte: ${nacionActual.archon}<br>
                    Entidad Controladora: ${nacionActual.controllingEntity}</p>
                </div>
            </div>
        </div>
    `;

    
    const contenedorNaciones = document.getElementById("contenedorNaciones");
    contenedorNaciones.insertAdjacentHTML('beforeend', htmlNaciones);

    
    indiceNacionActual++;
};


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("naciones").addEventListener("click", agregarNacion);
});

// SCRIPT PARA ARMAS ----------------------------------------------------------------------------------------------------

const getWeapon = async () => {
    const respuesta = await fetch("https://genshin.jmp.blue/weapons/all");
    const respuestaJSON = await respuesta.json();
    return respuestaJSON;
};

const generarEstrellas2 = (rarity) => {
    let estrellas2HTML = '';
    for (let i = 0; i < rarity; i++) {
        estrellas2HTML += '<i class="bi bi-star-fill"></i>'; 
    }
    return estrellas2HTML;
};

let armasCargadas = []; 
let armasMostradas = 0; 

const agregarArmaAleatorio = async () => {
    
    if (armasCargadas.length === 0) {
        armasCargadas = await getWeapon();
    }

    
    if (armasMostradas >= 5) {
        alert("Ya has agregado 5 Armas. Recarga la página para agregar más.");
        return;
    }

    
    const armaAleatoria = armasCargadas[Math.floor(Math.random() * armasCargadas.length)];


    const htmlArmas = `
        <div class="col">
            <div class="card">
                <img src="https://genshin.jmp.blue/weapons/${armaAleatoria.id}/icon" class="card-img-top"/>
                <div class="card-body">
                    <h5 class="card-title mb-0">${armaAleatoria.name}</h5>
                    <p>${traducir(armaAleatoria.type)}<br>
                    Ataque Base: ${armaAleatoria.baseAttack}<br>
                    Sub Stat Principal: ${armaAleatoria.subStat}</p>
                    <h6>Rareza</h6>
                <p>${generarEstrellas2(armaAleatoria.rarity)}</p>
                </div>
            </div>
        </div>
    `;

    
    const contenedorArmas = document.getElementById("contenedorArmas");
    contenedorArmas.insertAdjacentHTML('beforeend', htmlArmas);

    
    armasMostradas++;
};


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("armas").addEventListener("click", agregarArmaAleatorio);
});

