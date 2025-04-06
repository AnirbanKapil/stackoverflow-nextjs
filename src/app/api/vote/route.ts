import { answerCollection, db, questionCollection, voteCollection } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function POST (request : NextRequest) {
    try {
      const {voteStatus , type , typeId , votedById} = await request.json() 
      
      const response = await databases.listDocuments(
        db,voteCollection, [
            Query.equal("type",type),
            Query.equal("typeId",typeId),
            Query.equal("voteById",votedById)
        ]
      )

      if(response.documents.length > 0){
          await databases.deleteDocument(db,voteCollection,response.documents[0].$id)

          const QuestionOrAnswer = await databases.getDocument
          (
            db,
            type === "question" ? questionCollection : answerCollection,
            typeId
          )

          const authorPrefs = await users.getPrefs<UserPrefs>(QuestionOrAnswer.authorId)

          await users.updatePrefs<UserPrefs>(QuestionOrAnswer.authorId,{
            reputation : response.documents[0].voteStatus === "upvoted" ? Number(authorPrefs.reputation) - 1 : Number(authorPrefs.reputation) + 1
          })
      }


      if(response.documents[0]?.voteStatus !== voteStatus){

      }
      
      const {upvotes,downvotes} = await Promise.all([
        databases.listDocuments(db,voteCollection,[
          Query.equal("type",type),
          Query.equal("typeId",typeId),
          Query.equal("voteById",votedById),
          Query.equal("voteStatus","upvoted"),
          Query.limit(1)
        ]),
        databases.listDocuments(db,voteCollection,[
          Query.equal("type",type),
          Query.equal("typeId",typeId),
          Query.equal("voteById",votedById),
          Query.equal("voteStatus","downvoted"),
          Query.limit(1)
        ]),
      ])

      return NextResponse.json(
        {
          data : {
            document : null,
            voteResult : upvotes.total = downvotes.total,
            message : "vote handled"
          }
        },
        {
          status : 200
        }
      )
      
    } catch (error : any) {
        return NextResponse.json(
            {error : error?.message || "Error in voting"},
            {status : error?.status || error?.code || 500}
        )
    }
}