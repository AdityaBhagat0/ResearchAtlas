const mongoose= require("mongoose")

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        require:true
    },
    bio:{
        type:String,
        default:""
    },
    skills:{
        type:String
    },
    institution:{
        type:String,
        default:""
    },
    skills:[{
        type:String
    }],
    intrest:[{
        type:String
    }],
    profilepic:{
        type:String,
        default:""
    },
    role:{
        type:String,
        enum:["researcher","student","admin"],
        defualt:"student"
    },
    uploadPapers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Paper",
        },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
