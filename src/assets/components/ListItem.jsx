import Tag from "./Tag"

export default function ListItem({ name, description, tags }) {
    return (
        <div className={`flex flex-row items-center gap-4 bg-white p-4 rounded-md shadow hover:bg-cyan-50 cursor-pointer hover:scale-[1.02] ease-in-out duration-300`}>
            <div className="flex flex-col items-start">
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