const Hashids = require('hashids');

const comps = {
    'User': new Hashids('user', 16),
    'Post': new Hashids('post', 16)
};

module.exports = {
    encode (type, code) {
        return comps[type].encode(code);
    },
    decode (type, code) {
        return comps[type].decode(code)[0];
    }
};
