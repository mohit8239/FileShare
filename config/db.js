import mongoose from "mongoose";

const ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.DB,{useUnifiedTopology:true,UseNewUrlParser:true})
        console.log("connected")
    } catch (error) {
        console.log(error);
    }
}

export default ConnectDB