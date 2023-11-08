import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'

import users from '../models/auth.js'

export const signup = async (req,res) => {
    const { name, email,password } = req.body;
    try{
        const existinguser = await users.findOne({ email });
        if(existinguser){
            return res.status(404).json({message: "User already Exist."})
        }

        const hashedpassword = await bcrypt.hash(password,12);
        const newUser = await users.create({ name, email, password: hashedpassword });
        const token = jwt.sign({ email: newUser.email, id:newUser._id}, process.env.JWT_SECRET , {expiresIn: '1h'});
        res.status(200).json({ result: newUser, token })
    }catch(error){
        res.status(500).json("Something went wrong...")
    }
}

export const login = async (req,res) => {
    const { email,password } = req.body;

    try{
        const existingUser = await users.findOne({ email });
        if(!existingUser){
            return res.status(404).json({message: "User Doesn't Exist."})
        }

        const isPaswwordCrt = await bcrypt.compare(password, existingUser.password);
        if(!isPaswwordCrt){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({ email: existingUser.email, id:existingUser._id}, process.env.JWT_SECRET , {expiresIn: '1h'});
        res.status(200).json({ result: existingUser, token });
    }catch(error){
        res.status(500).json("Something went wrong...")
    }
}

