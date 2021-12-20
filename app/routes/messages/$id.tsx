import { LoaderFunction } from '@remix-run/server-runtime'
import { useLoaderData } from 'remix'
import { db } from '../../db.server'
import { Message } from '../../generated/client'

export const loader: LoaderFunction = async ({ params }) => {
    const message = await db.message.findUnique({
        where: {
            id: params.id,
        },
    })

    if (!message) {
        throw new Response('Not found', { status: 404 })
    }

    return message
}

export default function CongratsIdPage() {
    const message = useLoaderData<Message>()

    return <h1>{message.title}</h1>
}
