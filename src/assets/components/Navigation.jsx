import { useNavigate } from 'react-router-dom'

export default function Navigation({ currentPage }) {

    const navigate = useNavigate()

    const scrollToGuide = () => {
        document.getElementById('guide')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    return (
        <nav className="flex flex-row items-center justify-between w-full py-4 px-24">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                <img src="/favicon.svg" alt="logo" className="inline-block w-6 h-6 mr-2" />
                <h1 className="text-xl font-bold text-neutral-800">Studious</h1>
            </div>
            <div className="flex flex-row items-center gap-6">
                {currentPage === 'landing' && (
                    <button
                        type="button"
                        onClick={scrollToGuide}
                        className="text-neutral-600 hover:bg-black hover:text-white ease-in-out duration-300 p-2 rounded-md cursor-pointer"
                    >
                        Quick Start Guide
                    </button>
                )}
                {currentPage === 'product' && (
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="text-neutral-600 hover:bg-black hover:text-white ease-in-out duration-300 p-2 rounded-md cursor-pointer"
                    >
                        Home
                    </button>
                )}
            </div>
        </nav>
    )
}