const bcrypt = require('bcryptjs')
const { renderFile } = require('ejs')
const jwt = require('jsonwebtoken')

const MedicalStore = require('../schema/medicalstore')

//register MedicalStore
const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10 , (err, hashedPassword) =>{
        if(err){
            res.json({
                message: "An Error Occured!"
            })
        }
        let medicalStore = new MedicalStore({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            address: req.body.address
        })
    
        medicalStore.save()
        .then(user => {
            
            return res.redirect('/medicalstore/login')
        })
        .catch(err =>{
            res.json({
                message: "Error => " + err
            })
        })
    })
}


//verfiy MedicalStore
const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    MedicalStore.findOne({$or: [{email:username},{username:username}]})
    .then(user =>{
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result)
                {
                    let token = jwt.sign({name: user.name}, 'verySecretValue', {expiresIn: '1h'})
                    req.session.user = user
                    return res.redirect('/medicalstore/home')                 
                }
                else
                {
                    res.json({
                        message: 'Password does not matched!'
                    })
                }
            })
        }
        else
        {
            res.json({
                message: 'No Such User Found!'
            })
        }
    })
}

module.exports = {
    login, register
}
