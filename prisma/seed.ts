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
                id: 'message1',
                title: 'Merry Christmas Alex',
                description: 'This is the description and it should be HTML',
                recipient: 'Alex',
                username: 'admin',
                type: 'Christmas',
                date: '2022-01-09T23:00:00.000Z',
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
