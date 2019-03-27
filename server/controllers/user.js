const User = require('../models/user')
const Question = require('../models/question')
const Tag = require('../models/tag')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { comparePass } = require('../helpers/password')


module.exports = {
    login: (req, res) => {
        User
            .findOne({
                email: req.body.email
            })
            .then(findResult => {
                if (!findResult) res.status(404).json({ msg: `incorrect username/password` })
                else {
                    if (!comparePass(req.body.password, findResult.password)) res.status(401).json({ msg: `incorrect username/password` })
                    else {
                        let token = jwt.sign({
                            id: findResult._id,
                            email: findResult.email,
                            name: findResult.name,
                            gender: findResult.gender,
                            role: findResult.role
                        }, process.env.JWT_SECRET)
                        res.status(200).json({ access_token: token, id: findResult._id, name: findResult.name })
                    }
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    register: function (req, res) {
        User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                // watchedTags: req.body.watchedTags.map(e => e.text)
            })
            .then(createResult => {
                let userId = createResult._id
                // Cart.create({ userId: userId })
                res.status(201).json(createResult)
            })
            .catch(err => {
                console.log(err)
                let modelValidation = []
                if (err.errors.username) modelValidation.push(err.errors.username.properties.message)//'username '
                if (err.errors.name) modelValidation.push(err.errors.name.properties.message)
                if (err.errors.email) modelValidation.push(err.errors.email.properties.message)//'email '
                if (err.errors.password) modelValidation.push(err.errors.password.properties.message)//'password '
                if (modelValidation.length > 0) {
                    res
                        .status(400)
                        .json({
                            msg: `Bad Request`,
                            modelValidation
                        })
                } else {
                    res
                        .status(500)
                        .json({
                            msg: `Internal Server Error`,
                            err: err
                        })
                }
                // res.status(500).json(err)
            })
    },
    getProfile(req, res) {
        User
            .findById(req.user.id)
            .then(user => {
                res 
                    .status(200)
                    .json(user)
            })
            .catch(err => {
                res 
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err                        
                    })
            })
    },
    findAll: function (req, res) {
        User
            .find({})
            .then(findResult => {
                res.status(200).json(findResult)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    seeWatchedTags: function (req, res) {
        let questionSuggestions = []
        User
            .findById(req.user.id)
            .then(user => {
                let findTag = []
                user.watchedTags.forEach(wT => {
                    findTag.push(
                        Tag
                            .findOne({
                                name: wT
                            })
                    )
                })
                return Promise.all(findTag)
            })
            .then(found => {
                let noNull = found.filter(e => e !== null)
                let idFiltered = noNull.map(id => id._id)
                let findQuestions = []
                idFiltered.forEach(tag => {
                    findQuestions.push(
                        Question
                            .find({
                                tags: tag
                            })
                            .populate('tags')
                    )
                })
                return Promise.all(findQuestions)
            })
            .then(questions => {
                questions.forEach(question => {
                    questionSuggestions = questionSuggestions.concat(question)
                })
                res
                    .status(200)
                    .json(questionSuggestions)
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err
                    })
            })

    },
    editwatchedTags(req, res) {
        console.log('abc',req.body)
        User
            .updateOne({
                _id: req.user.id
            }, {
                watchedTags: req.body.tags.map(e => e.text)
            }, {
                new: true
            })
            .then((data) => {
                console.log('masuk',data)
                res
                    .status(200)
                    .json({
                        msg: `Tags updated`
                    })
            })
            .catch(err => {
                res 
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err                        
                    })
            })
    }

}