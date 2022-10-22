import mongoose from 'mongoose'
import { Schema, model, models, Document, Types, Model } from 'mongoose'
import bcrypt from 'bcrypt'

export interface userExpenses{
    value: number;
    date: Date;
}
export interface UserModel extends Document{
    username: string;
    email: string;
    password: string;
    online: boolean;
    balance: number;
    amountSubtract: number;
    amountToAdd: number;
    arrayDeposit: Types.Array<userExpenses>;
    arrayWithdraw: Types.Array<userExpenses>;
    comparePassword: (password: string) => Promise<Boolean>
}

const userExpensesSchema =  new Schema<userExpenses>(
    {
        value:{
            type: Number,
            default: 0
        },
        date:{
            type: Date,
            // default: Date.now()
        },
})

const userSchema = new Schema<UserModel>(
    {
        username:{
            type: String,
            required: true,
            index: false
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
        balance:{
            type: Number,
            default: 0
        },
        amountSubtract:{
            type: Number,
        },
        amountToAdd:{
            type: Number,
        },
        arrayDeposit:{
            type: [userExpensesSchema],
            default: [{value: 0, date: Date.now()}]
        },
        arrayWithdraw:{
            type: [userExpensesSchema],
            default: [{value: 0, date: Date.now()}]
        }
        // arrayDeposit:[Schema.Types.Mixed]
        // ,
        // arrayWithdraw:[Schema.Types.Mixed],
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


// const User = models.User || model<UserModel>("User", userSchema)  

// export default User
const User = () => model<UserModel>("User", userSchema) 
export default (models.User || User()) as ReturnType<typeof User> //si funciona