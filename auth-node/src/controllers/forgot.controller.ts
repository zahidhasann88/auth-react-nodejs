import { Request, Response } from "express";
import { ResetModel } from "../models/reset.model";
import { UserModel } from "../models/user.model";
import { createTransport } from "nodemailer";
import bcryptjs from "bcryptjs";

const transporter = createTransport({
    host: '0,0,0,0',
    port: 1025
});

export const forgot = async (req: Request, res: Response) => {
    const email = req.body.email;
    const token = Math.random().toString(20).substring(2, 12);

    const reset = new ResetModel({
        email,
        token
    }); 
    await reset.save();

    const url = `http://localhost:3000/reset/${token}`;

    await transporter.sendMail({
        from: 'admin@example.com',
        to: email,
        subject: 'Reset your password',
        html: `<p>Click <a href="${url}">here</a> to reset your password</p>`
    })

    res.send({
        message: "Check your email for a reset link"
    })
}

export const reset = async (req: Request, res: Response) => {
    const body = req.body;

    if(body.password !== body.password_confirmation) {
        return res.status(400).send({
            message: "Passwords do not match"
        });
    }
    const resetPassword = await ResetModel.findOne({token: body.token});
    if(!resetPassword) {
        return res.status(400).send({
            message: "Invalid token"
        });
    }
    const {email} = await resetPassword.toJSON();

    const user = await UserModel.findOne({email});
    if(!user) {
        return res.status(400).send({
            message: "Invalid token"
        });
    }
    const salt = await bcryptjs.genSaltSync(10);

    user.password = await bcryptjs.hashSync(body.password, salt);
    user.save();
    res.send({
        message: "Password updated"
    });
}
