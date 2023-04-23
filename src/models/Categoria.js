import { sequelize } from '../database/database.js';
import {DataTypes, Model} from 'sequelize';

import { Cerveceria } from './Cerveceria.js';

export class Categoria extends Model{}

Categoria.init({

    id_categoria:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    descripcion:{
        type: DataTypes.STRING(45),
        allowNull:false,
    }
},
{
    sequelize,
    tableName: 'categorias',
    name:{
        singular: 'categoria',
        plural: 'categorias'
    }
});


Cerveceria.hasMany(Categoria,{foreignKey:{name:'id_cerveceria',allowNull:false}});
Categoria.belongsTo(Cerveceria,{foreignKey:'id_cerveceria'});