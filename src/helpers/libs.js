const helpers = {};

helpers.randomString = () => {
    const possible = 'abcdefghijkmnopqrstuvwxyz0123456789';
    let randomString = 0;
    for(let i = 0; i < 7; i++) {
        randomString += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomString;
}

module.exports = helpers;