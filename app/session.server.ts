import { createCookieSessionStorage, redirect } from '@remix-run/server-runtime'
import bcrypt from 'bcrypt'
import { db } from './db.server'
import { User } from './generated/client'

type LoginForm = {
    username: string
    password: string
}

export async function login({ username, password }: LoginForm): Promise<User | null> {
    const user = await db.user.findUnique({ where: { username } })
    if (!user) {
        return null
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword) {
        return null
    }

    return user
}

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
    throw new Error('SESSION_SECRET must be set')
}

const storage = createCookieSessionStorage({
    cookie: {
        name: 'RJ_session',
        // normally you want this to be `secure: true`
        // but that doesn't work on localhost for Safari
        // https://web.dev/when-to-use-local-https/
        secure: process.env.NODE_ENV === 'production',
        secrets: [sessionSecret],
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
    },
})

export async function createUserSession(username: string, redirectTo: string) {
    const session = await storage.getSession()
    session.set('username', username)
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
    })
}

export function getUserSession(request: Request) {
    return storage.getSession(request.headers.get('Cookie'))
}

export async function getUsername(request: Request) {
    const session = await getUserSession(request)
    const username = session.get('username')
    if (!username || typeof username !== 'string') return null
    return username
}

export async function requireUsername(request: Request, redirectTo: string = new URL(request.url).pathname) {
    const session = await getUserSession(request)
    const username = session.get('username')
    if (!username || typeof username !== 'string') {
        const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
        throw redirect(`/login?${searchParams}`)
    }
    return username
}

export async function getUser(request: Request) {
    const username = await getUsername(request)
    if (typeof username !== 'string') {
        return null
    }

    try {
        const user = await db.user.findUnique({
            where: { username },
        })

        return user
    } catch {
        throw logout(request)
    }
}

export async function logout(request: Request) {
    const session = await storage.getSession(request.headers.get('Cookie'))

    return redirect('/login', {
        headers: {
            'Set-Cookie': await storage.destroySession(session),
        },
    })
}

type ChangePasswordInput = {
    username: string
    oldPassword: string
    newPassword: string
}

export async function changePassword(inputData: ChangePasswordInput) {
    try {
        const user = await db.user.findUnique({ where: { username: inputData.username } })
        if (!user) {
            return null
        }

        const isCorrectPassword = await bcrypt.compare(inputData.oldPassword, user.password)
        console.log('isCorrect', isCorrectPassword)
        if (!isCorrectPassword) {
            return null
        }

        const updatedUser = await db.user.update({
            where: { username: inputData.username },
            data: {
                password: await bcrypt.hash(inputData.newPassword, 10),
            },
        })

        return updatedUser
    } catch (error) {
        console.log(error)
        return null
    }
}
