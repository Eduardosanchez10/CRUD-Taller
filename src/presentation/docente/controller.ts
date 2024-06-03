import { Validators } from './../../config/validator';
import { Request, Response } from "express";
import { CreateDocenteDto } from "../../domain/dtos/docente/create-docente.dto";
import { DocenteService } from "../services/docente.service";
import { UpdateDocenteDto } from "../../domain/dtos/docente/update-docente.dto";
import { PaginationDto } from "../../domain/dtos/docente/paginationdto";

export class DocenteController {
  constructor(private readonly docenteService: DocenteService) {}
  create = (req: Request, res: Response) => {
    const [error, createDocente] = CreateDocenteDto.create(req.body);
    if (error) return res.status(400).json({ error });
    this.docenteService.create(createDocente!)
    .then(docente => res.json(docente))
    .catch(error => res.status(500).json(error));
  };

  update = (req:Request, res:Response) => {
    const id = req.params.id
    const [error, updateDocenteDto] = UpdateDocenteDto.update(req.body)
    if(error) return res.status(400).json({error})
    this.docenteService.update(updateDocenteDto!, id!)
    .then(docente => res.json(docente))
    .catch(error => res.status(500).json(error))
}

delete = (req:Request, res:Response) => {
  const id = req.params.id
  if(!Validators.validationMongoId(id)) throw Error('mongo id is not valid')
  this.docenteService.delete(id!)
  .then(docente => res.json(docente))
  .catch(error => res.status(500).json(error))
}


  findAll = (req: Request, res: Response) => {
    const [error, paginationDto]=  PaginationDto.paginate(req.query);
    if(error) return res.status(400).json({error})
    this.docenteService.findAll(paginationDto!)
    .then(docente=> res.json(docente))
    .catch(error=> res.status(500).json)
  };

  findOne = (req: Request, res: Response) => {
  const id = req.params.id
    this.docenteService.findOne(id!)
    .then(docente => res.json(docente))
    .catch(error => res.status(500).json(error))  
  };
}
