import { sequelize } from '../database/database.js';
import {DataTypes, Model} from 'sequelize';

export class Item extends Model{}

import { Cerveceria } from './Cerveceria.js';
import { Estado } from './Estado.js';

Item.init({
    id_item:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    qr_code:{
        type: DataTypes.STRING(45),
        allowNull:false,
    },
    tipo:{
        type: DataTypes.STRING(45),
        allowNull:false,
    },
    capacidad:{
        type: DataTypes.STRING(45),
        allowNull:true,
    },
    observacion:{
        type: DataTypes.STRING(200),
        allowNull:true,
    }
},
{
    sequelize,
    tableName: 'inventario',
    name:{
        singular: 'item',
        plural: 'items'
    }
});

Cerveceria.hasMany(Item,{foreignKey:{name:'id_cerveceria',allowNull:false}});
Item.belongsTo(Cerveceria,{foreignKey:'id_cerveceria'});

Estado.hasMany(Item,{foreignKey:{name:'id_estado',allowNull:false}});
Item.belongsTo(Estado,{foreignKey:'id_estado'});