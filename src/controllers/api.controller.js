import {sequelize} from '../database/database.js';

import { Categoria } from '../models/Categoria.js';
import { Cerveceria } from '../models/Cerveceria.js';
import { Cliente } from '../models/Cliente.js';
import { Estado } from '../models/Estado.js';
import { Item } from '../models/Inventario.js';
import { Proceso } from '../models/Proceso.js';
import { Produccion } from '../models/Produccion.js';
import { Rol } from '../models/Rol.js';
import { Usuario } from '../models/Usuario.js';
import {verificarToken} from '../database/database.js';



//Función para sincronizar las tablas
export async function syncTables(){
    try {
        await sequelize.sync({force:true}); // {force:true}   {force:false}
        console.log('Las tablas fueron sincronizadas exitosamente.');
        return true;
    } catch (error) {
        console.error('Error al sincronizar tablas:', error);
        return null;
    }
};

//Obtener el registro de todos los usuarios creados.
export const getUsuarios = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if (auth){
        try {
            console.log('verificado');
            const data = await Usuario.findAll();
            res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } else {
        console.log('Token inválido');
        res.status(500).json({estado:false,message:'Token inválido'});
    }
    
};

//Obtener el registro de todas las cervecerias creadas.
export const getCervecerias = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if(auth){
        try {
            console.log('verificado');
            const data = await Cerveceria.findAll();
            res.json(data);
        } catch (error){
            console.log('Token inválido');
            res.status(500).json({estado:false,message:'Token inválido'});
        }
    } else {
        console.log('Token inválido');
        res.status(500).json({estado:false,message:'Token inválido'});
    };
};

export const setUsuario = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if(auth){
        console.log(req.body);
        try {
            const newuser = await Usuario.create({
                nombre_usuario: req.body.name,
                apellido_usuario: req.body.lastname,
                password: req.body.password,
                email: req.body.email,
                id_cerveceria: req.body.cervus,
                id_rol:req.body.rolus
            });
            res.json(newuser);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } else {
        console.log('Token inválido');
        res.status(500).json({estado:false,message:'Token inválido'});
    }
};

export const setCerveceria = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    console.log(auth);
    if (auth){
        console.log(req.body);
        try {
            const newcerv = await Cerveceria.create({
                nombre_cerveceria: req.body.nombre_cerv,
                razonsocial: req.body.razons,
                rut_empresa: req.body.rutcerv,
                direccion: req.body.direcc,
                comuna:req.body.comna
            });
            res.json(newcerv);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }else{
        console.log('Token inválido');
        res.status(500).json({estado:false,message:'Token inválido'}); 
    }
};


//Elimina una cerveceria de la base de datos
export const delCerveceria = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    console.log(auth);
    if (auth){
        const id = (req.params.id);

        try {     
            let data = await Cerveceria.destroy({
                where:{ id_cerveceria: id }
            });
            res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        };
    }else{
        console.log('Token inválido');
        res.status(500).json({estado:false,message:'Token inválido'});
    }
};

//Elimina un usuario de la base de datos
export const delUsuario = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    console.log(auth);
    if (auth){
        const id = (req.params.id);

        try {     
            let data = await Usuario.destroy({
                where:{ id_usuario: id }
            });
            res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        };
    }else{
        console.log('Token inválido');
        res.status(500).json({estado:false,message:'Token inválido'});
    }
};

