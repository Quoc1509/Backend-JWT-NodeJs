import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
import db from '../models/index'



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

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt-nodejs',
    //     Promise: bluebird
    // })

    // await connection.execute(`INSERT INTO user (email, password, username) VALUES (?, ?, ?)`, [email, hashUserPassword, username])\
    try{
        await db.User.create({
            email: email,
            password: hashUserPassword,
            username: username
        })
    }catch(e){
        console.log('createNewUser: ', e)
    }
    
}

const getUserList = async () => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt-nodejs',
    //     Promise: bluebird
    // })

    // try{
    //     const [rows, feilds] = await connection.execute('Select * from user')
    //     return rows
    // }catch(e){
    //     console.log('getUserList: ', e)
    // }
    let users = []
    try{    
        users = await db.User.findAll()
    }catch(e){
        console.log('getUserList: ', e)
    }
    return users
}

const deleteUser = async (id) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt-nodejs',
    //     Promise: bluebird
    // })
    // try{
    //     await connection.execute('Delete from user where id=?', [id])
    // }catch(e){
    //     console.log('deleteUser: ', e)
    // }
    try{
        await db.User.destroy({
            where: {
                id: id
            }
        })
    }catch(e){
        console.log('deleteUser: ', e)
    }
    
}

const getUserById = async (id) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt-nodejs',
    //     Promise: bluebird
    // })
    // try{
    //     const [rows, feilds] = await connection.execute('Select * from user where id=?', [id])
    //     return rows
    // }catch(e){
    //     console.log('deleteUser: ', e)
    // }
    let user = {}
    try{
        user = await db.User.findOne({
            where: {
                id: id
            }
        })
        
    }catch(e){
        console.log('getUserById: ', e)
    }
    return user.get({plain: true})
}

let updateUserInfor = async (email, username, id) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt-nodejs',
    //     Promise: bluebird
    // })
    // try{
    //     const [rows, feilds] = await connection.execute('Update user set email=?, username=? where id=?', [email, username, id])
    //     return rows
    // }catch(e){
    //     console.log('deleteUser: ', e)
    // }

    try{
        await db.User.update(
            {email: email, username: username},
            {where: {id: id}}
        )
    }catch(e){
        console.log('updateUserInfor: ', e)
    }
}

module.exports = {
    createNewUser, getUserList, deleteUser,
    getUserById, updateUserInfor
}