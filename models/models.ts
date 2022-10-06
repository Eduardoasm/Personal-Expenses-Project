import mongoose from 'mongoose'
import { Schema, model, models, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface UserModel{
    username: string;
    email: string;
    password: string;
    online: boolean;
    apodo: string;
}

const userSchema = new Schema<UserModel>(
    {
        username:{
            type: String,
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
        online:{
            type: Boolean,
        },
        apodo:{
            type: String,
        },

    }
)


userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next()

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash
})

userSchema.methods.comparePassword = async function(password: string) : Promise<boolean>{
    return await bcrypt.compare(password, this.password)
}

console.log(models.User)


// const User = models.User || model<UserModel>("User", userSchema)  (no funciona)


const User = () => model<UserModel>("User", userSchema) 
export default (models.User || User()) as ReturnType<typeof User> //si funciona