const Question = require('../models/question')
const Tag = require('../models/tag')

module.exports = {
    createQuestion: (req, res) => {
        let data = req.body
        let arrayTag = []
        let createdTag = []
        data.tags = data.tags.map(e => e.text)
        data.tags.forEach(tag => {
            arrayTag.push(
                Tag.findOne({name: tag})
            )
        })
        return Promise.all(arrayTag)
        .then(tags => {
            createdTag = tags.filter(tag => tag !== null)
            if(createdTag.length > 0) {
                createdTag.forEach(tag => {
                    let index = data.tags.findIndex(e => e === tag.name)
                    data.tags.splice(index,1)
                })
            }
            createdTag = createdTag.map(e => e.id)
            let newTag = []
            data.tags.forEach(tag => {
                newTag.push(
                    Tag.create({name:tag})
                )
            })
            return Promise.all(newTag)
        })
        .then(tags => {
            let questionData = {
                title: data.title,
                description: data.description,
                createdBy: req.user.id,
                tags: tags
            }
            questionData.tags = questionData.tags.map(e => e.id).concat(createdTag)
            return Question
                .create(questionData)

        })
        .then(question => {
            res.status(201).json(question)
        })
        .catch(err => {
            res.status(500).json(err)
        })
        // Question
        //     .create({
        //         title: req.body.title,
        //         description: req.body.description,
        //         createdBy: req.user.id
        //     })
        //     .then(question => {
        //         res.status(201).json(question)
        //     })
        //     .catch(err => {
        //         res.status(500).json(err)
        //     })
    },
    readAllQuestion: (req, res) => {
        Question
            .find({}).populate('createdBy').populate({
                path:'tags'
            })
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    readOneQuestion: (req, res) => {
        Question
            .findOne({
                _id: req.params.id
            }).populate('createdBy').populate({
                path: 'answers',
                options: {
                    populate: {
                        path: 'createdBy'
                    }
                }
            }).populate({
                path:'tags'
            })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    updateQuestion: (req, res) => {
        let filter = ['title', 'description', 'tags']
        let filtered = {}
        for (const key in req.body) {
            let findFilter = filter.includes(key)
            if (findFilter) filtered[key] = req.body[key]
        }
        filtered.tags = filtered.tags.map(tag => tag.text)
        let promises = []
        let output = []
        filtered.tags.forEach( tag => {
            promises.push(
                Tag.findOneAndUpdate({ 
                    name: tag 
                }, { 
                    $set: { 
                        name: tag 
                    }
                }, { 
                    upsert: true, 
                    new: true 
                })
            )
        })
        return Promise.all(promises)
        .then(function(tags) {
            tags.forEach(tag => {
                output.push(tag._id)
            })
            filtered.tags = output
            return Question.findByIdAndUpdate(req.params.id, filtered, { new: true })
            
        })
        .then(updated => {
            res
                .status(200)
                .json(updated)
        })
        .catch(err => {
            res.status(500).json(err)
        })
        // Question
        //     .findOneAndUpdate({
        //         _id: req.params.id
        //     }, { $set: req.body }, { new: true })
        //     .then(question => {
        //         res.status(200).json(question)
        //     })
        //     .catch(err => {
        //         res.status(500).json(err)
        //     })
    },
    deleteQuestion: (req, res) => {
        Question
            .findOneAndDelete({
                _id: req.params.id
            })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    upVoteQuestion: (req, res) => {
        Question
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                    $push: {
                        upvotes: [req.user.id]
                    }
                }, { new: true })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(200).json(err)
            })
    },
    downVoteQuestion: (req, res) => {
        Question
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                    $push: {
                        downvotes: [req.user.id]
                    }
                }, { new: true })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    removeUpvotesQuestion : (req,res) => {
        Question
            .findOneAndUpdate({
                _id: req.params.id
            },{
                $pull : {
                    upvotes : req.user.id
                }
            })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    removeDownvotesQuestion : (req,res) => {
        Question
            .findOneAndUpdate({
                _id: req.params.id
            },{
                $pull : {
                    downvotes : req.user.id
                }
            })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}