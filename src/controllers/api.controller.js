import {sequelize} from '../database/database.js';
import { QueryTypes } from 'sequelize';

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
export async function syncTables(opt){
    try {
        await sequelize.sync({force:opt}); // {force:true}   {force:false}
        console.log('Las tablas fueron sincronizadas exitosamente.');
        return true;
    } catch (error) {
        console.error('Error al sincronizar tablas:', error);
        return null;
    }
};

//================================>>USUARIOS<<================================//

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

//Crear un nuevo Usuario
export const setUsuario = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if(auth){
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

//Elimina un usuario de la base de datos
export const delUsuario = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
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


//================================>>CERVECERIAS<<================================//

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


//Registra una nueva cervecería en la base de datos
export const setCerveceria = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if (auth){
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


//================================>>CATEGORIAS<<================================//

//Obtener el registro de todas las categorías de una respectiva cervecería(id).
export const getCategoriasbyID = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if (auth){
        try {
            console.log('verificado');
            let id = req.params.id;
            const data = await sequelize.query(`SELECT cat.id_categoria, cat.descripcion, cer.nombre_cerveceria FROM categorias cat INNER JOIN cervecerias cer ON cer.id_cerveceria = cat.id_cerveceria WHERE cer.id_cerveceria = ? ORDER BY cat.descripcion ASC`,
            {
                replacements:[id],
                type: QueryTypes.SELECT
            });
            res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } else {
        console.log('Token inválido');
        res.status(500).json({estado:false,message:'Token inválido'});
    }
    
};


//Registrar una nueva categoría de una respectiva cervecería(id).
export const setCategoriabyID = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if (auth){
        try {
            console.log('verificado');
            let id = req.params.id;
            let descr = req.body.desc;
            const data = await Categoria.create({
                descripcion: descr,
                id_cerveceria: id   
            });
            res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } else {
        console.log('Token inválido');
        res.status(500).json({estado:false,message:'Token inválido'});
    }   
};


//Elimina una categoria de la base de datos
export const delCategoria = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if (auth){
        const id = (req.params.id);

        try {     
            let data = await Categoria.destroy({
                where:{ id_categoria: id }
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


//================================>>INVENTARIO<<================================//

//Obtener el registro de todo el inventario de una respectiva cervecería(id)
export const getInventariobyID = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if (auth){
        try {
            let id = req.params.id;
            const data = await Item.findAll({
                where:{
                    id_cerveceria:id
                },
                include: [{
                    model:Estado,
                    attributes:['descripcion']
                }]
            });
            
            res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } else {
        console.log('Token inválido');
        res.status(500).json({estado:false,message:'Token inválido'});
    }   
};

//Registrar un nuevo item (Inventario) a una respectiva cervecería(id).
export const setInventariobyID = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if (auth){
        try {
            console.log('verificado');
            let id = req.params.id;

            const data1 = await Item.create({
                qr_code: req.body.codname,
                tipo: req.body.tipo,
                capacidad: req.body.capacidad,
                observacion: req.body.obs,
                id_estado: req.body.estado,
                id_cerveceria: req.body.idcerv
            });
            let newData = data1.toJSON();
            let newID = newData.id_item

            const data = await Item.update({
                    qr_code: req.body.codname+'0'+newID,
                },
                {
                    where: {id_item:newID},
                }
            );
            res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } else {
        console.log('Token inválido');
        res.status(500).json({message:'Token inválido'});
    }  
};

//Elimina un item de la tabla inventarios de la base de datos
export const delItem = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if (auth){
        const id = (req.params.id);

        try {     
            let data = await Item.destroy({
                where:{ id_item: id }
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

//Actualiza un item de la tabla inventarios
export const updInventario = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if (auth){
        const id = (req.params.id);
        let {estado,tipo,capacidad,obs} = req.body;

        try {     
            const data = await Item.update({
                tipo: tipo,
                capacidad: capacidad,
                observacion: obs,
                id_estado: estado
            },
            {
                where: {id_item:id},
            }
            );
            res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        };
    }else{
        console.log('Token inválido');
        res.status(500).json({estado:false,message:'Token inválido'});
    }
};


//Traer todos los items incluyendo todo como objetos anidados
// const dat = await Item.findAll({
//     where:{
//         id_cerveceria:5
//     },
//     include: 
//         [{all:true}]
    
// });

// let d = JSON.stringify(dat);
// let data = JSON.parse(d)
// console.log(data);


//Funcion para contar los estados de la lista de items de determinada cervecería. GROUP BY
export const contarEstados = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if (auth){
        let id = req.params.id;
        try {
            const data = await sequelize.query(`SELECT est.descripcion, COUNT(est.id_estado) AS Conteo_estado FROM estados as est INNER JOIN inventario as i ON i.id_estado = est.id_estado INNER JOIN cervecerias as cer ON cer.id_cerveceria = i.id_cerveceria WHERE cer.id_cerveceria = ? GROUP BY est.descripcion`,
            {
                replacements:[id],
                type: QueryTypes.SELECT
   
            });
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }else{
        console.log('Token inválido');
        res.status(500).json({estado:false,message:'Token inválido'});
    }
};

