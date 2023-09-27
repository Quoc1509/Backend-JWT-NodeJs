import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'




// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'jwt-nodejs'
// })

const salt = bcrypt.genSaltSync(10)

const hashPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt)
}

const createNewUser = async (email, password, username) => {
    let hashUserPassword = hashPassword(password)

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt-nodejs',
        Promise: bluebird
    })

    await connection.execute(`INSERT INTO users (email, password, username) VALUES (?, ?, ?)`, [email, hashUserPassword, username])
    // connection.query(
    //     `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`, [email, hashUserPassword, username],
    //     function(err, results, fields){
    //         console.log(err)
    //     }
    // )
}

const getUserList = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt-nodejs',
        Promise: bluebird
    })
    // let user = []
    // return connection.query(
    //     'SELECT * FROM users',
    //     function(err, results, fields){
    //         if(err) {
    //             console.log(err)
    //             return user
    //         }
    //         else{
    //             user = results
    //             return user     
    //         }
            
    //     }
    // )

    try{
        const [rows, feilds] = await connection.execute('Select * from users')
        return rows
    }catch(e){
        console.log('getUserList: ', e)
    }
}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt-nodejs',
        Promise: bluebird
    })
    try{
        await connection.execute('Delete from users where id=?', [id])
    }catch(e){
        console.log('deleteUser: ', e)
    }
    
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt-nodejs',
        Promise: bluebird
    })
    try{
        const [rows, feilds] = await connection.execute('Select * from users where id=?', [id])
        return rows
    }catch(e){
        console.log('deleteUser: ', e)
    }
}

let updateUserInfor = async (email, username, id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt-nodejs',
        Promise: bluebird
    })
    try{
        const [rows, feilds] = await connection.execute('Update users set email=?, username=? where id=?', [email, username, id])
        return rows
    }catch(e){
        console.log('deleteUser: ', e)
    }
}

module.exports = {
    createNewUser, getUserList, deleteUser,
    getUserById, updateUserInfor
}