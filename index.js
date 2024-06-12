import pg from "pg";
import chalk from 'chalk';

const {Pool} = pg;

const pool =  new Pool({
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'db_always_music',
});

const addEstudent = async (estudiante)=>{
    try {
        const newEstudent = {
            text: 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING id, nombre, rut, curso, nivel',
            values: [estudiante.nombre, estudiante.rut, estudiante.curso, estudiante.nivel],
        }
        let results = await pool.query(newEstudent);
        let estudianteAdd = results.rows[0];
        console.log(chalk.magenta('**************************'+'ESTUIANTE NUEVO'+chalk.magenta('***************************')));
        console.log(estudianteAdd);
        console.log(chalk.magenta('*******************************************************************************************'));
    } catch (error) {
        console.log(error);
        console.log('Error al intentar registrar nuevo estudiantes')
    }
 
};

let studentAdd = {
    nombre: 'Phill Collins',
    rut: 129998885,
    curso: 'drums🥁',
    nivel: 'Principinate'
}

const getStudent = async () =>{
    try {
        let results = await pool.query('SELECT * FROM estudiantes');
        let estudiantes = results.rows;
        console.log(chalk.red('------------------------------')+'👩‍🎓ESTUDIANTES👨‍🎓'+chalk.red('------------------------------'));
        console.table(estudiantes);
        console.log(chalk.magenta('--------------------------------')+'🎼'+chalk.magenta('-------------------------------------------'));
    } catch (error) {
        console.log(chalk.bgRed('Error al consultar listado de estudiantes'));
    }
}


const getRut = async (rut) =>{
    try {
        let consultaRut = {
            text: 'SELECT nombre, rut, curso, nivel FROM estudiantes WHERE rut = $1',
            values:[rut]
        }

        let results = await pool.query(consultaRut);
        let satudent = results.rows[0];
        console.log(chalk.magenta('**************************'+'ESTUDIANTE BUSCADO POR RUT'+chalk.magenta('***************************')));
        console.log(satudent);
        console.log(chalk.magenta('*******************************************************************************************'));
    } catch (error) {
        console.log('Error al consultar estudiante por número de rut')
    }
}


const updateStudent = async (student)=>{
    try {
        let changeStudent = {
            text:'UPDATE estudiantes SET nombre=$1, rut=$2, curso=$3, nivel=$4 WHERE id=$5 RETURNING id, nombre, rut, curso, nivel',
            values:[student.nombre, student.rut, student.curso, student.nivel, student.id],
        }
        let results = await pool.query(changeStudent);
        let estudiante = results.rows[0];
        console.log(chalk.magenta('**************************'+'🎸🎸🎸cambios de datos esudiantes'+chalk.magenta('***************************')));
        console.log(estudiante);
        console.log(chalk.magenta('*******************************************************************************************'));
    } catch (error) {
        console.log(error);
    }
}

let update = {
    id:5,
    nombre: 'Maddona',
    rut: 99999998,
    curso: 'Cantante 👩‍🎤',
    nivel: 'intermedio'
}


const deleteStudent =  async (id)=>{
    try {
        let deletUser = {
            text:'DELETE FROM estudiantes WHERE id=$1 RETURNING id, nombre, rut, curso, nivel',
            values:[id]
        }

        let results = await pool.query(deletUser);
        let estudianteEliminado = results.rows[0];
        console.log(chalk.magenta('**************************'+'🎸🎸🎸estudiante eliminado 😓😓😓'+chalk.magenta('***************************')));
        console.log(estudianteEliminado);
        console.log(chalk.magenta('*******************************************************************************************'));

    } catch (error) {
        console.log(error);
    }
}

// comandos

let comandos = process.argv[2];

const operaciones = ()=>{
    switch (comandos) {
        case "getStudent":
            getStudent();
            break;
            case "addStudent":
                addEstudent(studentAdd);
                break;
                case "searchStudent":
                getRut(89888890);
                break;
                case "change":
                    updateStudent(update);
                    break;
                    case "delete":
                        deleteStudent(8);
                        break;
        default:
            console.log('comando no reconocido')
            break;
    }
}

operaciones(comandos);

