import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/server-runtime'
import { ChangePasswordPageContent } from '../../modules/admin/ChangePasswordPageContent'
import { changePassword, getUsername, requireUsername } from '../../session.server'

export const loader: LoaderFunction = async ({ request }) => {
    await requireUsername(request)

    return null
}

type ActionData = {
    formError?: string
    fieldErrors?: {
        oldPassword: string | undefined
        newPassword: string | undefined
        newPasswordConfirm: string | undefined
    }
    fields?: {
        oldPassword: string
        newPassword: string
        newPasswordConfirm: string
    }
}

const badRequest = (data: ActionData) => json(data, { status: 400 })

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const oldPassword = form.get('old-password')
    const newPassword = form.get('new-password')
    const newPasswordConfirm = form.get('new-password-confirm')

    if (typeof oldPassword !== 'string' || typeof newPassword !== 'string' || typeof newPasswordConfirm !== 'string') {
        return badRequest({
            formError: `Form not submitted correctly.`,
        })
    }

    const username = await getUsername(request)
    if (!username) {
        return badRequest({
            formError: `User was not found`,
        })
    }

    const user = await changePassword({ username, oldPassword, newPassword })
    if (!user) {
        return badRequest({
            formError: `Password couldn't get updated`,
        })
    }

    return redirect('/admin')
}

export default function ChangePasswordPage() {
    return <ChangePasswordPageContent />
}
