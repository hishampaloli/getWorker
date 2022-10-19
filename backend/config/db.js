import mongoose from "mongoose";
import colors from 'colors'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://hishampaloli:123321@getwork.vjcyruh.mongodb.net/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`mongoDB connected: ${conn.connection.host}`.cyan.bold.bgCyan);
    } catch (error) {
        console.error(`${error.message}`.red.underline.bold)
        process.exit(1);
    }
}

export default connectDB