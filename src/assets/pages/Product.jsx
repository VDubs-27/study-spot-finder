import { useState } from 'react';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import { ActionIcon, TextInput, useMantineTheme } from '@mantine/core';
import Navigation from "../components/Navigation"
import Tag from '../components/Tag';

export default function Product() {
    const theme = useMantineTheme();

    const [showSuggestions, setShowSuggestions] = useState(true);

    function handleType() {
        setShowSuggestions(false);
    }

    return (
        <div className="flex flex-col min-h-screen bg-neutral-100">
            <Navigation currentPage={'product'} />
            <div className="flex flex-col items-center gap-10 mx-20 my-10">
                <h1 className="text-4xl font-bold text-neutral-800">Browse Study Spots</h1>
                <div className="flex flex-col items-center gap-4 w-full">
                    <TextInput
                        className="w-full max-w-md"
                        onChange={handleType}
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
                    {showSuggestions && (
                        <div className="flex flex-row items-center justify-center gap-2 w-full">
                            <h4 className="animate-[fadeIn_1s_ease-in-out_2s_forwards] opacity-0">Not sure? ➡️</h4>
                            <Tag name="🤫 Quiet" />
                            <Tag name="⚡ Chargers" />
                            <Tag name="🦉 Till Late" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}