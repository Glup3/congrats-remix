import { useLoaderData } from 'remix'

interface Post {
    title: string
    desc: string
}

export const loader = (): Post[] => {
    return [
        {
            title: 'hello world',
            desc: 'some lorem ipsum random',
        },
        {
            title: 'remix is cool',
            desc: 'why remix is cool and why you should use it',
        },
    ]
}

export default function Posts() {
    const posts = useLoaderData<Post[]>()

    return (
        <div>
            <h1>Posts</h1>
            {posts.map((p, i) => (
                <div key={i}>{p.title}</div>
            ))}
        </div>
    )
}
