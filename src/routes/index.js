module.exports = app => {
    app.get('/', (req, res) => {
        res.send('welcome a my page');
    });
};