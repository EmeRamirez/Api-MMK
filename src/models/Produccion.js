import { sequelize } from '../database/database.js';
import {DataTypes, Model} from 'sequelize';

import { Cliente } from './Cliente.js';
import { Item } from './Inventario.js';
import { Categoria } from './Categoria.js';
import { Proceso } from './Proceso.js';


export class Produccion extends Model{}

Produccion.init({

    id_produccion:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    fecha:{
        type: DataTypes.STRING(10),
        allowNull:false,
    }
},
{
    sequelize,
    tableName: 'producciones',
    name:{
        singular: 'produccion',
        plural: 'producciones'
    }
});

Cliente.hasMany(Produccion,{foreignKey:{name:'id_cliente',allowNull:true}});
Produccion.belongsTo(Cliente,{foreignKey:'id_cliente'});

Item.hasMany(Produccion,{foreignKey:{name:'id_item',allowNull:false}});
Produccion.belongsTo(Item,{foreignKey:'id_item'});

Proceso.hasMany(Produccion,{foreignKey:{name:'id_proceso',allowNull:false}});
Produccion.belongsTo(Proceso,{foreignKey:'id_proceso'});

Categoria.hasMany(Produccion,{foreignKey:{name:'id_categoria',allowNull:false}});
Produccion.belongsTo(Categoria,{foreignKey:'id_categoria'});
