import { useEffect } from "react";
import Tag from "./Tag";
import { ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

export default function ExpandedItemView({ item, onClose }) {

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 md:p-8 backdrop-blur-sm animate-[fadeIn_0.2s_ease-in-out]"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative flex w-full max-w-5xl h-full max-h-[85vh] md:max-h-[90vh] min-w-0 flex-col md:flex-row gap-6 rounded-lg bg-white p-6 md:p-8 shadow-xl overflow-y-auto md:overflow-hidden"
            >
                <ActionIcon
                    style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 50 }}
                    className="transition-transform duration-300 ease-in-out hover:scale-110 shadow-md"
                    size={36}
                    radius="xl"
                    color="white"
                    variant="white"
                    aria-label="Close expanded view"
                    onClick={onClose}
                >
                    <IconX size={18} color="black" stroke={2.5} />
                </ActionIcon>

                <div className="w-full md:w-3/5 flex-shrink-0">
                    <div className="w-full h-full overflow-hidden rounded-md aspect-[16/10] md:aspect-auto md:h-full bg-neutral-200">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                </div>

                <div className="flex flex-col min-w-0 w-full md:w-2/5 justify-between md:overflow-y-auto pr-1">
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-2xl font-bold text-neutral-800 break-words pr-6">{item.name}</span>
                        <div className="flex flex-wrap items-center gap-2 my-2">
                            {item.tags.map((tag, index) => (
                                <Tag key={index} name={tag} displayOnly small />
                            ))}
                        </div>
                        <p className="pt-2 text-base text-neutral-600 break-words leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
