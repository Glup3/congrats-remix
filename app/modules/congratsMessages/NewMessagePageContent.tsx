import { FunctionComponent } from 'react'
import { TextInput } from '../common/TextInput'

export const NewMessagePageContent: FunctionComponent<{}> = () => {
    return (
        <div>
            <h1 className="text-4xl font-semibold mb-4">Create new Message</h1>
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form method="post">
                    <div className="px-4 py-5 space-y-6">
                        <TextInput inputId="title" label="Title" isRequired />

                        <div>
                            <label htmlFor="description" className="block font-medium text-gray-700">
                                Description
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={5}
                                    defaultValue={''}
                                    required
                                    className="shadow-sm px-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <TextInput inputId="footer" label="Footer" isRequired />
                        <TextInput inputId="recipient" label="Recipient" isRequired />

                        <div>
                            <label htmlFor="date" className="block font-medium text-gray-700">
                                Date
                            </label>
                            <input id="date" name="date" type="date" defaultValue="2021-12-24" required />
                        </div>

                        <div>
                            <label htmlFor="message-type" className="block font-medium text-gray-700">
                                Message Type
                            </label>
                            <select
                                id="message-type"
                                name="message-type"
                                required
                                className="mt-1 block w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="Christmas">Christmas</option>
                                <option value="Birthday">Birthday</option>
                                <option value="NewYear">NewYear</option>
                            </select>
                        </div>

                        <div className="px-4 py-3 text-right sm:px-6">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
