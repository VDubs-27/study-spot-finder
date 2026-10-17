import Tag from "./Tag"
import { Tooltip, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconHandClick, IconHandClickOff, IconZoomInArea, IconZoomInAreaFilled } from '@tabler/icons-react';

export default function ListItem({ item, isCurrentItem, onClick, onItemSelect, onItemUnselect }) {
    const theme = useMantineTheme();

    return (
        <div className={`relative flex flex-row items-center gap-4 bg-white p-4 rounded-md shadow ${isCurrentItem ? 'scale-[1.02] bg-selected' : 'hover:bg-cyan-50 hover:scale-[1.02]'} ease-in-out duration-300 cursor-pointer`}>

            <div className="absolute top-2 right-2 z-10 flex gap-2">
                {isCurrentItem && (
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
                            <span className="icon-wrapper">
                                <IconHandClick size={18} stroke={1.5} className="icon-outlined" />
                                <IconHandClickOff size={18} stroke={1.5} className="icon-filled" />
                            </span>
                        </ActionIcon>
                    </Tooltip>
                )}

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
                            <IconZoomInArea size={18} stroke={1.5} className="icon-outlined" />
                            <IconZoomInAreaFilled size={18} stroke={1.5} className="icon-filled" />
                        </span>
                    </ActionIcon>
                </Tooltip>
            </div>

            <div onClick={onItemSelect} className="flex flex-col items-start pr-16 w-full">
                <div className="flex flex-row items-center gap-2">
                    <span className="text-lg font-medium text-neutral-800">{item.name}</span>
                    <div className="flex flex-row items-center gap-2">
                        {item.tags.map((tag, index) => (
                            <Tag key={index} name={tag} displayOnly small />
                        ))}
                    </div>
                </div>
                <p className="text-sm text-neutral-600 pt-2">
                    {item.description}
                </p>
            </div>
        </div>
    )
}
