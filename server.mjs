import express from 'express';
import { obtenerSuperheroePorIdController, buscarSuperheroesPorAtributoController, obtenerSuperheroesMayoresDe30Controller } from './controllers/superheroesController.mjs';


//Realizar instancia de express y config el puerto de escucha 
const app = express();
const PORT = 3005;

//rutas
app.get('/superheroes/id/:id', obtenerSuperheroePorIdController);

app.get('/superheroes/atributo/:atributo/:valor', buscarSuperheroesPorAtributoController);

app.get('/superheroes/edad/matorA30', obtenerSuperheroesMayoresDe30Controller);


//Levantar servido en puerto 3005
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});