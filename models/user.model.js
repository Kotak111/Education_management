const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,            
        required: true,         
        unique: true,            
        trim: true,              
    },
    email: {
        type: String,           
        required: true,          
        unique: true,            
        trim: true,              
        lowercase: true,        
    },
    password: {
        type: String,            
        required: true,          
    },
    role: {
        type: String,      
        default:"student",              
        enum: ["admin", "teacher", "student"],  
    },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
},
{
    timestamps: true,           
});


const User = model("User", userSchema);

module.exports = User;
