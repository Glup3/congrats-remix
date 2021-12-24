import { LoaderFunction } from '@remix-run/server-runtime'
import { useLoaderData } from 'remix'
import { Message } from '../../generated/client'
import { AdminMessagesPageContent } from '../../modules/admin/AdminMessagesPageContent'
import { getAllMessages } from '../../services/message-service.server'
import { requireUsername } from '../../session.server'

export const loader: LoaderFunction = async ({ request }) => {
    await requireUsername(request)

    const messages = await getAllMessages()

    return messages
}

export default function AdminMessagesPage() {
    const messages = useLoaderData<Message[] | null>()

    return <AdminMessagesPageContent messages={messages} />
}
