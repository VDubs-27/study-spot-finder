import GridItem from "./GridItem"

export default function GridView({ data, onItemClick, selection }) {
    if (!selection) return null;

    return (
        <div className="grid w-full min-w-0 grid-cols-1 gap-4 xl:grid-cols-2 animate-[fadeIn_0.5s_ease-in-out_0s_forwards] opacity-0">
            {data.map((item, index) => (
                <GridItem
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
