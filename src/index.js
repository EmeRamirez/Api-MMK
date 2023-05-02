import express from 'express';
import { sequelize } from './database/database.js';
import morgan from 'morgan';
import indexRoutes from './routes/api.routes.js';
import { PORT } from './database/config.js';

const app = express();


//middlewares
app.use(express.json());
app.use(morgan("combined"));//dev

app.use('/mmkapi',indexRoutes);

async function chkConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexion con BD establecida correctamente');
        app.listen(PORT, ()=>{
            console.log('Server levantado en puerto',PORT);
        });
    } catch (error) {
        console.error('No se pudo conectar a la base de datos')
    }
};

chkConnection();









