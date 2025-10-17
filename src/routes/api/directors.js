// const express = require("express");
// const database = require("../../config/connect")
// const { ObjectId } = require("mongodb");

import express from 'express';




const directorRouters = express.Router();

// //# 1. Retrieve All Directors
// directorRouters.route("/director").get(async (request, response) => {
//     try {
//         let db = database.getDb();
//         let data = await db.collection("directors").find({}).toArray();
//         if (data.length > 0) {
//             response.json(data);
//         } else {
//             response.status(404).json({ message: "No Records Found :(" });
//         }
//     } catch (error) {
//         response.status(500).json({ message: error.message });
//     }
// });

// //# 2. Retrieve One
// directorRouters.route("/director/:id").get(async (request, response) => {
//     try {
//         const directorId = request.params.id;

//         // Validate ObjectId
//         if (!ObjectId.isValid(directorId)) {
//             return response.status(400).json({ message: "Invalid ObjectId format" });
//         }

//         let db = database.getDb();
//         let data = await db.collection("directors").findOne({ _id: new ObjectId(directorId) });

//         if (data) {
//             response.json(data);
//         } else {
//             response.status(404).json({ message: "No Record Found :(" });
//         }
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         response.status(500).json({ message: error.message });
//     }
// });

// //# 3. Create
// directorRouters.route("/director").post(async (request, response) => {
//     try {
//         let db = database.getDb();
//         let mongoObject = {
//             name: request.body.name,
//             code: request.body.code,
//             number: request.body.number,
//             date: request.body.date
//         };
//         let data = await db.collection("directors").insertOne(mongoObject);
//         response.status(201).json(data);
//     } catch (error) {
//         response.status(500).json({ message: error.message });
//     }
// });

// //# 4. Update
// directorRouters.route("/director/:id").put(async (request, response) => {
//     try {
//         let db = database.getDb();
//         let mongoObject = {
//             $set: {
//                 name: request.body.name,
//                 code: request.body.code,
//                 leader: request.body.leader,
//                 number: request.body.number,
//                 date: request.body.date
//             }
//         };
//         let data = await db.collection("directors").updateOne({ _id: ObjectId(request.params.id) }, mongoObject);
//         if (data.modifiedCount > 0) {
//             response.json(data);
//         } else {
//             response.status(404).json({ message: "No Record Found to Update :(" });
//         }
//     } catch (error) {
//         response.status(500).json({ message: error.message });
//     }
// });

// //# 5. Delete
// directorRouters.route("/director/:id").delete(async (request, response) => {
//     try {
//         let db = database.getDb();
//         let data = await db.collection("directors").deleteOne({ _id: ObjectId(request.params.id) });
//         if (data.deletedCount > 0) {
//             response.json({ message: "Record Deleted Successfully" });
//         } else {
//             response.status(404).json({ message: "No Record Found to Delete :(" });
//         }
//     } catch (error) {
//         response.status(500).json({ message: error.message });
//     }
// });

export default directorRouters;