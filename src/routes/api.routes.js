import { Router } from "express";
import * as fn from '../controllers/api.controller.js'
import {nuevoToken, verificarToken} from '../database/database.js';
import { syncTables } from "../controllers/api.controller.js";


const router = Router();

router.get('/auth/:user', async(req,res) => {
    console.log(req.params);
    const usuario = req.params.user;
    const data = await nuevoToken(usuario, 10);
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

router.get('/inventario/:id', fn.getInventariobyID);

router.get('/inventario/conteo/:id', fn.contarEstados);

router.post('/inventario/:id', fn.setInventariobyID);

router.delete('/inventario/del/:id', fn.delItem);

router.get('/usuarios', fn.getUsuarios);

router.post('/usuarios', fn.setUsuario);

router.delete('/usuario/del/:id', fn.delUsuario);

router.get('/cervecerias', fn.getCervecerias);

router.post('/cervecerias', fn.setCerveceria);

router.post('/cervecerias/updimg/:id', fn.updImgCerveceria);

router.delete('/cerveceria/del/:id', fn.delCerveceria);

router.get('/categorias/:id', fn.getCategoriasbyID);

router.post('/categorias/:id', fn.setCategoriabyID);

router.delete('/categoria/del/:id', fn.delCategoria);

router.put('/inventario/:id', fn.updInventario);

router.get('/clientes/:id', fn.getClientesbyID);

router.post('/clientes/:id', fn.setClientebyID);

router.delete('/clientes/del/:id', fn.delCliente);

router.get('/produccion/:id', fn.getProduccionesVigentesbyID);

router.get('/produccion/historial/:id', fn.getProduccionesbyID);

router.put('/produccion/:id', fn.updProducciones);

router.post('/produccion/:id', fn.setNewProduccion);





export default router;
