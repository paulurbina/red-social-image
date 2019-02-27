const ctrl = {};

const { Image } = require('../models');
const sidebar = require('../helpers/sidebar');

ctrl.index = async (req, res) => {
    const images = await Image
        .find()
        .sort({timestamp: -1}); // Buscara las imagenes por fecha (de mayor a menor)
    let viewModel = { images: [] }; 
    viewModel.images = images;
    viewModel = await sidebar(viewModel); // Agregando al sidebar
    res.render('index', viewModel);
    console.log(viewModel);
};

module.exports = ctrl;