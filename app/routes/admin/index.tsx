import { FunctionComponent } from 'react'
import { LoaderFunction } from '@remix-run/server-runtime'
import { requireUsername } from '../../session.server'
import { AdminPageContent } from '../../modules/admin/AdminPageContent'

export const loader: LoaderFunction = async ({ request }) => {
    await requireUsername(request)

    return null
}

export default function AdminPage() {
    return (
        <div>
            <AdminPageContent />
        </div>
    )
}
