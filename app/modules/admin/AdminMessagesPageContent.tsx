import { FunctionComponent } from 'react'
import { Message } from '../../generated/client'

interface AdminMessagesPageContentProps {
    messages: Message[] | null
}

export const AdminMessagesPageContent: FunctionComponent<AdminMessagesPageContentProps> = ({ messages }) => {
    if (!messages) {
        return <div>Error with messages...</div>
    }

    return (
        <div>
            <h1 className="text-4xl">All Messages</h1>
            <ul className="list-disc p-2">
                {messages.map(m => (
                    <li
                        key={m.id}
                        className="text-lg mb-2 cursor-pointer"
                        onClick={() => navigator.clipboard.writeText(`https://congrats-remix.herokuapp.com/msg/${m.id}`)}
                    >
                        {m.title} - {m.recipient} - {m.id}
                    </li>
                ))}
            </ul>
        </div>
    )
}
