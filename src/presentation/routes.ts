import {Router} from "express";
import {DocenteRoutes} from "./docente/route"
export class AppRoute{

    static get routes(): Router{
        const routes = Router();
        
        routes.use('/api/docente', DocenteRoutes.routes );
        
        return routes;
    }
}