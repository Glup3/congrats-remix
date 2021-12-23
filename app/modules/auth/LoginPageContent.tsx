import type { FunctionComponent } from 'react'
import { useSearchParams } from 'react-router-dom'

export const LoginPageContent: FunctionComponent<{}> = () => {
    const [searchParams] = useSearchParams()

    return (
        <div>
            <h1>Login</h1>
            <form method="post">
                <input type="hidden" name="redirectTo" value={searchParams.get('redirectTo') ?? undefined} />
                <div>
                    <label htmlFor="username-input">Username</label>
                    <input type="text" id="username-input" name="username" />
                </div>
                <div>
                    <label htmlFor="password-input">Password</label>
                    <input id="password-input" name="password" type="password" />
                </div>
                <button type="submit" className="button">
                    Submit
                </button>
            </form>
        </div>
    )
}
