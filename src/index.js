import express from 'express';
import { sequelize } from './database/database.js';
import morgan from 'morgan';
import indexRoutes from './routes/api.routes.js';
import { nuevoEstado, nuevoProceso, nuevoRol, nuevaCerveceria, nuevoUsuario } from './controllers/ormHandlers.js';
import { syncTables } from './controllers/api.controller.js';
import { PORT } from './database/config.js';

const app = express();


//middlewares
app.use(express.json());
app.use(morgan("combined"));//dev

app.use('/mmkapi',indexRoutes);

async function chkConnection() {
    try {
//         await sequelize.authenticate();
//         console.log('Connexion establecida correctamente');
        app.listen(PORT, ()=>{
            console.log('Server levantado en puerto',PORT);
        });
    } catch (error) {
        console.error('No se pudo conectar a la base de datos')
    }
};

chkConnection();

console.log(process.argv);


if (process.argv[2] == 'sincronizar'){
    const sync = await syncTables();

} else if (process.argv[2] == 'insertarDatos'){
    await syncTables();

    await nuevoEstado('En Uso');
    await nuevoEstado('Limpio');
    await nuevoEstado('Sucio');
    await nuevoEstado('Fuera de Servicio');

    await nuevoProceso('Entregado');
    await nuevoProceso('Reservado');
    await nuevoProceso('Listo');
    await nuevoProceso('Devuelto');

    await nuevoRol('master');
    await nuevoRol('admin');
    await nuevoRol('user');

    await nuevaCerveceria('Meet My Keg','MMK','1','1','1');

    await nuevoUsuario('Eme','RS','eme123','emerson.ramirez.s@gmail.com',1,1);

    process.exit();
};



