const User=require('../Models/User');

//create user
exports.createUser=async (req,res)=>{
    try{
        console.log('hello');
        // Extract user details from request body
        const {name,
               DOB,
               contactNumber,
               emailID,
               userDes}=req.body;
        
        console.log(name);
        console.log(DOB);
        console.log(contactNumber);
        console.log(emailID);
        console.log(userDes);
        
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
        const {userID}=req.query;
        // const UserID=_id;
        // console.log(userID);
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


// Show all users & pagination 
exports.showAllUsers = async (req, res) => {
    try {
        // Extract page & limit from query parameters
        const { page, limit } = req.query;

        let users;
        let totalPages=1;
        if (page && limit) {
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);

            // Validate pagination parameters
            if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber <= 0 || limitNumber <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid pagination parameters",
                });
            }

            const skip = (pageNumber - 1) * limitNumber;
            const totalCount = await User.find({}).count();
            totalPages = Math.ceil(totalCount / 2);

            // Fetch paginated users
            users = await User.find({}).skip(skip).limit(limitNumber);
        } else {
            // Fetch all users
            users = await User.find({});
        }

        // Check if users exist
        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found",
                data: [],
                totalPages
            });
        }

        // Return success response with users
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
            totalPages
        });
    } catch (error) {
        console.error("Error while fetching users:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching users",
            error: error.message,
        });
    }
};


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
            _id}=req.body;
     
        const userID=_id;
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
        const  {userID}  = req.query;

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



