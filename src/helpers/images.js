const { Image } = require('../models');

module.exports = {
    // retornara las imagenes con mas likes
    async popular() {
        // Buscando desde la base de datos
        let images = await Image.find()
            .limit(9) //Traera solamente 9 imagenes
            .sort({likes: -1}); // devolvera las que tienen mayor like
        
        return images;
    }

};