import mongoose from "mongoose";


const Schema = new mongoose.Schema({
    filename:{type:String,required:true},
    path:{type:String,required:true},
    size:{type:Number,required:true},
    uuid:{type:String,required:true},
    sender:{type:String,required:false},
    receiver:{type:String,required:false},
},{timestamps:true});

const FileModel = mongoose.model('File',Schema)

export default FileModel