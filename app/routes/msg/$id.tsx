import { LoaderFunction } from '@remix-run/server-runtime'
import { useLoaderData } from 'remix'
import type { MetaFunction } from 'remix'
import { db } from '../../db.server'
import { Message } from '../../generated/client'
import { CongratsContent } from '../../modules/congratsMessages/CongratsContent'
import { getImageURLByEventType } from '../../common/messageTypeUtil'

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

export const meta: MetaFunction = ({ data }) => {
    const message: Message = data

    return {
        title: message.title,
        description: message.description,
        'og:title': message.title,
        'og:description': message.description,
        'og:type': 'website',
        'og:image': getImageURLByEventType(message.type),
        'og:image:width': '300',
        'og:image:height': '300',
    }
}

export default function CongratsIdPage() {
    const message = useLoaderData<Message>()

    return <CongratsContent message={message} />
}
