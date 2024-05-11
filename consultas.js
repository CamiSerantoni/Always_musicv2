import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config()

const password = process.env.PASSWORD
console.log('password ------[[##3####]]', password)


const pool = new Pool({
    user:'postgres',
    host: 'localhost',
    password:password,
    database:'Always_music',
    port:5432
})





// 1. Hacer todas las consultas con un JSON como argumento del método query.
// (2 Puntos)
// 2. Hacer las consultas con texto parametrizado.
// (3 Puntos)
// 3. Capturar los posibles errores en todas las consultas e imprimirlos por consola.
// (3 Puntos)
// 4. Obtener el registro de los estudiantes registrados en formato de arreglos.
// (3 Puntos)




// Vamos a crear las distintas conexiones a la DB , relacionadas con el denominado CRUD

// Obtener todas los estudiantes Función asociada a la ruta /estudiantes  con el método HTTP GET en el server 
export const todosLosEstudiantes = async () => {
    let client
    try {
        client = await pool.connect(); // Intenta obtener una conexión pool
        const resultado = await client.query('SELECT * FROM estudiantes ORDER BY id DESC')
        return resultado.rows
    } catch (error) {
        return console.error('Error durante la conexión o la consulta:', error.stack, error.message, error.code);
    }finally{
        if(client){
            client.release() // Nos aseguramos que el cliente se libere siempre
        }
    }
}

// consulta de estudiante por rut
export const consultaEstudiante = async (rut) => {
    let client
    try {
        client = await pool.connect(); // Intenta obtener una conexión pool
        const resultado = await client.query(`SELECT * FROM estudiantes WHERE rut=${rut} RETURNING *`)
        return resultado.rows
    } catch (error) {
        return console.error('Error durante la conexión o la consulta:', error.stack);
    }finally{
        if(client){
            client.release() // Nos aseguramos que el cliente se libere siempre
        }
    }
}



// Nuevo estudiante ruta    POST /estudiante
export const nuevoEstudiante = async ( estudiante ) => {
    
    console.log('nuevoEstudiante--> ' , estudiante )

    let client
    const values = Object.values(estudiante)
    const consulta = {
        text:"INSERT INTO estudiantes ( nombre, rut, curso, nivel) VALUES( $1, $2, $3, $4) RETURNING *;",
        values 
    }

    try {
        client = await pool.connect();
        const result  = await client.query(consulta)
        return result.rows
    } catch (error) {
        return console.error('Error durante la conexión o la consulta:', error.stack);
    }finally{
        if(client){
            client.release() 
        }
    }
}

// PUT
export const editarEstudiante = async (estudiante) => {
    console.log('Salida de estudiante -->', estudiante )
    let client
    const values = Object.values( estudiante )
    const consulta = {
        text:"UPDATE estudiantes SET nombre = $1, rut = $2, curso = $3, nivel = $4 WHERE id = $1 RETURNING *",
        values 
    }

    try {
        client = await pool.connect(); // Intenta obtener una conexión pool
        const result  = await client.query(consulta)
        return result.rows
    } catch (error) {
        return console.error('Error durante la conexión o la consulta:', error.stack);
    }finally{
        if(client){
            client.release() // Nos aseguramos que el cliente se libere siempre
        }
    }
}

// DELETE 
export const eliminarEstudiante= async( rut ) => {
    let client
    try {
        client = await pool.connect(); // Intenta obtener una conexión pool
        const resultado = await client.query(`DELETE FROM estudiantes WHERE rut=${rut} RETURNING *`)
        return resultado.rows
    } catch (error) {
        return console.error('Error durante la conexión o la consulta:', error.stack);
    }finally{
        if(client){
            client.release() 
        }
    }
}