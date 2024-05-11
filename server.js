import express from 'express';
import { nuevoEstudiante, todosLosEstudiantes, consultaEstudiante, editarEstudiante, eliminarEstudiante } from './consultas.js';
const app = express();
console.clear();




// // Crear un Meddleware para recibir un JSON en el backend
 app.use(express.json())

// // INICIAMOS NUESTRAS RUTAS ASOCIADAS AL CRUD DE LA BASE DE DATOS
app.post('/estudiante', async (req,res) => {
    console.log( 'Salida del req.body de POST /estudiante', req.body )
    const response = await nuevoEstudiante(req.body)
    console.log('Salida de respuesta ---> ', response )
    res.status(200).send(response)
    // res.status(200).send('ok')
 })
//mejorar manejo de error agregando try catch


// // Ruta que obtiene todos los estudiantes ejecuta la función todosLosEstudiantes()
app.get('/estudiantes', async (req,res) => {
    const estudiantes  = await todosLosEstudiantes()
    res.status(200).send(estudiantes)
})


app.get('/estudiante/:rut', async(req,res) => {

    const numId = req.params.numId
    const { nombre, rut, curso, nivel } = req.body

    if( numId == id ){
        const response = await consultaEstudiante( { nombre, rut, curso, nivel} )
        res.status(200).send(response)
    }

})

app.put('/estudiante/:rut', async(req,res) => {

    const numId = req.params.numId
    const { nombre, rut, curso, nivel } = req.body

    if( numId == id ){
        const response = await editarEstudiante( { nombre, rut, curso, nivel} )
        res.status(200).send(response)
    }

})

app.delete('/estudiante/:rut', async(req,res) => {
    const rut = req.params.numId
    const response = await eliminarEstudiante(rut)    
    res.status(200).send(response)
})




app.listen(3000, () => console.log('Servidor UP port 3000'))