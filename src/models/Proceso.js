import { sequelize } from '../database/database.js';
import {DataTypes, Model} from 'sequelize';

export class Proceso extends Model{}

Proceso.init({

    id_proceso:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    descripcion:{
        type: DataTypes.STRING(45),
        allowNull:false,
    },
    
},
{
    sequelize,
    tableName: 'procesos',
    createdAt: false,
    updatedAt: false,
    name:{
        singular: 'proceso',
        plural: 'procesos'
    }
});