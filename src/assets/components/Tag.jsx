export default function Tag({ name }) {
    return (
        <div className="flex flex-row items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm cursor-pointer hover:mt-[-5px] transition-all duration-200 hover:bg-blue-100 animate-[fadeIn_1s_ease-in-out_0s_forwards] opacity-0">
            <span className="text-sm text-neutral-800">{name}</span>
        </div>
    )
}