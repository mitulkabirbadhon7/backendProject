import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"; //file system



    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    
    // Upload an image
    const uploadOnCloudinary = async (localFilePath) =>{

        try{
            if(!localFilePath) return null
            //upload the file in cloudinary
            const response = await cloudinary.uploader.upload(localFilePath,{
               resource_type:"auto", 
            })
            //file has been uploaded 
            console.log("File is Uploaded On cloudinary",response.url);
            return response;
        }
        catch(error){
            //not uploaded so have to remove the file 

            fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation got failed 
            return null;
        }
    }

    export {uploadOnCloudinary}