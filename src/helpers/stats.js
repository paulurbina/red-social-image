const { Comment, Image } = require('../models');

async function imageCounter () {
     // Devolucion la cantidad de imagenes que hay en db
    return await Image.countDocuments();
}

async function commentsCounter () {
    // Devolucion la cantidad de comentarios que hay en db
    return await Comment.countDocuments();
}

async function imageTotalViewsCounter () {
    // Devolucion del total de vistas que hay en todas las imagenes
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            viewsTotal: { // se guardara en esta propiedad
                $sum: '$views' // sumara el total de views
            }
        }
    }]);
    return result[0].viewsTotal;
};

async function likesTotalCounter () {
    // Devolucion del total de vistas que hay en todas las imagenes
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            likesTotal: { // se guardara aqui
                $sum: '$likes' // sumara el total de likes
            }
        }
    }]);
    return result[0].likesTotal; // devolvera el total
}

module.exports = async () => {

    const results = await Promise.all([ // Se ejecutara las funciones a la misma vez (en paralelo)
        imageCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ]);

    return { // Devolvera el valor segun su posicion
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    }

};