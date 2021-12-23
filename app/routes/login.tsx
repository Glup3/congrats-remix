import { ActionFunction, json } from '@remix-run/server-runtime'
import { LoginPageContent } from '../modules/auth/LoginPageContent'
import { login, createUserSession } from '../session.server'

export type ActionData = {
    formError?: string
    fieldErrors?: {
        username: string | undefined
        password: string | undefined
    }
    fields?: {
        username: string
        password: string
    }
}

const badRequest = (data: ActionData) => json(data, { status: 400 })

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const username = form.get('username')
    const password = form.get('password')
    const redirectTo = form.get('redirectTo') || '/'

    if (typeof username !== 'string' || typeof password !== 'string' || typeof redirectTo !== 'string') {
        return badRequest({
            formError: `Form not submitted correctly.`,
        })
    }

    const user = await login({ username, password })
    if (!user) {
        return badRequest({
            formError: `User not found`,
        })
    }

    return createUserSession(user.username, redirectTo)
}

export default function LoginPage() {
    return <LoginPageContent />
}
