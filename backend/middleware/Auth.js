import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js"
//je dois créer un token pour chaque personne qui s'enregistre ici dans la base de données

const generateToken = (id) => { //je prends l'id et je retourne le token avec le protocole jwt
    return jwt.sign({ id }, process.env.JWT_SECRET, { //retourner le token en se servant du JWT_SECRET, la variable d'environnement
        expiresIn: "1d", //date d'expiration
    });
};

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an admin");
    }
}

export { generateToken, protect, admin };