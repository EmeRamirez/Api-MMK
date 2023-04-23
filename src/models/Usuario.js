import { sequelize } from '../database/database.js';
import {DataTypes, Model} from 'sequelize';

import { Cerveceria } from './Cerveceria.js';
import { Rol } from './Rol.js';

export class Usuario extends Model{}

Usuario.init({

    id_usuario:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    nombre_usuario:{
        type: DataTypes.STRING(45),
        allowNull:false,
    },
    apellido_usuario:{
        type: DataTypes.STRING(45),
        allowNull:false,
    },
    password:{
        type: DataTypes.STRING(45),
        allowNull:false,
    },
    email:{
        type: DataTypes.STRING(45),
        allowNull:false,
    },
},
{
    sequelize,
    tableName: 'usuarios',
    name:{
        singular: 'usuario',
        plural: 'usuarios'
    }
});

Cerveceria.hasMany(Usuario,{foreignKey:{name:'id_cerveceria',allowNull:false}});
Usuario.belongsTo(Cerveceria,{foreignKey:'id_cerveceria'});

Rol.hasMany(Usuario,{foreignKey:{name:'id_rol',allowNull:false}});
Usuario.belongsTo(Rol,{foreignKey:'id_rol'});