import { FunctionComponent } from 'react'
import { useActionData } from 'remix'

interface AdminPageContentProps {}

export const AdminPageContent: FunctionComponent<AdminPageContentProps> = () => {
    return (
        <div>
            <h1>Admin</h1>
            <form action="/logout" method="post">
                <button type="submit" className="button">
                    Logout
                </button>
            </form>
        </div>
    )
}
