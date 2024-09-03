import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite'

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.rnpractice',
    projectId: '66d52070002de0aa008b',
    databaseId: '66d521d1001616b0fc39',
    userCollectionId: '66d521e90037c8d17a3f',
    videoCollectionId: '66d5221300021036eedc',
    storageId: '66d5235f002f4fda3e84'
}
const { endpoint, platform, projectId, databaseId, userCollectionId,
    videoCollectionId, storageId } = config

const client = new Client()
client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setPlatform(platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

// sign in
export const signIn = async(email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)

        return session
    } catch (error: any) {
        throw new Error(error)
    }
}


// user
export const createUer = async(email: string, password: string, username: string) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount)
                throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)
        const newUser = await databases.createDocument(
            databaseId,
            userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser
    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
}

export const getCurUser = async() => {
    try {
        const curAccount = await account.get()

        if(!curAccount)
            throw Error

        const curUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountId', curAccount.$id)]
        )

        if(!curUser)
            throw Error

        return curUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}

// posts
export const getAllPosts = async() => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId
        )

        return posts.documents
    } catch (error: any) {
        throw new Error(error)
    }
}