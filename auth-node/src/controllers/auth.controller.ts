import { Request, Response } from "express";
import {Joi} from "express-validation";
import { UserModel } from "../models/user.model";
import bcryptjs from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

const registerValidation = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().required()
});

export const register = async (req: Request, res: Response) => {
    const body = req.body;

    const {error} = registerValidation.validate(body);
    if (error) {
        return res.status(400).send(error.message);
    }

    if(body.password !== body.password_confirmation) {
        return res.status(400).send({
            message: "Passwords do not match"
        });
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(body.password, salt);

    const user = new UserModel({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: hashPassword
    });

    const result = user.save();
    const {password, ...data} = await JSON.parse(JSON.stringify(result));
    
        res.send(data);
}

export const login = async (req: Request, res: Response) => {
    const user = await UserModel.findOne({email: req.body.email});
    if(!user) {
        return res.status(400).send({
            message: "invalid credentials"
        });
    }
    if (!await bcryptjs.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: "invalid credentials"
        });
    }

    const token = sign({id: user._id}, process.env.JWT_SECRET || '');

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, //1 Day
    });
    res.send(
        {
            message: "login successful",
        }
    );
}

export const user = async (req: Request, res: Response) => {
    try{
    const cookie = req.cookies['jwt'];

    const payload: any = verify(cookie, process.env.JWT_SECRET || '');

    if(!payload) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }

    const user = await UserModel.findOne({_id: payload._id});
    if(!user) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }

    const {password, ...data} = await JSON.parse(JSON.stringify(user));

    res.send(data);
} catch (e) {
    return res.status(401).send({
        message: "unauthenticated"
    });
}
}

export const logout = async (req: Request, res: Response) => {
    res.cookie("jwt", "", {maxAge: 0} );

    res.send({
        message: "logout successful"
    })
}