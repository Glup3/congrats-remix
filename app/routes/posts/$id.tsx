import { useLoaderData } from 'remix'
import type { LoaderFunction } from 'remix'

export const loader: LoaderFunction = async ({ params }) => {
    return params.id
}

export default function PostPage() {
    const id = useLoaderData<string>()

    return <div>Hello {id}</div>
}
