import pikachuImage from '../../public/pikachu.jpg'

export default function IndexPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <img src={pikachuImage} className="mb-4 w-72" />
            <h1 className="text-4xl font-semibold">Congrats :&#41;</h1>
        </div>
    )
}
