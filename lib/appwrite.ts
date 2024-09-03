import { Account, Avatars, Client, Databases, ID, Query, Storage, ImageGravity } from 'react-native-appwrite'

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
const storage = new Storage(client)

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
            videoCollectionId,
            [ Query.orderDesc('$createdAt') ]
        )

        return posts.documents
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getLatestPosts = async() => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(7)
            ]
        )

        return posts.documents
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getUserPosts = async(userId: string) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator', userId)]
        )

        return posts.documents
    } catch (error: any) {
        throw new Error(error)
    }
}

// query
export const searchPosts = async(query: string) => {
    try {

        console.log(query)
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query)]
        )

        return posts.documents
    } catch (error: any) {
        throw new Error(error)
    }
}

// signout
export const signOut = async() => {
    try {
        const session = await account.deleteSession('current')

        return session
    } catch (error: any) {
        throw new Error(error)
    }
}

// get file
export const getFilePreview = async(filedId: string, type: string) => {
    let fileUrl

    try {
        if(type === 'video') {
            fileUrl = storage.getFileView(storageId, filedId)
        } else if(type === 'image') {
            fileUrl = storage.getFilePreview(storageId, filedId, 2000, 2000, ImageGravity.Top, 100)
        } else {
            throw new Error('Invalid file type')
        }

        if(!fileUrl)
            throw Error

        return fileUrl
    } catch (error: any) {
        throw new Error(error)
    }
}

// upload file
export const uploadFile = async(file: any, type: string) => {
    if(!file)
        return

    const asset = {
        name: file.fileName,
        type: file.mineType,
        size: file.fileSize,
        uri: file.uri
    }

    try {
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset
        )

        const fileUrl = await getFilePreview(uploadedFile.$id, type)

        return fileUrl
    } catch (error: any) {
        throw new Error(error)
    }
}

// create
export const createVideo = async(form: any) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])

        const newPost = await databases.createDocument(
            databaseId,
            videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            }
        )

        return newPost
    } catch (error: any) {
        throw new Error(error)
    }
}