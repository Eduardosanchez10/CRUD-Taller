import { Router } from "express";
import { DocenteController } from "./controller";
import { DocenteService } from "../services/docente.service";

export class DocenteRoutes{
    static get routes(): Router{
        const routes= Router();
        const docenteService = new DocenteService();
        const controller = new DocenteController(docenteService);
        routes.get('/',controller.findAll);
        routes.get('/:id',controller.findOne);
        routes.post('/',controller.create);
        routes.delete('/:id',controller.delete);
        routes.put('/:id',controller.update);

        return routes;
    }
}