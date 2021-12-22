import type { FunctionComponent } from 'react'
import { Message } from '../../generated/client'
import { CongratsImage } from './CongratsImage'

interface CongratsContentProps {
    message: Message
}

export const CongratsContent: FunctionComponent<CongratsContentProps> = ({ message }) => {
    const formattedDate = new Date(message.date).toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' })

    return (
        <div className="flex flex-col items-center mt-16 text-center">
            <CongratsImage eventType={message.type} />
            <h1 className="text-2xl font-semibold mb-2">{message.title}</h1>
            <p className="container max-w-md mb-4">{message.description}</p>
            <div>
                {message.footer && <span className="font-semibold">{message.footer} - </span>}
                <span>{formattedDate}</span>
            </div>
        </div>
    )
}
