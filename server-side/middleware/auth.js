import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [, token] = authorization.split(' ');
    const privateKey = process.env.JWT_SECRET || 'JWT_SECRET';
    const data = jwt.verify(token, privateKey);
    req.user = data;
    next();
  } catch (err) {
    next({ message: 'Not authorized', status: 401 });
  }
};
