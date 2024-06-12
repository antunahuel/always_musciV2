// desarrollo Alway Music2 ojo rowmode

import pg from "pg";

const { Pool }=pg;


const pool = new Pool({
    user:'postgres',
    password:'123456',
    host:'localhost',
    port:5432,
    database:'db_always_music',
    idleTimeoutMillis: 500
});

//manejo de errores

const msgError = (codigo)=>{
    const error ={
        "42P01": "Se hace referencia a Tabla inexistente ⚠️ ",
        "23505": "El valor ingresado viola su caracter de unico ⚠️",
        "22P02": "El valor ingresado presenta caracter no válido, el valor ingresado debe ser integer⚠️",
        "42P18": "No se puede determinar parámetro ❓",
        "3D000": "Error, no exite las base de datos ⚠️"
    }
    let msg = error[codigo];
    console.log(msg || `Error database ${codigo}`);
}

// consultar estudiantes 

const getEstudent = async ()=>{
    try {
        const users = {
            text:'SELECT id, nombre, rut, curso, nivel FROM estudiantes',
            values:[],
            rowMode:'array',
        }
        
        let results = await pool.query(users);
        console.table(results.rows);
        console.log(results.rows[2]);

        console.log(results.rowCount);
    } catch (error) {
        msgError(error.code);
    }
}

getEstudent();

//agregar nuevo estudiante


const addStudent = async (student)=>{
    try {
        const newStudent = {
            text: 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING id, nombre, rut, curso, nivel ',
            values:[student.nombre, student.rut, student.curso, student.nivel],
        }
        let results = await pool.query(newStudent);
        console.log(results.rows);
    } catch (error) {
        msgError(error.code);
    }
};

// addStudent(estudianteNew);

const consultaRut = async (rut)=>{
    try {
        const consulta = {
            text:'SELECT nombre, rut, curso, nivel FROM estudiantes WHERE rut = $1',
            values: [rut],
        }
        let results  = await pool.query(consulta);
        console.log(results.rows[0]);
    } catch (error) {
        msgError(error.code);
    }
}

// consultaRut('70007770');

let changeStudent = {
    id: 7,
    nombre:'Adrian el de los dados Negros',
    rut: 99999990,
    curso: 'Cantante',
    nivel: 'Avanzado'
}

const updateStudent = async (estudiante)=>{
    try {
        let update = {
            text:'UPDATE estudiantes SET nombre=$1, curso=$3, nivel=$4 WHERE id=$5 RETURNING id, nombre, rut, curso, nivel',
            values:[estudiante.nombre, estudiante.rut, estudiante.curso, estudiante.nivel, estudiante.id],
        }

        let results = await pool.query(update);
        console.log(results.rows);
    } catch (error) {
        msgError(error.code);
    }
}

// updateStudent(changeStudent);

const deleteStudent =  async (id)=>{
    try {
        let deletUser = {
            text:'DELETE FROM estudiantes WHERE id=$1 RETURNING id, nombre, rut, curso, nivel',
            values:[id]
        }

        let results = await pool.query(deletUser);
        console.log(results.rows);

    } catch (error) {
        console.log(error);
    }
}

// deleteStudent(1);




