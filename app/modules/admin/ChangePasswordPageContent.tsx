import { FunctionComponent } from 'react'

interface ChangePasswordPageContentProps {}

export const ChangePasswordPageContent: FunctionComponent<ChangePasswordPageContentProps> = () => {
    return (
        <div>
            <h1>Change Password</h1>
            <form method="post">
                <div>
                    <label htmlFor="old-password">Old Password</label>
                    <input type="password" id="old-password" name="old-password" />
                </div>
                <div>
                    <label htmlFor="new-password">New Password</label>
                    <input type="password" id="new-password" name="new-password" />
                </div>
                <div>
                    <label htmlFor="new-password-confirm">New Password again</label>
                    <input type="password" id="new-password-confirm" name="new-password-confirm" />
                </div>
                <button type="submit" className="button">
                    Submit
                </button>
            </form>
        </div>
    )
}
