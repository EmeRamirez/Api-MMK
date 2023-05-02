import {Sequelize} from 'sequelize';
import jwt from 'jsonwebtoken';

import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER, JWT_KEY, PORT } from './config.js';


export const sequelize = new Sequelize (
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    { 
        host:DB_HOST, 
        port: PORT,  //Este campo se activa utilizar la base de datos de prueba servida en Railway.app
        dialect:'postgres'
    }
);

export async function nuevoToken(usuario, exptimeMin){
    return jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * exptimeMin),
                user: usuario,
            }, 
            JWT_KEY
            );
};

export async function verificarToken(token){
    try{
        const verif = jwt.verify(token, process.env.JWT_KEY);
        return verif;
    } catch {
        return null;
    }   
};
