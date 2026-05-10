import Tag from "./Tag";

export default function GridItem({ image, name, description, tags }) {
    return (
        <div className={`flex w-full min-w-0 flex-col items-center gap-4 rounded-md bg-white p-4 shadow transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-cyan-50 cursor-pointer`}>
            <div className="flex min-w-0 flex-col items-start">
                <div className="flex flex-col gap-2">
                    <div className="w-full overflow-hidden rounded-md aspect-[16/10] bg-neutral-200">
                        <img src={image} alt={name} className="h-full w-full object-cover" />
                    </div>
                    <span className="text-lg font-medium text-neutral-800 break-words">{name}</span>
                    <div className="flex flex-wrap items-center gap-2">
                        {tags.map((tag, index) => (
                            <Tag key={index} name={tag} displayOnly small />
                        ))}
                    </div>
                </div>
                <p className="pt-2 text-sm text-neutral-600 break-words">
                    {description}
                </p>
            </div>
        </div>
    )
}