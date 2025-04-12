const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req,res) =>{
    // #swagger.tags = ["Buyers"]
    try{
        const result = await mongodb.getDatabase().db().collection("Buyers").find();
        const buyer = await result.toArray();

        res.setHeader("Content-type", "application/json");
        res.status(200).json(buyer);
    }catch (err) {
        res.status(500).json({ message: "An error occurred while fetching the buyer", error: err })
    }
};

const getSingle = async (req,res) =>{
    // #swagger.tags = ["Buyers"]
    try{
        const buyerId = new ObjectId(req.params.id)
        const result = await mongodb.getDatabase().db().collection("Buyers").find({_id: buyerId});
        const buyer = await result.toArray();

        res.setHeader("Content-type", "application/json");
        res.status(200).json(buyer[0]);
    }catch (err){
        res.status(500).json({ message: "An error occurred while fetching the buyer", error: err });
    }
};

const createBuyer = async (req,res) =>{
    // #swagger.tags = ["Buyers"]
    try{
        const buyer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        };
        const response = await mongodb.getDatabase().db().collection("Buyers").insertOne(buyer);
        if (response.acknowledged > 0 ){
            res.status(200).json({ message: "Buyer created successfully" });
        }else{
            res.status(500).json(response.error || "Some error occurred while inserting the buyer");
        }
    }catch (err){
        res.status(500).json({ message: "An error occurred while creating the buyer", error: err });
    }
};

const updateBuyer = async (req, res) => {
    // #swagger.tags = ["Buyers"]
    try {
        const buyerId = new ObjectId(req.params.id);

        const updatedBuyer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        };


        const response = await mongodb.getDatabase().db().collection("Buyers").updateOne(
            { _id: buyerId }, 
            { $set: updatedBuyer }  
        );


        if (response.modifiedCount > 0) {
            res.status(200).json({ message: "Buyer updated successfully" });
        } else {
            res.status(500).json({ message: "No changes made, check if the buyer exists or if the data is the same" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred while updating the buyer", error: err });
    }
};


const deleteBuyer = async (req,res) =>{
    // #swagger.tags = ["Buyers"]
    try{
        const buyerId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection("Buyers").deleteOne({_id: buyerId});

        if(response.deletedCount > 0){
            res.status(200).json({ message: "Buyer deleted successfully" });
        }else{
            res.status(500).json(response.error || "An error occurred while deleting the buyer");
        }
    }catch (err){
        res.status(500).json({ message: "An error occurred while deleting the user", error: err });
    }
}

module.exports = {getAll,getSingle,createBuyer,updateBuyer, deleteBuyer}
