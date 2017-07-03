exports.index = [
    {
        method: 'POST',
        handler: require('./post')
    },
    {
        method: 'GET',
        handler: require('./get')
    }
];
