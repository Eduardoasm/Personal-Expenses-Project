import mongoose from 'mongoose'
import { Schema, model, models } from 'mongoose'

export interface UserModel {
    username: string;
    email: string;
    password: string;
}

const userSchema = new Schema<UserModel>(
    {
        username:{
            type: String,
            require: true,
            unique: true
        },
        email:{
            type: String,
            require: true,
            unique: true
        },
        password:{
            type: String,
            require: true,
        },

    }
)

const User = models.User || model<UserModel>("User", userSchema)

export default User