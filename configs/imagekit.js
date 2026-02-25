const ImageKit = require("imagekit"); // "@imagekit/nodejs" pani thik chha, tara 'imagekit' package use garda dherai sajilo hunchha

const imagekit = new ImageKit({
    // Spelling check garnus:
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,   // 'K' thulo hunu parchha
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // Yo thik chha
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT // 'E' thulo, tara 'p' sano: urlEndpoint
});

module.exports = imagekit;