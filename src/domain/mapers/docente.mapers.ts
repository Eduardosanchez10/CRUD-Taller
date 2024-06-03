
import { DocenteEntity } from "../entities/docente.entity";
import { CustomError } from "../errors/custom.error";
export class DocenteMaper{
static fromEntity(object:{[key:string]:any}):DocenteEntity{

    const{ id, _id, name, email, gender,address,profession } = object;
    
    if ( !id.toString() || !_id.toString()) throw CustomError.badRequest("missing id");
    if (!name) throw CustomError.badRequest("missing name");
    if (!email) throw CustomError.badRequest("missing email");
    if (!gender) throw CustomError.badRequest("missing gender");
    if (!address) throw CustomError.badRequest("missing address");
    if (!profession) throw CustomError.badRequest("missing profession");

    
    return new DocenteEntity(id || _id, name, email, gender,address,profession);
}

}