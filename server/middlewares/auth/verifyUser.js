import jwt from 'jsonwebtoken';

//Verify User Using JWT
const verifyUser = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.json({ status: false, message: "No Token"});
        }
        const decoded = jwt.verify(token, process.env.KEY);
        req.user = decoded;
        next();
        console.log("Decoded JWT:", decoded);
    } catch(err) {
        return res.json(err);
    }
};

export default verifyUser;