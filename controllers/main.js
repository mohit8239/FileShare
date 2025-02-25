
import { error } from "console"
import multer from "multer"
import path from "path"
import FileModel from "../models/file.js"
import { v4 as uuidv4 } from "uuid"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let storage = multer.diskStorage({
    destination: (req,file,cb)=>cb(null,'uploads/'),
    filename:(req,file,cb)=>{
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        cb(null,uniqueName)
    }
})

let upload = multer({
    storage:storage,
    limits:{fileSize:1000000 * 100},
}).single('myFile')


class Main{
    static Uploading = async(req,res)=>{
    
        //Store File
        upload(req,res,async(err)=>{

             //Validate Request
            if(!req.file){
            res.json({error:"All fields are required."})
            }

            if(err){
                return res.status(500).send({error:err.message})
            }

            //Store in Database
            const file = new FileModel({
                filename:req.file.filename,
                uuid: uuidv4(),
                path: req.file.path,
                size:req.file.size
            })

            const response = await file.save()
            return res.json({file:`${process.env.APP_BASE_URL}/files/${response.uuid}`})
        })

        

        //Response -> Link
    }

    static Downloading = async(req,res)=>{
        try {
            const file = await FileModel.findOne({uuid:req.params.uuid})
            if(!file){
                return res.render('download',{error:'Link has been expired'})
            }
            return res.render('download',{
                uuid:file.uuid,
                fileName:file.filename,
                fileSize:file.size,
                download:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`
            })
        } catch (error) {
            console.log(error);
            return res.render('download',{error:'Something went wrong'})
        }
       
    }
    static Downloadend = async(req,res)=>{
        const file = await FileModel.findOne({uuid:req.params.uuid})
        if(!file){
            return res.render('download',{error:'Link has been expired'})
        }

        console.log('File path from DB:', file.path);

        const filePath = `${__dirname}/../${file.path}`;

        res.download(filePath, (err) => {
            if (err) {
                return res.status(500).send('Error downloading the file');
            }
            console.log('File successfully downloaded');
        });
    
    }
}

export default Main