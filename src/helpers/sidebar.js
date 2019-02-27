const Stats = require('./stats');
const Images = require('./images');
const Comments = require('./comments');

module.exports = async viewModel => {

    const results = await Promise.all([
        Stats(), //  Devolvera las estadisticas de helpers
        Images.popular(), // devolvera las imagenes mas populares
        Comments.newest(), // Devolera los comentarios mas nuevos
    ]);

    viewModel.sidebar = {
        stats: results[0],
        popular: results[1],
        comments: results[2],
    };

    return viewModel;
};