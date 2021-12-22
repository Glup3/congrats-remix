import { PrismaClient } from '../app/generated/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.user.createMany({
        skipDuplicates: true,
        data: [
            {
                username: 'admin',
                password: 'admin',
            },
            {
                username: 'test',
                password: 'test',
            },
        ],
    })

    await prisma.message.createMany({
        skipDuplicates: true,
        data: [
            {
                id: '1',
                title: 'Merry Christmas Alex',
                description: "Hey Alex! I wish you and your family a merry Christmas! How are you doing these days? How's work?",
                footer: 'Max',
                recipient: 'Alex',
                username: 'admin',
                type: 'Christmas',
                date: '2022-01-09T23:00:00.000Z',
            },
            {
                id: '2',
                title: 'Alles Gute zum Geburtstag Franz',
                description: 'Yooooooo Franz! Ein Jahr älter geworden huh :D - Alles Gute zum Geburtstag Bro!',
                footer: 'Glup3',
                recipient: 'Franz',
                username: 'admin',
                type: 'Birthday',
                date: '2021-05-14T23:00:00.000Z',
            },
            {
                id: '3',
                title: 'Happy New Year Lisa',
                description: 'Wishing you a joyful New Year and I hope to see you soon again :)',
                footer: 'Luna',
                recipient: 'Lisa',
                username: 'test',
                type: 'NewYear',
                date: '2024-01-01T23:00:00.000Z',
            },
        ],
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
