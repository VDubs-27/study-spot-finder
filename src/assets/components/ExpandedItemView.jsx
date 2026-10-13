import Tag from "./Tag";

export default function ExpandedItemView({ item, onClose }) {
    return (
        <div 
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-[fadeIn_0.2s_ease-in-out]"
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className="relative flex w-full max-w-2xl min-w-0 flex-col items-center gap-4 rounded-md bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto"
            >
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 text-xl font-bold p-2"
                >
                    ✕
                </button>

                <div className="flex min-w-0 w-full flex-col items-start">
                    <div className="flex flex-col gap-2 w-full">
                        <div className="w-full overflow-hidden rounded-md aspect-[16/10] bg-neutral-200">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <span className="text-xl font-semibold text-neutral-800 break-words mt-2">{item.name}</span>
                        <div className="flex flex-wrap items-center gap-2">
                            {item.tags.map((tag, index) => (
                                <Tag key={index} name={tag} displayOnly small />
                            ))}
                        </div>
                    </div>
                    <p className="pt-4 text-base text-neutral-600 break-words border-t border-neutral-100 mt-4 w-full">
                        {item.description}
                    </p>
                </div>
            </div>
        </div>
    )
}
