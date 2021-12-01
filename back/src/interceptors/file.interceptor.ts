import {extname} from 'path';

export const editFileName = (req, file, callback) => {
  const ext = extname(file.originalname);
  const rnd = Array(8)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
  callback(null, rnd + ext);
};
