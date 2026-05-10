import ListItem from "./ListItem";

export default function ListView({data}) {
    return (
        <div className="flex flex-col gap-1 w-full animate-[fadeIn_0.5s_ease-in-out_0s_forwards] opacity-0">
            {data.map((item, index) => (
                <ListItem
                    key={index}
                    name={item.name}
                    description={item.description}
                    tags={item.tags}
                />
            ))}
        </div>
    )
}