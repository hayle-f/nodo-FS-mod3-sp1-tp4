import { obtenerSuperheroePorId, obtenerSuperheroesMayoresDe30, buscarSuperheroesPorAtributo, obtenerTodosLosSuperheroes } from "../services/superheroesServices.mjs";
import { renderizarListaSuperheroes, renderizarSuperheroe } from "../views/responsiveView.mjs";

export function mostrarInicioController(req, res) {
    res.send('NodeJS - Sprint 1 - TP4');
}

export function obtenerTodosLosSuperheroesController(req, res) {
    const superheroes = obtenerTodosLosSuperheroes();

    res.send(renderizarListaSuperheroes(superheroes));
}

export function obtenerSuperheroePorIdController(req, res) {
    const { id } = req.params;
    const superheroe = obtenerSuperheroePorId(id);

    if(superheroe) {
        res.send(renderizarSuperheroe(superheroe));
    }else {
        res.status(404).send({mensaje: 'Superheroe no encontrado.'});
    }
}

export function buscarSuperheroesPorAtributoController(req, res) {
    const { atributo, valor } = req.params;
    const superheroes = buscarSuperheroesPorAtributo(atributo, valor);

    if(superheroes.length > 0) {
        res.send(renderizarListaSuperheroes(superheroes));
    }else {
        res.status(404).send({mensaje: 'No se encontraron superheroes con este atributo.'});
    }
}

export function obtenerSuperheroesMayoresDe30Controller(req, res) {
    const superheroes = obtenerSuperheroesMayoresDe30();
    
    res.send(renderizarListaSuperheroes(superheroes));    
}


