import { useState } from 'react'
import { Select, Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import CarouselDemo from '../components/Carousel'
import Guide from '../components/Guide'
import Navigation from '../components/Navigation'


export default function Landing() {

    const navigate = useNavigate()
    const [disabled, setDisabled] = useState(true)
    const [campus, setCampus] = useState(null)

    const handleChange = (value) => {
        setCampus(value)
        setDisabled(!value)
    }

    return (
        <div className="flex flex-col min-h-screen bg-neutral-100">
            <Navigation currentPage={'landing'} />
            <div className="flex flex-row items-center justify-center my-50">
                <div className="flex flex-1 flex-col items-center gap-4">
                    <h1 className="text-5xl tracking-wide text-neutral-800">Need a study spot?</h1>
                    <p className="text-lg text-neutral-600">Select campus and start browsing.</p>
                    <Select
                        placeholder="Select campus"
                        value={campus}
                        onChange={handleChange}
                        data={[
                            { value: 'uoacc', label: 'UoA City Campus' },
                        ]}
                        clearable
                        clearSectionMode="clear"
                    />
                    <Button
                        disabled={disabled}
                        variant="filled"
                        color="rgba(0, 0, 0, 1)"
                        size="md"
                        onClick={() => navigate('/browse')}
                    >
                        Browse
                    </Button>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <CarouselDemo />
                </div>
            </div>
            <Guide />
        </div>
    )
}