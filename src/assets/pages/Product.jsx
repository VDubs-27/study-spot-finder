import { useRef, useState, useEffect } from 'react';
import { IconArrowRight, IconLayoutGrid, IconLayoutGridFilled, IconLayoutList, IconLayoutListFilled, IconSearch, IconX } from '@tabler/icons-react';
import { Tooltip, ActionIcon, TextInput, useMantineTheme } from '@mantine/core';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Navigation from "../components/Navigation"
import Tag from '../components/Tag';

const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function Product() {
    const theme = useMantineTheme();
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    const [showSuggestions, setShowSuggestions] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const hideTimerRef = useRef(null);

    const [gridMode, setGridMode] = useState(true);

    // Initialise Map
    useEffect(() => {

        // Only initialize the map once.
        if (!mapContainerRef.current) {
            return;
        }

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/standard',
            center: [174.770, -36.852],
            zoom: 15,
            accessToken: mapboxToken,
        })

        map.on('load', () => {
            const studySpots = [
                { name: 'General Library', coordinates: [174.768, -36.852] },
                { name: 'Engineering Block', coordinates: [174.763, -36.854] },
            ];

            studySpots.forEach(spot => {
                new mapboxgl.Marker({ color: '#228be6' })
                    .setLngLat(spot.coordinates)
                    .addTo(mapRef);
            });
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        }

    }, []);

    function toggleSuggestions() {
        if (showSuggestions) {
            setIsFadingOut(true);
            hideTimerRef.current = window.setTimeout(() => {
                setShowSuggestions(false);
                setIsFadingOut(false);
            }, 1000);
        }
        else {
            window.clearTimeout(hideTimerRef.current);
            setShowSuggestions(true);
            setIsFadingOut(false);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-neutral-100">
            <Navigation currentPage={'product'} />
            <div className="flex flex-col items-center gap-10 mx-20 my-10">
                <h1 className="text-4xl font-bold text-neutral-800">Browse Study Spots</h1>
                <div className="flex flex-col items-center gap-4 w-full">
                    <TextInput
                        className="w-full max-w-md"
                        radius="xl"
                        size="lg"
                        placeholder="Search spots"
                        rightSectionWidth={42}
                        leftSection={<IconSearch size={22} stroke={1.5} />}
                        rightSection={
                            <ActionIcon
                                size={36}
                                radius="xl"
                                color={theme.primaryColor}
                                variant="filled"
                                aria-label="Search"
                            >
                                <IconArrowRight size={22} stroke={1.5} />
                            </ActionIcon>
                        }
                        aria-label="Search spots"
                    />
                    {!showSuggestions && (
                        <div className={`justify-left max-w-md mt-[-10px] pl-4 ${isFadingOut ? 'animate-[fadeOut_0.5s_ease-in-out_0s_forwards]' : 'animate-[fadeIn_0.5s_ease-in-out_0s_forwards]'}`}>
                            <h4 className="cursor-pointer hover:underline" onClick={() => toggleSuggestions()}>✏️ Show suggestions</h4>
                        </div>
                    )}
                    {showSuggestions && (
                        <div className={`flex flex-row items-center justify-center gap-2 w-full ${isFadingOut ? 'animate-[fadeOut_0.5s_ease-in-out_0s_forwards]' : 'animate-[fadeIn_0.5s_ease-in-out_0s_forwards]'}`}>
                            <h4 className="animate-[fadeIn_0.5s_ease-in-out_0s_forwards] opacity-0">Not sure? ➡️</h4>
                            <Tag name="🤫 Quiet" />
                            <Tag name="⚡ Chargers" />
                            <Tag name="🦉 Till Late" />
                            <ActionIcon
                                className="animate-[fadeIn_0.5s_ease-in-out_0s_forwards] opacity-0"
                                size={16}
                                radius="xs"
                                color="black"
                                variant="transparent"
                                aria-label="Close suggestions"
                                onClick={() => toggleSuggestions()}
                            >
                                <IconX size={16} stroke={2} />
                            </ActionIcon>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-10 w-full items-start justify-center lg:flex-row">
                    <div className="w-full h-[500px] min-h-[500px] block rounded-2xl overflow-hidden border-4 border-white shadow-xl relative bg-neutral-200">
                        {/* The Map Target - Absolute fill ensures it stretches to the parent's 500px */}
                        <div
                            ref={mapContainerRef}
                            className="absolute inset-0 w-full h-full"
                        />

                    </div>
                    {/* Placeholder for a grid of study spot in card form */}
                    <div className="w-full h-[500px] min-h-[500px] block rounded-2xl overflow-hidden border-4 border-white shadow-xl relative bg-neutral-200">
                        {/* Div to toggle view of all cards */}
                        <div className="absolute top-4 right-4 z-10">
                            <Tooltip label={gridMode ? "Switch to list view" : "Switch to grid view"} withArrow>
                                <ActionIcon
                                    size={30}
                                    radius="xl"
                                    color={theme.primaryColor}
                                    variant="filled"
                                    aria-label="Toggle to grid view"
                                >

                                    {gridMode ? (
                                        <span className="icon-wrapper transition-transform duration-500 hover:rotate-180" onClick={() => setGridMode(false)}>
                                            <IconLayoutList size={18} stroke={1.5} className="icon-outlined" />
                                            <IconLayoutListFilled size={18} stroke={1.5} className="icon-filled" />
                                        </span>
                                    ) : (
                                        <span className="icon-wrapper transition-transform duration-500 hover:rotate-180" onClick={() => setGridMode(true)}>
                                            <IconLayoutGrid size={18} stroke={1.5} className="icon-outlined" />
                                            <IconLayoutGridFilled size={18} stroke={1.5} className="icon-filled" />
                                        </span>
                                    )
                                    }

                                </ActionIcon>
                            </Tooltip>
                        </div>
                        {/* Example card */}
                        <div className="flex flex-col items-start gap-1 p-6">
                            <h2 className="text-2xl font-bold text-neutral-800">General Library</h2>
                            <p className="text-neutral-600">A quiet place with plenty of seating and power outlets.</p>
                            <div className="flex flex-row items-center gap-2 pt-2">
                                <Tag name="🤫 Quiet" displayOnly />
                                <Tag name="⚡ Chargers" displayOnly />
                                <Tag name="🦉 Till Late" displayOnly />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}