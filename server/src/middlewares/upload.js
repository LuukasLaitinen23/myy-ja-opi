import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs/promises';

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  fileFilter: (req, file, cb) => {
    // allow only images and videos
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/')
    ) {
      // accept file
      cb(null, true);
    } else {
      // reject file
      const error = new Error('Only images and videos are allowed!');
      error.status = 400;
      // log the error for debugging purposes
      console.log('fileFilter error', error);
      cb(error, false);
    }
  },
});

// Muuntaa kuvatiedostot PNG-muotoon
const convertToPng = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const pngFilename = `${req.file.filename}.png`;
    await sharp(req.file.path).png().toFile(`uploads/${pngFilename}`);

    await fs.unlink(req.file.path); // Poistaa alkuperäisen tiedoston
    req.file.filename = pngFilename;
    next();
  } catch (error) {
    next(error);
  }
};

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  await sharp(req.file.path)
    .resize(200, 200)
    .toFile(`uploads/thumbnails/${req.file.filename}-thumbnail.png`);

  next();
};

export {upload, createThumbnail, convertToPng};
export default upload;
