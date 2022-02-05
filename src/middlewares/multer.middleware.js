const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const type =
      req.originalUrl.split('/')[parseInt(req.baseUrl.split('/').length - 1)];
    cb(null, path.join(__dirname, `../../public/${type}/images`));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  },
});

module.exports = multer({ storage });
