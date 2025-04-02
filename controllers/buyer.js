const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req,res) =>{
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
    try{
        const buyer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        };
        const response = await mongodb.getDatabase().db().collection("Buyers").insertOne(buyer);
        if (response.acknowledged > 0 ){
            res.status(204).send();
        }else{
            res.status(500).json(response.error || "Some error occurred while inserting the buyer");
        }
    }catch (err){
        res.status(500).json({ message: "An error occurred while creating the buyer", error: err });
    }
};

const updateBuyer = async (req,res) =>{
    try{
        const buyerId = new ObjectId(req.params.id);
        const buyer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        }
        const response = await mongodb.getDatabase().db().collection("Buyers").replaceOne({_id: buyerId}, buyer);

        if(response.modifiedCount > 0){
            res.status(204).send()
        }else{
            res.status(500).json(response.error || "Some error occurred while updating the buyer");
        }
    }catch (err){
        res.status(500).json({ message: "An error occurred while updating the buyer", error: err });
    }
};


const deleteBuyer = async (req,res) =>{
    try{
        const buyerId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection("Buyers").deleteOne({_id: buyerId});

        if(response.deletedCount > 0){
            res.status(204).send();
        }else{
            res.status(500).json(response.error || "An error occurred while deleting the buyer");
        }
    }catch (err){
        res.status(500).json({ message: "An error occurred while deleting the user", error: err });
    }
}

module.exports = {
    getAll,
    getSingle,
    createBuyer,
    updateBuyer,
    deleteBuyer
}