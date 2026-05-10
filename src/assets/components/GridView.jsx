import GridItem from "./GridItem"

export default function GridView({ data }) {
    return (
        <div className="grid w-full min-w-0 grid-cols-1 gap-4 xl:grid-cols-2 animate-[fadeIn_0.5s_ease-in-out_0s_forwards] opacity-0">
            {data.map((item, index) => (
                <GridItem
                    key={index}
                    image={item.image}
                    name={item.name}
                    description={item.description}
                    tags={item.tags}
                />
            ))}
        </div>
    )
}