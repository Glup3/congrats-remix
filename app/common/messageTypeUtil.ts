import { EventType } from '../generated/client'

export const getImageURLByEventType = (eventType: EventType): string => {
    switch (eventType) {
        case 'Christmas':
            return 'https://i.pinimg.com/originals/52/d0/6b/52d06b9b7e7820c1f4fd55c204c0cee6.png'
        case 'Birthday':
            return 'https://www.boulderhouse-roedental.de/wp-content/uploads/2020/02/happy_freistehend.png'
        case 'NewYear':
            return 'https://cdn-icons-png.flaticon.com/512/4359/4359611.png'
    }
}
