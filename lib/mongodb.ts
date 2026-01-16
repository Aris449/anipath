import mongoose from "mongoose"

const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@userinfo.44bs2n7.mongodb.net/?appName=UserInfo`

if(!connectionString) {
    throw new Error("Provide a valid MongoDb connection string");
}

 const connectDB = async () => {
    if(mongoose.connection?.readyState >= 1) {
        // console.log("Connected to db")
        return;
    }

    try {
        console.log("connecting to mongoDB");
        await mongoose.connect(connectionString);
    }catch(e) {
        console.log("Error connecting to MonoDb: ", e)
    }
}


export default connectDB