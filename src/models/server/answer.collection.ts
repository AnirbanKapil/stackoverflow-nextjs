import { IndexType, Permission } from "node-appwrite";

import { db , answerCollection } from "../name";
import { databases } from "./config";


export default async function createAnswerCollection () {
    // creating collection
    await databases.createCollection(db , answerCollection , answerCollection ,[
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
        Permission.read("users"),
        Permission.read("any")
    ]);
    console.log("Answer collection created");

    // creating Attributes

    await Promise.all([
        databases.createStringAttribute(db, answerCollection, "content", 10000, true),
        databases.createStringAttribute(db, answerCollection, "questionId", 50, true),
        databases.createStringAttribute(db, answerCollection, "authorId", 50, true),
    ]);
    console.log("Answer Attributes Created");
}