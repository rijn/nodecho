module.exports = function (res) {
    return function (obj) {
        try {
            obj[1].connection.release();
        } catch (e) {}
        if (process.env.NODE_ENV === 'dev') console.log(obj);
        res.status(obj[2] || 400).send({
            'error': (obj[0] || '').toString()
        });
    };
};
