import asyncHandler from "express-async-handler"
import User from "../models/User.js"
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/Auth.js";

const registerUser = asyncHandler(async (req, res) => {
    const {fullName, email, password, image} = req.body

    try {
        const userExists = await User.findOne({email});
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }
        //j'ai haché le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //je crée l'utilisateur dans ma base de données
        const user = await User.create({
            fullName,
            email,
            password:hashedPassword,
            image,
        });
        //je renvoie vers le client les informations saisies par l'utilisateur ici. 
        if (user) {
            res.status(201).json ({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const loginUser = asyncHandler(async(req, res)=> {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        
        if (user && (await bcrypt.compare(password, user.password))) {
            //je verifie si l'utilisateur existe et si le mot de passe qui est passé correspond au mot de passe retrouvé dans la base de données de l'utilsiateurf
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } //main}
    }  catch (error) {
        res.status(400).json({message : error.message});
    }
});

const loginUserAdmin = asyncHandler(async(req, res)=> {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        
        if (user && (await bcrypt.compare(password, user.password))) {
            if (!user.isAdmin) {
              // L'utilisateur n'est pas un administrateur, renvoyer une erreur 401
              res.status(401).json({ message: "Access denied. User is not an administrator." });
              return;
            } //je verifie si l'utilisateur existe et si le mot de passe qui est passé correspond au mot de passe retrouvé dans la base de données de l'utilsiateurf
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } //main}
    }  catch (error) {
        res.status(400).json({message : error.message});
    }
});


// je vais créer un controlleur privé pour faire des update et de l'actualisation du mot de passe possiblement quand il existe déjà

const updateUserProfile = asyncHandler(async (req, res) => {
    const {fullName, email, image } = req.body; //Ces données sont fournies par l'utilisateur pour mettre à jour son profil.
    try {
        const user = await User.findById(req.user._id); //Elle recherche l'utilisateur dans la base de données en utilisant son ID (req.user._id).
        if(user) { //|| est utilisé pour conserver les valeurs actuelles si les nouvelles données sont vides
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.image = image || user.image;

            const updatedUser = await user.save();
            res.json ({
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                image: updatedUser.image,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id), //un nouveau token d'authentification généré avec generateToken
            });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({message : error.message});
    }
});

const deleteUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._Id);
        if (user) {
            if (user.isAdmin) {
                res.status(400);
                throw new Error ("Can't delete admin user");
            }
            await user.remove() //c'estainsi que je remove l'user
            res.json({message: "User deleted successfully"}); //puis j'affiche ce message 
        }
        else {
            res.status(404);
            throw new Error ("User not found");
        }
    } catch(error) {
        res.status(400).json({message: error.message});
    }
})

const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (user &&  (await bcrypt.compare(oldPassword, user.password))) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await user.save();
            res.json({ message : "Password changed !"});
        } else {
            res.status(401);
            throw new Error("Invalid old password");
        }
    } catch (error) {
        res.status(404).json({ message : error.message })
    }
});

const LikedMovies = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user_id).populate("likedMovies");
        if(user) {
            res.json(user.LikedMovies);
        }
        else {
            res.status(404);
            throw new Error("User not found");
        }
    }  catch(error) {
        res.status(400).json({message: error.message});
    }
});

const addLikedMOvies = asyncHandler(async (req, res) => {
    const {movieId} = req.body;
    try {
        const user = await User.findById(req.user._id); //trouver avant tout l'utilisateur dans la base de donnée
        if (user) { //definir une constante qui vérifie que le film est liké et le vérifié par l'utilisateur
            if (user.LikedMovies.includes(movieId)) {
                res.status(400);
                throw new Error("Movie already liked"); 
            }
            user.LikedMovies.push(movieId);
            await user.save();
            res.json(user.LikedMovies);
        }
        else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({message : error.message });
    }
});

const deleteLikedMovies = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id); 
        if (user) { 
            user.LikedMovies = [];
            await user.save();
            res.json({message:"All liked movies deleted successf"});
        }
        else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({message : error.message });
    }
});

//LES ADMIN MAINTENANT !
const getUsers = asyncHandler(async (req, res) => {
    try  {
        const users = await User.find({});
        res.json(users);
    } catch(error) {
        res.status(400).json( { message : error.message });
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._Id);
        if (user) {
            if (user.isAdmin) {
                res.status(400);
                throw new Error ("Can't delete admin user");
            }
            await user.remove() //c'estainsi que je remove l'user
            res.json({message: "User deleted successfully"}); //puis j'affiche ce message 
        }
        else {
            res.status(404);
            throw new Error ("User not found");
        }
    } catch(error) {
        res.status(400).json({message: error.message});
    }
})


export {registerUser, loginUser, loginUserAdmin, updateUserProfile, deleteUserProfile, changeUserPassword, LikedMovies, addLikedMOvies, deleteLikedMovies, getUsers, deleteUser};


