import ListItem from "./ListItem";

export default function ListView({ data, onItemClick, selection }) {
    if (!selection) return null;

    return (
        <div className="flex flex-col gap-1 w-full animate-[fadeIn_0.5s_ease-in-out_0s_forwards] opacity-0">
            {data.map((item, index) => (
                <ListItem
                    key={index}
                    item={item}
                    isCurrentItem={!!(selection.current && selection.current.name === item.name)}
                    onClick={() => onItemClick(item)}
                    onItemSelect={() => selection.select(item)}
                    onItemUnselect={() => selection.unselect()}
                />
            ))}
        </div>
    )
}
