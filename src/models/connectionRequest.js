const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum: {
            values: [ignore, interested, accepted, rejected],
            default: "interested",
            message: '{VALUE} is not supported'     
        }
    }
},{
    timestamps: true,
});

connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

connectionRequestSchema.pre('save',  function(){
    const connectionRequest = this;

    //check if fromUserId and toUserId are the same
    if(connectionRequest.fromUserId.toString() === connectionRequest.toUserId.toString()){
        throw new Error("Cannot send connection request to yourself");
    }
    next();
});

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = {ConnectionRequestModel};