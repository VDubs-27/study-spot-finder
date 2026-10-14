import Tag from "./Tag"
import { Tooltip, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconArrowsMaximize } from '@tabler/icons-react';

export default function ListItem({ name, description, tags, onClick, onItemSelect }) {
    const theme = useMantineTheme();

    return (
        <div className={`relative flex flex-row items-center gap-4 bg-white p-4 rounded-md shadow hover:bg-cyan-50 cursor-pointer hover:scale-[1.02] ease-in-out duration-300`}>

            <div className="absolute top-2 right-2 z-10">
                <Tooltip label="Expand study spot" withArrow>
                    <ActionIcon
                        size={30}
                        radius="xl"
                        color={theme.black}
                        variant="filled"
                        aria-label="Toggle to grid view"
                        onClick={onClick}
                    >

                        <span className="icon-wrapper transition-transform duration-500">
                            <IconArrowsMaximize size={18} stroke={1.5} className="icon-outlined" />
                        </span>

                    </ActionIcon>
                </Tooltip>
            </div>

            <div onClick={onItemSelect} className="flex flex-col items-start">
                <div className="flex flex-row items-center gap-2">
                    <span className="text-lg font-medium text-neutral-800">{name}</span>
                    <div className="flex flex-row items-center gap-2">
                        {tags.map((tag, index) => (
                            <Tag key={index} name={tag} displayOnly small />
                        ))}
                    </div>
                </div>
                {/* One sentence description */}
                <p className="text-sm text-neutral-600 pt-2">
                    {description}
                </p>
            </div>
        </div>
    )
}