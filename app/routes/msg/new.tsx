import { ActionFunction, json, LoaderFunction } from '@remix-run/server-runtime'
import { EventType } from '../../generated/client'
import { NewMessagePageContent } from '../../modules/congratsMessages/NewMessagePageContent'
import { createNewMessage } from '../../services/message-service.server'
import { requireUsername } from '../../session.server'

export const loader: LoaderFunction = async ({ request }) => {
    await requireUsername(request)

    return null
}

export type ActionData = {
    formError?: string
    fieldErrors?: {
        username: string | undefined
        password: string | undefined
    }
    fields?: {
        username: string
        password: string
    }
}

const badRequest = (data: ActionData) => json(data, { status: 400 })

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const title = form.get('title')
    const description = form.get('description')
    const footer = form.get('footer')
    const recipient = form.get('recipient')
    const date = form.get('date')
    const messageType = form.get('message-type')

    if (
        typeof title !== 'string' ||
        typeof description !== 'string' ||
        typeof footer !== 'string' ||
        typeof recipient !== 'string' ||
        typeof date !== 'string' ||
        typeof messageType !== 'string'
    ) {
        return badRequest({
            formError: `Form not submitted correctly.`,
        })
    }

    const username = await requireUsername(request)

    const newMessage = await createNewMessage({
        title,
        description,
        footer,
        recipient,
        date,
        messageType: messageType as EventType,
        username,
    })
    console.log('id', newMessage?.id)

    return null
}

export default function NewMessagePage() {
    return <NewMessagePageContent />
}
