import { sequelize } from '../database/database.js';
import {DataTypes, Model} from 'sequelize';
import { Cerveceria } from './Cerveceria.js';

export class Cliente extends Model{}

Cliente.init({

    id_cliente:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    nombre_cliente:{
        type: DataTypes.STRING(45),
        allowNull:false,
    },
    direccion_cliente:{
        type: DataTypes.STRING(100),
        allowNull:false,
    },
    comuna_cliente:{
        type: DataTypes.STRING(30),
        allowNull:false,
    },
},
{
    sequelize,
    tableName: 'clientes',
    name:{
        singular: 'cliente',
        plural: 'clientes'
    }
});

Cerveceria.hasMany(Cliente,{foreignKey:{name:'id_cerveceria',allowNull:false}});
Cliente.belongsTo(Cerveceria,{foreignKey:'id_cerveceria'});