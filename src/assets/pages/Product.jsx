import { useRef, useState } from 'react';
import { IconArrowRight, IconSearch, IconX } from '@tabler/icons-react';
import { ActionIcon, TextInput, useMantineTheme } from '@mantine/core';
import Navigation from "../components/Navigation"
import Tag from '../components/Tag';

export default function Product() {
    const theme = useMantineTheme();

    const [showSuggestions, setShowSuggestions] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const hideTimerRef = useRef(null);

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
            </div>
        </div>
    )
}