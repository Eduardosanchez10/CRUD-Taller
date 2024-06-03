import { promises } from "dns";
import { DocenteModel } from "../../database/mongodb/models/docente.models";
import { DocenteMaper } from "../../domain/mapers/docente.mapers";
import { UpdateDocenteDto } from "../../domain/dtos/docente/update-docente.dto";
import {PaginationDto} from "../../domain/dtos/docente/paginationdto"
import { DocenteEntity } from "../../domain/entities/docente.entity";
import { CreateDocenteDto } from "../../domain/dtos/docente/create-docente.dto";

interface FindAllDocentes{
  offset:number, 
  limit:number, 
  page:number, 
  total:number, 
  docentes:DocenteEntity[],
}

export class DocenteService {
  async create(createDocenteDto: CreateDocenteDto): Promise<DocenteEntity> {
    const {name}= createDocenteDto;
    try {
      const exist = await DocenteModel.findOne({ name });
      if (exist) throw Error("error");
      const docente = await DocenteModel.create(createDocenteDto);
      if (!docente) throw Error("error");
      await docente.save();
      return DocenteMaper.fromEntity(docente);
    } catch (error) {
        throw error;
    }
}

async update(updateDocenteDto:UpdateDocenteDto, id:string):Promise<DocenteEntity>{
  try {
      const docente = await DocenteModel.findByIdAndUpdate(id,{...updateDocenteDto});
      if(!docente) throw Error('Error')
      await docente.save();
      return DocenteMaper.fromEntity(docente);

  } catch (error) {
      throw error; 
  }
}

 
async delete(id:string):Promise<DocenteEntity>{
  try {
      const docente = await DocenteModel.findOneAndDelete({_id:id});
      if(!docente) throw Error('Error')
      return DocenteMaper.fromEntity(docente);

  } catch (error) {
      throw error; 
  }
}
async findOne(id:string):Promise<DocenteEntity>{
  try {
      const docente = await DocenteModel.findOne({_id:id});
      if(!docente) throw Error('Error')
      return DocenteMaper.fromEntity(docente);

  } catch (error) {
      throw error; 
  }
}
  async findAll(paginationDto:PaginationDto):Promise<FindAllDocentes> {
    const { offset, limit } = paginationDto
    try{

      const docente = await DocenteModel.find({})
      .skip(offset)
      .limit(limit)
      const total = await DocenteModel.find({}).countDocuments();

        
      const mappDocente = docente.map(DocenteMaper.fromEntity);
      
      return {
        offset,
        limit,
        page: offset / limit + 1,
        total,
        docentes: mappDocente
      };

    }catch(error){
      throw error;
    }
    }
  }

