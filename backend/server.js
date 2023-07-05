const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2')
const PORT = 3001;
const router = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'student_db',
    user: 'root',
    password: 'Raji@1492'
});

app.use(cors())
app.use(bodyParser.json())
app.use("/api", router);

connection.connect((error) => {
    if(error) console.log(error);
    else console.log('MySql connected successfully');
})

connection.query('CREATE TABLE IF NOT EXISTS students (id INT AUTO_INCREMENT PRIMARY KEY, rollno INT UNIQUE, name VARCHAR(20), email VARCHAR(30) UNIQUE, address VARCHAR(50), password VARCHAR(20))', (error) => {
    if(error) console.log(error);
    else console.log('Table created successfully');
});

connection.query('CREATE TABLE IF NOT EXISTS marks (id INT AUTO_INCREMENT PRIMARY KEY, rollno INT UNIQUE, subject VARCHAR(20), internal1 INT, internal2 INT, semester INT)', (error) => {
    if(error) console.log(error);
    else console.log('Marks table created successfully');
});

app.post('/register', (req, res) =>{
    connection.query(`SELECT * FROM students WHERE rollno='${req.body.rollno}'`, (error, success) => {
        // console.log(success[0]?.rollno)
        if(error) res.send(error)
        else if(success[0]?.rollno) return res.send({success: false, message: "You are already registered."})
        else {
            connection.query(`INSERT INTO students (rollno, name, email, address, password) VALUES (${req.body.rollno}, '${req.body.name}', '${req.body.email}', '${req.body.address}', '${req.body.password}') `, (error, success) => {
                if(error) return res.send(error)
                else return res.send({success: true, message: "User is registered."})
            })
        }
    })
})

app.get('/fetch-user/:email/:password', (req, res) => {
    const email = req.params.email;
    const password = req.params.password;
    console.log(req.body)
    connection.query(`SELECT email, password FROM students WHERE email='${email}' AND password='${password}'`, (error, success) => {
        console.log(success)
        if(error) return res.send(error)
        else if(success[0]?.email) return res.send({success: true, message: ""}) 
        return res.send({success: false, message: "You are not registered. Please register."})
    })
})

app.get('/fetch-student/:email', (req, res) => {
    const email = req.params.email;
    // const password = req.params.password;
    connection.query(`SELECT * FROM students WHERE email='${email}'`, (error, success) => {
        console.log(success)
        if(error) return res.send(error)
        else return res.send(success) 
        // return res.send({success: false, message: "You are not registered. Please register."})
    })
})
app.get('/fetch-students/', (req, res) => {
    connection.query(`SELECT * FROM students`, (error, success) => {
        console.log(success)
        if(error) return res.send(error)
        else return res.send(success) 
    })
})

app.listen(PORT, () => {
    console.log("Server is running on port ", PORT)
})