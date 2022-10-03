import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI

const conectarDB = async() => {
    try {
          await mongoose.connect(MONGO_URI!)
        console.log('mongodb conectado 🚀')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default conectarDB;