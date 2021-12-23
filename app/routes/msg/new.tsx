import { LoaderFunction } from '@remix-run/server-runtime'
import { requireUsername } from '../../session.server'

export const loader: LoaderFunction = async ({ request }) => {
    await requireUsername(request)

    return null
}

export default function NewMessagePage() {
    return (
        <div>
            <h1>Create New Message</h1>
            <div>tbd...</div>
        </div>
    )
}
