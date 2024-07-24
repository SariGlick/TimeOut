import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return next({ message: "Authorization header missing", status: 401 });
        }

        const [, token] = authorization.split(' ');

        if (!token) {
            return next({ message: "Token missing from authorization header", status: 401 });
        }

        const privateKey = process.env.JWT_SECRET || 'JWT_SECRET';

        const data = jwt.verify(token, privateKey);
        req.user = data;
        next();
    } catch (err) {
        next({ message: err.message, status: 401 });
    }
};

export default auth;
