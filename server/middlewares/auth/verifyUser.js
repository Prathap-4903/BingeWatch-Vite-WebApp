import jwt from 'jsonwebtoken';

//Verify User Using JWT
const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.json({ status: false, message: "No Token"});
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        req.user = decoded;
        next();
    } catch(err) {
        return res.json(err);
    }
};

export default verifyUser;