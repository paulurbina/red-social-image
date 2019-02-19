// Modules
const path = require('path');
const fs = require('fs-extra');
const md5 = require('md5');
// Helpers / libs
const { randomString } = require('../helpers/libs');
// Models
const { Image, Comment } = require('../models');
// Exports object
const ctrl = {};

ctrl.index = async (req, res) => {
    const viewModel = { image: {}, comments: {} };

    const image = await Image.findOne({ filename: {$regex: req.params.image_id}});
    if (image) {
        image.views = image.views + 1;
        viewModel.image = image;
        await image.save();
        const comments = await Comment.find({image_id: image._id});
        viewModel.comments = comments;
        res.render('image', {image, comments});
    } else {
        res.redirect('/');
    }
    
};
ctrl.create = (req, res) => {

    const savedImage = async () => {
        const imgURL = randomString();
        // buscando en la db si hay ese alfanumero guardado
        const images = await Image.find({ filename: imgURL });
        if(images.length > 0) {
            savedImage();
        } else {
            const imageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`src/public/upload/${imgURL}${ext}`);
            console.log(targetPath);
            if (ext ==='.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                await fs.rename(imageTempPath, targetPath);
                const newImg = new Image({
                    title: req.body.title,
                    filename: imgURL + ext,
                    description: req.body.description
                });
                await newImg.save();
                res.redirect('/images/' + imgURL);
            } else {
                await fs.unlink(imageTempPath);
                res.status(500).json({error: 'Solamente imagenes'});
            }
        }
        
    };

    savedImage();

};
ctrl.like = (req, res) => {
    res.send('Index Page')
};
ctrl.comment = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        await newComment.save();
        res.redirect('/images/' + image.uniqueId);
    } else {
        res.redirect('/');
    }
};
ctrl.remove = (req, res) => {
    res.send('Index Page')
};


module.exports = ctrl;