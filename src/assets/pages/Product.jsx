import { useRef, useState, useEffect } from 'react';
import { IconArrowRight, IconLayoutGrid, IconLayoutGridFilled, IconLayoutList, IconLoader2, IconLayoutListFilled, IconSearch, IconX } from '@tabler/icons-react';
import { Tooltip, ActionIcon, TextInput, useMantineTheme } from '@mantine/core';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Navigation from "../components/Navigation"
import Tag from '../components/Tag';
import GridView from '../components/GridView';
import ListView from '../components/ListView';

const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function Product() {
    const theme = useMantineTheme();
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    const possibleTags = [
        "💻 Computers",
        "🤫 Quiet",
        "🔌 Outlets",
        "🦉 Till Late",
        "☕ Food",
        "🤝 Booths",
        "🖨️ Printing",
        "💧 Water",
        "🗑️ Bins",
        "♨️ Microwave",
    ]

    let selectedTags = []

    for (let i = 0; i < 3; i++) {
        const j = Math.floor(Math.random() * possibleTags.length);
        if (selectedTags.includes(possibleTags[j])) {
            i--;
            continue
        }
        selectedTags[i] = possibleTags[j];
    }

    const data = [
        {
            image: "https://archipro.co.nz/images/s1/project/higher-education-and-research-facilities/UoA-B405Interior-New-Atrium-Terrace4-of-8-v4.jpg/eyJlZGl0cyI6W3sidHlwZSI6InpwY2YiLCJvcHRpb25zIjp7ImJveFdpZHRoIjoxOTIwLCJib3hIZWlnaHQiOjEyODAsImNvdmVyIjp0cnVlLCJ6b29tV2lkdGgiOjE5MjAsInNjcm9sbFBvc1giOjUwLCJzY3JvbGxQb3NZIjo1MCwiYmFja2dyb3VuZCI6InJnYigxNTEsMTM5LDExNykiLCJmaWx0ZXIiOjB9fV0sInF1YWxpdHkiOjg1fQ==",
            name: "General Library",
            description: "The General Library is a popular study spot with a quiet atmosphere, making it ideal for focused work.",
            tags: ["💻 Computers", "🤫 Quiet"],
            coordinates: [174.769330, -36.851240]
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/University_of_Auckland_General_Library.JPG?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
            name: "Engineering Block",
            description: "The Engineering Block offers a collaborative environment with ample seating and resources for group study sessions.",
            tags: ["🔌 Outlets", "🦉 Till Late"],
            coordinates: [174.770031, -36.852629]
        },
        {
            image: "https://media.licdn.com/dms/image/v2/C5112AQFpiu5loRhzsQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1569153744160?e=2147483647&v=beta&t=8Oq8RRHUsZgylK2hKfZxF3kn-6RRVK_ozrmNPHfGSQk",
            name: "Sir Owen G Glenn Building",
            description: "The Sir Owen G Glenn Building is a modern study space with comfortable seating and great views of the city.",
            tags: ["🔌 Outlets", "☕ Food"],
            coordinates: [174.771241, -36.852992]
        },
        {
            image: "https://www.auckland.ac.nz/content/auckland/en/arts/about-the-faculty/location-maps/jcr:content/leftpar/imagecomponent_408620421/image.img.1024.medium.jpg/1703019492881.jpg",
            name: "Arts Building",
            description: "The Faculty of Arts Building is a historic study space with a vibrant atmosphere and excellent resources.",
            tags: ["🤝 Booths", "🖨️ Printing"],
            coordinates: [174.771394, -36.851285]
        },
    ]

    const [showSuggestions, setShowSuggestions] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const hideTimerRef = useRef(null);

    const [gridMode, setGridMode] = useState(true);
    const [mapLoading, setMapLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState('UoA City Campus');
    const [displayedQuery, setDisplayedQuery] = useState('UoA City Campus');

    const [filteredResults, setFilteredResults] = useState(data);

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

        mapRef.current = map;

        map.on('load', () => {
            data.forEach(spot => {
                new mapboxgl.Marker({ color: '#228be6' })
                    .setLngLat(spot.coordinates)
                    .addTo(map);
            });

            setMapLoading(false);
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

    function searchSpots() {
        const q = searchQuery.trim().toLowerCase();
        setDisplayedQuery(searchQuery);
        const results = data.filter(item =>
            item.name.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.tags.some(tag => tag.toLowerCase().includes(q))
        );

        setFilteredResults(results);
        console.log('searchSpots() results:', results);

        // If we have a map and a known coordinate for the first result, fly to it
        if (results.length > 0 && mapRef.current) {
            const bounds = new mapboxgl.LngLatBounds();

            results.forEach(spot => {
                bounds.extend(spot.coordinates);
            });

            mapRef.current.fitBounds(bounds, {
                padding: 60,
                maxZoom: 17,
                duration: 1000,
            });
        }
        // If no results, fly to original center of campus.
        else {
            try {
                mapRef.current.flyTo({ center: [174.770, -36.852], zoom: 15 });
            } catch (err) {
                console.warn('Map flyTo failed', err);
            }
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
                        value={searchQuery}
                        rightSectionWidth={42}
                        leftSection={<IconSearch size={22} stroke={1.5} />}
                        rightSection={
                            <ActionIcon
                                size={36}
                                radius="xl"
                                color="gray.6"
                                variant="filled"
                                aria-label="Search"
                                onClick={() => searchSpots()}
                            >
                                <IconArrowRight size={22} stroke={1.5} />
                            </ActionIcon>
                        }
                        onChange={e => { setSearchQuery(e.currentTarget.value) }}
                        onKeyDown={e => e.key === 'Enter' ? searchSpots() : null}
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
                            {/* Pick three random from possibleTags */}
                            {selectedTags.map((tag, index) => (
                                <Tag key={index} name={tag} />
                            ))}
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
                        {mapLoading && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-200/80 backdrop-blur-sm">
                                <div className="flex flex-col items-center gap-3 text-neutral-700">
                                    <IconLoader2 size={32} stroke={2} className="animate-spin" />
                                    <span className="animate-pulse text-sm font-medium">Loading map...</span>
                                </div>
                            </div>
                        )}
                        {/* The Map Target - Absolute fill ensures it stretches to the parent's 500px */}
                        <div
                            ref={mapContainerRef}
                            className="absolute inset-0 w-full h-full"
                        />

                    </div>
                    <div className="w-full h-[500px] min-h-[500px] block rounded-2xl overflow-hidden border-4 border-white shadow-xl relative bg-neutral-200 flex flex-col">
                        {/* Div to toggle view of all cards */}
                        <div className="absolute top-2 right-2 z-10">
                            <Tooltip label={gridMode ? "Switch to list view" : "Switch to grid view"} withArrow>
                                <ActionIcon
                                    size={30}
                                    radius="xl"
                                    color={theme.black}
                                    variant="filled"
                                    aria-label="Toggle to grid view"
                                    onClick={gridMode ? () => setGridMode(false) : () => setGridMode(true)}
                                >

                                    {gridMode ? (
                                        <span className="icon-wrapper transition-transform duration-500 hover:rotate-180">
                                            <IconLayoutList size={18} stroke={1.5} className="icon-outlined" />
                                            <IconLayoutListFilled size={18} stroke={1.5} className="icon-filled" />
                                        </span>
                                    ) : (
                                        <span className="icon-wrapper transition-transform duration-500 hover:rotate-180">
                                            <IconLayoutGrid size={18} stroke={1.5} className="icon-outlined" />
                                            <IconLayoutGridFilled size={18} stroke={1.5} className="icon-filled" />
                                        </span>
                                    )
                                    }

                                </ActionIcon>
                            </Tooltip>
                        </div>
                        <div className="flex h-full min-h-0 flex-col p-3 pt-4">
                            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-2">
                                <div className="text-lg font-medium text-neutral-800 mb-4">
                                    Showing available study spots for <span className="font-bold">"{displayedQuery}"</span>
                                </div>
                                {gridMode ? (
                                    <GridView data={filteredResults} />
                                ) : (
                                    <ListView data={filteredResults} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}