import { nanoid } from 'nanoid'
import { db } from '../db.server'
import { EventType } from '../generated/client'

type MessageInputData = {
    title: string
    description: string
    footer: string
    recipient: string
    date: string
    messageType: EventType
    username: string
}

export async function createNewMessage(inputData: MessageInputData) {
    try {
        const newMessage = await db.message.create({
            data: {
                id: nanoid(),
                title: inputData.title,
                description: inputData.description,
                footer: inputData.footer,
                recipient: inputData.recipient,
                date: new Date(inputData.date),
                type: inputData.messageType,
                username: inputData.username,
            },
        })

        return newMessage
    } catch (e) {
        console.log(e)
        return null
    }
}

export async function getAllMessages() {
    try {
        const allMessages = await db.message.findMany({
            orderBy: {
                recipient: 'asc',
            },
        })

        return allMessages
    } catch (error) {
        console.log(error)
        return null
    }
}
