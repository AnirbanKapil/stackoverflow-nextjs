import { db } from "../name";
import createAnswerCollection, { answerCollection } from "./answer.collection";
import createQuestionCollection, { questionCollection } from "./question.collection";
import createCommentCollection, { commentCollection } from "./comment.collection";
import createVoteCollection, { voteCollection } from "./vote.collection";
import { databases } from "./config";


export default async function getOrCreateDB () {
    try {
        await databases.get(db)
        console.log("Database connection")
    } catch (error) {
        try {
            await databases.create(db , db)
            console.log("database created") 
            await Promise.all([
                createAnswerCollection(),
                createQuestionCollection(),
                createVoteCollection(),
                createCommentCollection()

            ])
            console.log("collections created successfully")
            console.log("Database connected")
        } catch (error) {
            console.log("Error creating collection or Database",error)
        }
    }
    return databases;
}

