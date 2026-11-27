import asynchHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import {User} from "../models/user.model.js"; //we didnt export as default so have to use {}
import {uploadOnCloudinary} from "../utils/cloudinary.js";


const registerUser = asynchHandler(async(req,res)=>{
    //steps:

    //get user details from frontend thorugh postman 
    //validation -- not empty all (ex : username, email,no)
    //check if user already exists : with username , email
    //check files exist or not : image , avatar
    //upload to cloudinary: image , avatar
    //create user Object - create entry in db
    //remove password and refresh token field from response 
    //check for user creation 
    //return response
    
    
    //1.get user details

    const {fullname, email, username, password}= req.body // in red.body data will come 
    console.log("email:",email);

    //2.validation 
    if(fullname ===""){
        throw new ApiError(400,"full name is required")
    }

    if(  [fullname,email,username,password].some((field)=> field?.trim()==="")){
       throw new ApiError(400,"All fields are required")
    }
    
    //3.check user exist or not 

    const existedUser = User.findOne({
        $or:[{ email }, { username }] //here used or check both email or username
    })
    if(existedUser){
        throw new ApiError(409,"User with email or username Already Exist"); //easy because we create a apierror file to handle 
    }
   //4.check avatar
    const avatarLocalPath =req.files?.avatar[0]?.path;
    const coverImageLocalPath =req.files?.coverImage[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(400,"avatar file is required");
    }

    //5.upload on the cloudinary 
    const avatar =  await uploadOnCloudinary(avatarLocalPath);//it will take time so use await thats why the function is asyncHandler
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400,"avatar is Required");
    }

})



export default registerUser;