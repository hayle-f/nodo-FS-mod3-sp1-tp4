Indice 3 - Trabajo Práctico 4: Implementación de un Servidor con Express y Arquitectura MVC 
En este trabajo práctico, implementaremos un servidor con Node.js y Express que seguirá la arquitectura 
Modelo-Vista-Controlador (MVC). El servidor se ejecutará en el puerto 3005 y escuchará diversas peticiones GET. 
Requerimientos del Trabajo:

1. Levantar un servidor Express en el puerto 3005. 
2. El servidor debe escuchar varias rutas GET: 
    。/superheroes/id/:id: Recibe un ID de superhéroe y devuelve los datos de ese superhéroe o un 
mensaje si no fue encontrado. 
    • /superheroes/atributo/:atributo/:valor: Recibe un atributo (por ejemplo, nombre o poder) y devuelve una lista de superhéroes que cumplen con ese criterio. 
    • /superheroes/edad/mayorA30: Devuelve una lista de superhéroes mayores de 30 años que además sean del planeta Tierra y tengan al menos 2 poderes. 

Estructura del Proyecto 
/project-root 
| -- /models 
|-- superheroe.mjs 
|--/controllers 
|-- superheroesController.mjs 
/services 
|-- superheroesService.mjs 
|-- /repository 
|-- superheroesRepository.mjs 
| 
|-- superheroesDataSource.mjs 
/views 
|-- responseView.mjs 
|-- server.mjs 
|- superheroes.txt 

1. Capa de Persistencia 
Abstracción de la Persistencia 
Este archivo define una abstracción que otras clases de persistencia deben implementar: 
// repository/superheroes DataSource.mjs 
export default class SuperheroesDataSource { 
    // Método abstracto para obtener todos los superhéroes 
    obtener Todos() { 
        throw new Error('Este método debe ser implementado por la subclase'); 
    } 
} 

Implementación de la Persistencia con Archivos 
Esta clase implementa el método obtenerTodos () que lee los datos desde superheroes.txt. 
//repository/superheroes Repository.mjs 
import fs from 'fs'; 
import path from 'path'; 
import { fileURLToPath} from 'url'; 
import Superheroes DataSource from './superheroesDataSource.mjs'; 
const __filename = fileURLToPath (import.meta.url); 
const __dirname = path.dirname(__filename); 
export default class SuperheroesFileRepository extends SuperheroesDataSource { 
    constructor() { 
        super(); 
        this.filePath = path.join(__dirname, '../superheroes.txt');
    } 
 
    obtener Todos() { 
        const data = fs.readFileSync(this. filePath, 'utf-8'); 
        return JSON.parse(data); // Convierte el archivo JSON en un array de objetos JS 
    } 
} 

2. Capa de Servicio 
La Capa de Servicio contiene la lógica de negocio para las diversas solicitudes. Interactúa con la capa de persistencia para obtener los datos. 

//services/superheroesService.mjs 
import SuperheroesRepository from '../repository/superheroes Repository.mjs'; 
const repository = new SuperheroesRepository(); 

export function obtenerSuperheroePorId(id) { 
    const superheroes = repository.obtenerTodos(); 
    return superheroes. find (hero => hero.id == id);
} 
 
export function buscarSuperheroesPorAtributo (atributo, valor) {
    const superheroes = repository.obtener Todos(); 
    return superheroes.filter (hero => 
        String(hero[atributo]).toLowerCase().includes(valor.toLowerCase())
    ); 
} 
 
export function obtenerSuperheroesMayoresDe30() { 
    const superheroes = repository.obtener Todos(); 
    return superheroes.filter(hero => 
        hero.edad 30 && hero.planetaOrigen === 'Tierra' && hero.poder.length >= 2 
    ); 
} 

3. Controlador 
 
El Controlador maneja las solicitudes HTTP y utiliza la capa de servicio para obtener los datos necesarios. 

// controllers/superheroesController.mjs 

import { obtenerSuperheroePorId, buscarSuperheroesPorAtributo, 
obtenerSuperheroesMayoresDe30 } from '../services/superheroesService.mjs'; 
import { renderizarSuperheroe, renderizarListaSuperheroes } 
from '../views/responseView.mjs'; 
export function obtenerSuperheroePorIdController (req, res) { 
    const {id} = req.params; 
    const superheroe = obtener SuperheroePorId(parseInt(id)); 
    
    if (superheroe) { 
        res.send(renderizar Superheroe (superheroe)); 
    } else { 
        res.status(404).send({ mensaje: "Superhéroe no encontrado" }); 
    } 
} 

export function buscarSuperheroesPorAtributoController (req, res) { 
    const { atributo, valor } = req.params;

    const superheroes = buscarSuperheroesPorAtributo(atributo, valor); 

    if (superheroes.length > 0) { 
        res.send(renderizarListaSuperheroes (superheroes)); 
    } else { 
        res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atributo" }); 
    } 
} 

export function obtenerSuperheroesMayoresDe30Controller(req, res) { 
    const superheroes = obtener Superheroes MayoresDe30(); 
    res.send(renderizarListaSuperheroes(superheroes)); 
} 


4. Vista 
La Vista es responsable de formatear los datos en un formato adecuado, en este caso, JSON. 
// views/responseView.mjs 
export function renderizar Superheroe (superheroe) { 
return JSON.stringify(superheroe, null, 2); 
} 
export function renderizarListaSuperheroes (superheroes) { 
} 
return JSON.stringify(superheroes, null, 2); 
5. Servidor Express 
El servidor Express se configura para escuchar en el puerto 3005 y manejar las solicitudes a las diversas 
rutas. 
// server.mjs 
import express from 'express'; 
import obtener Superheroe PorIdController, buscar Superheroes Por AtributoController, obteners from './controllers/superheroesController.mjs'; 

const app = express();
const PORT = 3005;

// Rutas 
 
app.get('/superheroes/id/:id', obtener SuperheroePorIdController); 
app.get('/superheroes/atributo/: atributo/:valor', buscar Superheroes Por AtributoController); app.get('/superheroes/edad/mayor A30', obtenerSuperheroesMayoresDe30Controller); 
// Levantar el servidor en el puerto 3005 
app.listen(PORT, () => { 
}); 
console.log(`Servidor corriendo en el puerto ${PORT}`); 