import express from 'express';
import { nuevoEstudiante, todosLosEstudiantes, consultaEstudiante, editarEstudiante, eliminarEstudiante } from './consultas.js';
const app = express();
console.clear();

app.use(express.json())

app.post('/estudiante', async (req,res) => {
    try {
        console.log( 'Salida del req.body de POST /estudiante', req.body )
        const response = await nuevoEstudiante(req.body)
        console.log('Salida de respuesta ---> ', response )
        res.status(200).send(response)
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al crear el estudiante');
    }
})

app.get('/estudiantes', async (req,res) => {
    try {
        const estudiantes  = await todosLosEstudiantes()
        res.status(200).send(estudiantes)
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al obtener los estudiantes');
    }
})

app.get('/estudiante/:rut', async(req,res) => {
    try {
        const rut = req.params.rut

        const response = await consultaEstudiante(rut)
        if(response.length > 0) {
            res.status(200).send(response)
        } else {
            res.status(404).send('Estudiante no encontrado')
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al consultar el estudiante');
    }
})

app.put('/estudiante/:rut', async(req,res) => {
    try {
        const rut = req.params.rut
        const { nombre, curso, nivel } = req.body

        const response = await editarEstudiante( { nombre, rut, curso, nivel} )
        res.status(200).send(response)
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al editar el estudiante');
    }
})

app.delete('/estudiante/:rut', async(req,res) => {
    try {
        const rut = req.params.rut
        const response = await eliminarEstudiante(rut)    
        res.status(200).send(response)
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al eliminar el estudiante');
    }
})

app.listen(3000, () => console.log('Servidor UP port 3000'))