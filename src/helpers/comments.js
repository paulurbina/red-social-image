const { Comment, Image } = require('../models');

module.exports = {
    async newest() {
        const comments = await Comment.find() // Buscara todo los comentarios
            .limit(5) // solamente max 5
            .sort({ timestamp: -1 }); // los mas novedosos

            for(const comment of comments ) {
                // buscara el comentario de cada imagen
                const image = await Image.findOne({ _id: comment.image_id }); 
                comment.image = image;
            }

            return comments;
    }
};