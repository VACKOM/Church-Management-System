const express = require("express");
const database = require("../../config/connect")
const { ObjectId } = require("mongodb");

let adminRouters = express.Router();

//# 1. Retrieve All Administrators
adminRouters.route("/admin").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("admins").find({}).toArray();
        if (data.length > 0) {
            response.json(data);
        } else {
            response.status(404).json({ message: "No Records Found :(" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

//# 2. Retrieve One
adminRouters.route("/admin/:id").get(async (request, response) => {
    try {
        const adminId = request.params.id;

        // Validate ObjectId
        if (!ObjectId.isValid(adminId)) {
            return response.status(400).json({ message: "Invalid ObjectId format" });
        }

        let db = database.getDb();
        let data = await db.collection("admins").findOne({ _id: new ObjectId(adminId) });

        if (data) {
            response.json(data);
        } else {
            response.status(404).json({ message: "No Record Found :(" });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        response.status(500).json({ message: error.message });
    }
});

//# 3. Create
adminRouters.route("/admin").post(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            name: request.body.name,
            code: request.body.code,
            number: request.body.number,
            date: request.body.date
        };
        let data = await db.collection("admins").insertOne(mongoObject);
        response.status(201).json(data);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

//# 4. Update
adminRouters.route("/admin/:id").put(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            $set: {
                name: request.body.name,
                code: request.body.code,
                leader: request.body.leader,
                number: request.body.number,
                date: request.body.date
            }
        };
        let data = await db.collection("admins").updateOne({ _id: ObjectId(request.params.id) }, mongoObject);
        if (data.modifiedCount > 0) {
            response.json(data);
        } else {
            response.status(404).json({ message: "No Record Found to Update :(" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

//# 5. Delete
adminRouters.route("/admin/:id").delete(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("admins").deleteOne({ _id: ObjectId(request.params.id) });
        if (data.deletedCount > 0) {
            response.json({ message: "Record Deleted Successfully" });
        } else {
            response.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

module.exports = adminRouters;