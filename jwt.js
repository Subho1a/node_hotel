const jwt =require('jsonwebtoken');

const jwtAuthenticationMiddleware = (req, res, next) => {

    // Check if the request has an Authorization header
   const authentication = req.headers.authorization;


    if (!authentication) {
        return res.status(401).json({ error: "unauthorized" });
    }

    //extract token from the request header
    const token = authentication.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "unauthorized" });
    }
    try {
        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Attach user info to request object
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error("JWT verification error:", error);
            return res.status(401).json({ error: "invalid token" });
        }
    }


//function to generate JWT token
const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = {
    jwtAuthenticationMiddleware,
    generateToken
};