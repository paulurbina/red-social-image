const path = require('path');
const { randomString } = require('../helpers/libs');
const fs = require('fs-extra');
const ctrl = {};

ctrl.index = (req, res) => {
    res.send('Index Page')
};
ctrl.create =  async (req, res) => {
    const imgURL = randomString();
    console.log(imgURL);
    const imageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(`src/public/upload/${imgURL}${ext}`);

    if (ext ==='.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        await fs.rename(imageTempPath, targetPath);
    }

    res.send('works!');
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