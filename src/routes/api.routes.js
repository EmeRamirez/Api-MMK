import { Router } from "express";
import * as fn from '../controllers/api.controller.js'
import {nuevoToken, verificarToken} from '../database/database.js';
import { syncTables } from "../controllers/api.controller.js";


const router = Router();

router.get('/auth/:user', async(req,res) => {
    console.log(req.params);
    const usuario = req.params.user;
    console.log(usuario);
    const data = await nuevoToken(usuario, 1);
    return res.json(data);
});

router.get('/verauth/:token', async(req,res) => {
    console.log(req.params.token);
    const data = await verificarToken(req.params.token);
    res.json(data);
})

router.get('/sincronizar', async(req,res) => {
    let sync = await syncTables();
    if (sync) {
        res.json({message:"Tablas sincronizadas"})
    } else {
        res.json({message:"Error al sincronizar tablas"})
    }
});

router.get('/usuarios', fn.getUsuarios);

// router.post('/usuarios', fn.crearUsuario);

router.post('/usuarios', (req,res) => {
    console.log(req.body);
    res.json('funca')
});

router.get('/cervecerias', fn.getCervecerias);

router.post('/cervecerias', fn.setCerveceria);


router.put('/usuario/:id');

router.delete('/cerveceria/del/:id', fn.delCerveceria);

router.delete('/usuario/del/:id', fn.delUsuario);



export default router;
