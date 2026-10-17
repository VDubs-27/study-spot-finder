import Tag from "./Tag";
import { Tooltip, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconArrowsMaximize, IconHandClickOff } from '@tabler/icons-react';

export default function GridItem({ item, isCurrentItem, onClick, onItemSelect, onItemUnselect }) {
    const theme = useMantineTheme();

    return (
        <div className="group relative flex w-full min-w-0 flex-col items-center gap-4 rounded-md bg-white p-4 shadow transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-cyan-50 cursor-pointer">

            <div className="absolute top-2 right-2 z-10">
                <Tooltip label="Expand study spot" withArrow>
                    <ActionIcon
                        size={30}
                        radius="xl"
                        color={theme.black}
                        variant="filled"
                        aria-label="Expand study spot"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick();
                        }}
                    >
                        <span className="icon-wrapper transition-transform duration-500">
                            <IconArrowsMaximize size={18} stroke={1.5} className="icon-outlined" />
                        </span>
                    </ActionIcon>
                </Tooltip>
            </div>

            {isCurrentItem && (
                <div className="absolute top-2 left-2 z-10">
                    <Tooltip label="Unselect Item" withArrow>
                        <ActionIcon
                            size={30}
                            radius="xl"
                            variant="filled"
                            color="red"
                            aria-label="Unselect item"
                            onClick={(e) => {
                                e.stopPropagation();
                                onItemUnselect();
                            }}
                        >
                            <span className="icon-wrapper transition-transform duration-500">
                                <IconHandClickOff size={18} stroke={1.5} className="icon-outlined" />
                            </span>
                        </ActionIcon>
                    </Tooltip>
                </div>
            )}

            <div onClick={onItemSelect} className="flex min-w-0 flex-col items-start w-full">
                <div className="flex flex-col gap-2 w-full">
                    <div className="w-full overflow-hidden rounded-md aspect-[16/10] bg-neutral-200">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <span className="text-lg font-medium text-neutral-800 break-words">{item.name}</span>
                    <div className="flex flex-wrap items-center gap-2">
                        {item.tags.map((tag, index) => (
                            <Tag key={index} name={tag} displayOnly small />
                        ))}
                    </div>
                </div>
                <p className="pt-2 text-sm text-neutral-600 break-words">
                    {item.description}
                </p>
            </div>
        </div>
    )
}
