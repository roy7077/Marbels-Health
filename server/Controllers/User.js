const User=require('../Models/User');

//create user
exports.createUser=async (req,res)=>{
    try{
        // Extract user details from request body
        const {name,
               DOB,
               contactNumber,
               emailID,
               userDes}=req.body;
        
        // validate data
        if(!name || !DOB || !contactNumber || !emailID || !userDes){
            return res.status(400).json({
                success:false,
                message:"Enter all fields",
            })
        }

        // Check if user exists with the same email
        if(await User.findOne({emailID})){
            return res.status(409).json({
                success: false,
                message: "User with same email exists",
            });
        }
        
        // Check if user exists with the same contact number
        if(await User.findOne({contactNumber}))
        {
            return res.status(409).json({
                success:false,
                message:"User with same Number exist",
            })
        }

        // Store new user in the database
        const newUser=await User.create({
            name,
            DOB,
            contactNumber,
            emailID,
            userDes
        });

        // Return successful response
        return res.status(201).json({
            success:true,
            message:"User created successfully",
            data:newUser
        })
    }
    catch(error){
        console.log("Error while creating a new user:", error.message);
        return res.status(500).json({
            success:false,
            message:"An error occurred while creating the user",
            error:error.message
        })
    }
}


// Show specific user details
exports.userDetails=async(req,res)=>{
    try{
        // Extract user ID from request body
        const {userID}=req.body;

        // Validate user ID
        if(!userID)
        {
            return res.status(400).json({
                success:false,
                message:"User ID is required"
            })
        }

        // Find user by ID
        const userInfo=await User.findById(userID);

        // If user does not exist
        if(!userInfo){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        // Return success response with user details
        return res.status(200).json({
            success:true,
            message:"User fetched successfully",
            data:userInfo
        })
    }
    catch(error){
        console.log("Error while fetching user's info:", error.message);
        return res.status(500).json({
            success:false,
            message: "An error occurred while fetching the user",
            error: error.message,
        })
    }
}


// Show all users
exports.showAllUsers=async(req,res)=>{
    try{
        // Fetch all users from the database
        const allUsers=await User.find({});

        // Check if there are any users in the database
        if(allUsers.length==0){
            return res.status(404).json({
                success:false,
                message:"No users found"
            })
        }

        // Return success response with all users
        return res.status(200).json({
            success:true,
            message:"Fetched all users successfully",
            data:allUsers
        })
    }
    catch(error){
        console.error("Error while fetching all users:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching users",
            error: error.message,
        });
    }
}


// Update user's details
exports.updateUser=async(req,res)=>{
    try{

        // Extract user's details from request body
        const {
            name,
            DOB,
            contactNumber,
            emailID,
            userDes,
            userID}=req.body;
     
        // Validate data
        if(!name || !DOB || !contactNumber || !emailID || !userDes || !userID){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        // Update user's info
        const updatedUser = await User.findByIdAndUpdate(
            userID,
            {
                name,
                DOB,
                contactNumber,
                emailID,
                userDes
            },
            { new: true }
        );
    
        // If user does not exist
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
    
        // Return success response
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    }
    catch(error){
        console.log("Error while updating user:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the user",
            error: error.message,
        });
    }
}



// Delete user
exports.removeUser = async (req, res) => {
    try {
        // Get user ID from request body
        const  userID  = req.body.userID;

        // Validate user ID
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: "UserID is required",
            });
        }

        // Check if the user exists
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Remove the user
        await User.findByIdAndDelete(userID);

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "User removed successfully",
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while removing the user",
            error: error.message,
        });
    }
};



