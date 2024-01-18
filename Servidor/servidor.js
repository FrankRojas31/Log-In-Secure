import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import axios from 'axios';
import dotenv from 'dotenv';
import validator from 'validator';
import bcrypt from 'bcrypt';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const Env = {
    host: process.env.Server,
    user: process.env.User,
    password: process.env.Password,
    database: process.env.DataBase,
    Port: process.env.Port
}

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: Env.host,
    user: Env.user,
    password: Env.password,
    database: Env.database,
});

app.listen(Env.Port, () => {
    console.log(`Servidor Iniciando, se escucha en el puerto: ${Env.Port}`);
    console.log("");
});

connection.connect(function (error) {
    if(error){
        console.log('Ta fallando');
    } else {
        console.log('Si compilo tú');
    }
});

app.post('/UserLog-In', async (req, res) => {
    try {
        const Email = validator.escape(req.body.Email);
        const Password = validator.escape(req.body.Password);
        const sql = 'SELECT id, username, image_user, email, password_hash FROM users WHERE email = ? AND password_hash = ? LIMIT 1';
        const arrValores = [Email, Password];

        connection.query(sql, arrValores, async (error, results) => {
            if (error) {
                console.error('Query Error', error);
                return res.status(500).json({ Error: 'Query Error' });
            }

            if (results.length > 0) {
                const user = resultado[0];
                const passwordMatch = await bcrypt.compare(Password, user.password_hash);

                if (passwordMatch) {
                    const token = jwt.sign({
                        id: user.id,
                        username: user.username,
                        images_user: user.image_user
                    }, 'secreto');
                    console.log(`User: ${user.id} login has been successful`);
                    return res.json({ Status: 'Successful', Results: user, token });
                } else {
                    console.log('Login Failed due to incorrect credentials');
                    return res.json({ Status: 'Error', Message: 'The email or password is incorrect' });
                }
            } else {
                console.log('Login Failed due to incorrect credentials');
                return res.json({ Status: 'Error', Menssage: 'The email or password is incorrect' });
            }
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ Error: 'Unexpected error' });
    }
});
