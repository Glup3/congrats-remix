import { FunctionComponent } from 'react'

interface TextInputProps {
    label: string
    inputId: string
    isRequired?: boolean
}

export const TextInput: FunctionComponent<TextInputProps> = ({ label, inputId, isRequired = false }) => {
    return (
        <div>
            <label htmlFor={inputId} className="block font-medium text-gray-700">
                {label}
            </label>
            <input
                type="text"
                name={inputId}
                id={inputId}
                required={isRequired}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md px-2 border-gray-300"
            />
        </div>
    )
}
