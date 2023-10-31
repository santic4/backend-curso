import express from "express";
import { ProductManager } from './ProductManager.js';
import { productosJson, PORT } from "./config.js"

const pm = new ProductManager(productosJson)
const app = express()

//Indico que es el metodo GET que quiero utilizar
app.get('/productos', async (req,res) =>{ //Le paso un callbackt
    const limit = parseInt(String(req.query.limit))
    try{
        const productos = await pm.getProductsJSON(limit)
        console.log(productos)
        res.json(productos)
    }catch(error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})

app.get('/productos/:id', async (req, res) => {
    const id = req.params.id
    try{
        const product = await pm.getProductByIdJSON(id)
        res.json(product)
    }
    catch (error){
        res.json({
            status: "error",
            message: error.message
        })
    }
})

//Conecto a un puerto cualquiera 
app.listen(PORT,() =>{
    console.log(`Conectado al puerto ${PORT}`)
})