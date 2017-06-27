module.exports = function (res) {
    return function (obj) {
        try {
            obj[1].connection.release();
        } catch (e) {}
        res.status(500).send({
            'error': (obj[0] || '').toString()
        });
    };
};
