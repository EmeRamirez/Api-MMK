import {sequelize} from '../database/database.js';
import { Op, QueryTypes } from 'sequelize';

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
        await sequelize.sync({ alter: true }); // {force:true}   {force:false}   { alter: true }
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
            console.log(req.body);
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
            return res.status(500).json({ message: error.message });
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


//Actualizar la columna imglogo de la tabla CERVECERIAS
export const updImgCerveceria = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if (auth){
        try {    
            let id = req.params.id;
            let rutaimg = req.body.rutaimg; 
            const data = await Cerveceria.update({
                imglogo: rutaimg
            },{
                where: {id_cerveceria:id},
            });
            res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        };
    }else{
        console.log('Token inválido');
        res.status(500).json({estado:false,message:'Token inválido'});
    }
    
}


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
            const data = await sequelize.query(`SELECT est.descripcion, COUNT(est.id_estado) AS Conteo_estado FROM estados as est INNER JOIN inventario as i ON i.id_estado = est.id_estado INNER JOIN cervecerias as cer ON cer.id_cerveceria = i.id_cerveceria WHERE cer.id_cerveceria = ? GROUP BY est.descripcion , est.id_estado`,
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

//================================>>CLIENTES<<================================//
//Función para obtener la información la tabla Clientes vinculado a Cervecerias
export const getClientesbyID = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if (auth){
        try {
            console.log('verificado');
            let id = req.params.id;
            const data = await Cliente.findAll({
                raw:true,
                where: { id_cerveceria: id}
            });
            res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } else {
        console.log('Token inválido');
        res.status(500).json({message:'Token inválido'});
    }  
};


//Función para añadir un nuevo registro de Cliente
export const setClientebyID = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if (auth){
        try {
            console.log('verificado');
            const {nombre,direccion,comuna} = req.body;
            const id = req.params.id;
            console.log(req.body);
            console.log(req.params);

            const data = await Cliente.create({
                nombre_cliente: nombre,
                direccion_cliente: direccion,
                comuna_cliente: comuna,
                id_cerveceria: id
            });
            console.log('=====');
            console.log(data);
            res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } else {
        console.log('Token inválido');
        res.status(500).json({message:'Token inválido'});
    }  
};



//Elimina un cliente de la base de datos
export const delCliente = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if (auth){
        const id = (req.params.id);

        try {     
            let data = await Cliente.destroy({
                where:{ id_cliente: id }
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




//================================>>PRODUCCIONES<<================================//
//Función para obtener la información la tabla Producciones vinculado a Cerveceria
//Este query incluye la información de estado Proceso, Categoría, Cliente e Inventario
export const getProduccionesbyID = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if (auth){
        try {
            console.log('verificado');
            let id = req.params.id;
            const data = await Produccion.findAll({
                all:true,
                include: [
                    Proceso, 
                    Categoria, 
                    Cliente,
                    {
                    model: Item,
                    required: true,
                    where:{
                        id_cerveceria:id
                    }}
                ]
            });
            res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } else {
        console.log('Token inválido');
        res.status(500).json({message:'Token inválido'});
    }  
};

export const getProduccionesVigentesbyID = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if (auth){
        try {
            console.log('verificado');
            let id = req.params.id;
            const data = await Produccion.findAll({
                all:true,
                where:{
                    id_proceso: {
                        [Op.not]:5
                    }
                },
                include: [
                    Proceso, 
                    Categoria, 
                    Cliente,
                    {
                    model: Item,
                    required: true,
                    where:{
                        id_cerveceria:id
                    }}
                ]
            });
            console.log(data);
            res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } else {
        console.log('Token inválido');
        res.status(500).json({message:'Token inválido'});
    }  
};

//Actualiza un registro de la tabla producciones
export const updProducciones = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    if (auth){
        const id = (req.params.id);
        let {iditem,estado,categoria,cliente,obs} = req.body;

        try {     
            const data = await Produccion.update({
                id_item: iditem,
                id_categoria: categoria,
                id_cliente: cliente,
                id_proceso: estado,
                observacion: obs
            },
            {
                where: {id_produccion:id},
            }
            );

            if (estado == '5'){
                const upd = await Item.update({
                    id_estado:3
                },{
                    where: {id_item:iditem}
                }
                )
            };

            res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        };
    }else{
        console.log('Token inválido');
        res.status(500).json({estado:false,message:'Token inválido'});
    }
};


//Registrar una nueva producción y modificar el estado del item.
export const setNewProduccion = async(req,res) => {
    let auth = await verificarToken(req.headers.authorization);
    // let auth = true
    if (auth){
        try {
            console.log('verificado');
            let id = req.params.id;

            const data = await Produccion.create({
                id_cliente: req.body.idcte,
                id_item: id,
                id_proceso: req.body.idproc,
                id_categoria: req.body.idcat,
                observacion: req.body.obs,
            });
           

            const upd = await Item.update({
                    id_estado: 1
                },
                {
                    where: {id_item:id},
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


export const setPruebaGrt = async(req,res) => {
    try {
        let {nombre, apellido, email, cerveceria} = req.body;
        console.log(req.body);

        let arrCerv = await Cerveceria.findAll({
            raw:true,
            attributes:['nombre_cerveceria']
        });
        let index = arrCerv.map(e => e.nombre_cerveceria.toLowerCase()).indexOf(cerveceria.toLowerCase());
        
        if (index != -1){
            res.json({message:'Esta cervecería ya existe'});
        } else {
            
            const data = await Cerveceria.create({
                nombre_cerveceria: cerveceria,
                razonsocial: 'Cuenta Prueba',
                rut_empresa: 'Cuenta Prueba',
                direccion: 'Cuenta Prueba',
                comuna:'Cuenta Prueba'
            });
            let nvaCerv = data.toJSON();
            let cervID = nvaCerv.id_cerveceria;

            const data2 = await Usuario.create({
                nombre_usuario: nombre,
                apellido_usuario: apellido,
                password: '1234',
                email: email,
                id_cerveceria: cervID,
                id_rol:2
            })
            res.json(data2)
        };
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}