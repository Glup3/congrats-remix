import type { FunctionComponent } from 'react'
import { getImageURLByEventType } from '../../common/messageTypeUtil'
import { EventType } from '../../generated/client'

interface CongratsImageProps {
    eventType: EventType
}

export const CongratsImage: FunctionComponent<CongratsImageProps> = ({ eventType }) => {
    return <img src={getImageURLByEventType(eventType)} className="h-64" />
}
