// Modules
const path = require('path');
const fs = require('fs-extra');
// Helpers / libs
const { randomString } = require('../helpers/libs');
// Models
const { Image } = require('../models');
// Exports object
const ctrl = {};

ctrl.index = async (req, res) => {
    const image = await Image.findOne({ filename: {$regex: req.params.image_id}})
    res.render('image', {image});
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
ctrl.comment = (req, res) => {

    res.send('Index Page')
};
ctrl.remove = (req, res) => {
    res.send('Index Page')
};


module.exports = ctrl;