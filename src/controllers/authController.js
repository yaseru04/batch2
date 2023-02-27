const {user, Sequelize} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Op = Sequelize.Op

module.exports = {
    //register
    register: (req, res) => {
        const {body} = req;
        const saltround = 10;

        body.password =  bcrypt.hashSync(body.password,saltround);

        user.create(body)
        .then((data) =>{
            res.status(200).send({
                msg:'register succes' ,
                status : 500 ,
                data
            })
        })
        .catch((error) =>{
            res.status(500).send({
                msg:'register failed' ,
                status : 500 ,
                error
            })
        })
    },
    //login

    login: async(req, res) => {
        const {body} = req;

        let findUser = await user.findOne({
            where: {
                [Op.or] : [
                    {username: body.username},
                    {email: body.username}
                ]
            }
        })
        // cek user, apakah ada pada database
        if(findUser === null){
            res.send({
                msg: 'Login Error',
                status: 404,
                error: 'User not found'
            })
        }
        const isValidPassword = bcrypt.compareSync(
            body.password,
            findUser.dataValues.password,
            console.log(body.password)
            );
        if(isValidPassword === false){
            res.send({
                msg:"Login Error",
                status: 403,
                error: "invalid password"
            })
        }
        const payload = {
            id : findUser.dataValues.id,
            username: findUser.dataValues.username,
            email: findUser.dataValues.email
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 86400
        })
        delete findUser.dataValues.password;
        res.status(200).send({
            msg: "Login Success",
            status: 200,
            data: {...findUser.dataValues, token}
        })
    }
}
