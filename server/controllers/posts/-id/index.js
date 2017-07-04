exports.index = [
    {
        method: 'PUT',
        handler: require('./put')
    },
    {
        method: 'GET',
        handler: require('./get')
    },
    {
        method: 'DELETE',
        handler: require('./delete')
    }
];
