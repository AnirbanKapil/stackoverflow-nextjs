import env from "@/app/env"

import { Avatars , Client , Databases , Storage , Users } from "node-appwrite";

let client = new Client();

client
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setKey(env.appwrite.apiKey) // Your secret API key
;


const databases = new Databases(client);
const avatars = new Avatars(client);
const users = new Users(client);
const storage = new Storage(client);


export {client , users , storage , databases , avatars}
