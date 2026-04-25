import { useState } from 'react'
import { Select, Button } from '@mantine/core'
import CarouselDemo from './assets/components/Carousel'
import Guide from './assets/components/Guide'

export default function App() {

  const [disabled, setDisabled] = useState(true)
  const [campus, setCampus] = useState(null)

  const handleChange = (value) => {
    setCampus(value)
    setDisabled(!value)
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-100">
        <nav className="flex flex-row items-center justify-between w-full py-4 px-24">
          <div className="flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
            <img src="/favicon.svg" alt="logo" className="inline-block w-6 h-6 mr-2" />
            <h1 className="text-xl font-bold text-neutral-800">Studious</h1>
          </div>
          <div className="flex flex-row items-center gap-6">
            <a href="#guide" className="text-neutral-600 hover:bg-black hover:text-white ease-in-out duration-300 p-2 rounded-md">Quick Start Guide</a>
          </div>
        </nav>
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