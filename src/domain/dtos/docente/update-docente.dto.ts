export class UpdateDocenteDto{
    constructor(
        public name: string,
        public email:string,
        public gender:string,
        public address:string,
        public profession: string){}
  
    static update(object:{[key:string]:any}):[string?, UpdateDocenteDto?]{
    const{name,email,gender,address,profession}=object;
        
        return [undefined, new UpdateDocenteDto(name,email,gender,address,profession)]
    }
  }