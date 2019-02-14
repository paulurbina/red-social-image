const path = require('path');
const { randomString } = require('../helpers/libs');
const fs = require('fs-extra');
const { Image } = require('../models');
const ctrl = {};

ctrl.index = (req, res) => {
    res.send('Index Page')
};
ctrl.create = (req, res) => {

    const savedImage = async () => {
        const imgURL = randomString();
        // buscando en la db si hay ese alfanumero guardado
        const images = await Image.find({ filename: imgURL });
        if(images.length > 0) {
            savedImage();
        } else {
            console.log(imgURL);
            const imageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`src/public/upload/${imgURL}${ext}`);
        
            if (ext ==='.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                await fs.rename(imageTempPath, targetPath);
                const newImg = new Image({
                    title: req.body.title,
                    filename: imgURL + ext,
                    description: req.body.description
                });
                const imageSaved = await newImg.save();
                // res.redirect('/images');
                res.send('works!');
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