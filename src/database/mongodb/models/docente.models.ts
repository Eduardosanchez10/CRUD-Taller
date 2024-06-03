import mongoose from "mongoose";

const docenteSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'name is required'],
        },
        email:{
            type: String,
            unique: true,
            required: [true, 'email is required'],
        },
        gender:{
            type: String,
            required: [true, 'gender is required'],
        },
        address:{
            type: String,
            required: [true, 'address is required'],

        },
        profession:{
            type: String,
            required: [true, 'profession is required'],
            
        },

  

    });

export const DocenteModel = mongoose.model('Docente', docenteSchema);
