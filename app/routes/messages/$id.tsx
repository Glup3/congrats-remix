import { LoaderFunction } from '@remix-run/server-runtime'
import { useLoaderData } from 'remix'
import type { MetaFunction } from 'remix'
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

export const meta: MetaFunction = ({ data }) => {
    const message: Message = data

    return {
        title: message.title,
        description: message.description,
        'og:image': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        'og:title': message.title,
        'og:description': message.description,
        'og:type': 'website',
    }
}

export default function CongratsIdPage() {
    const message = useLoaderData<Message>()

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-semibold">{message.title}</h1>
            <div>{message.description}</div>
            <div>{message.date.toString()}</div>
        </div>
    )
}
