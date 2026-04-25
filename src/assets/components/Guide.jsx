export default function Guide() {
  return (
    <div id="guide" className="flex flex-col gap-4 mt-20 bg-black py-20 px-40">
        <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-6">
                <h2 className="text-3xl font-bold text-white">Quick Start Guide</h2>
                <p className="text-lg text-gray-300 max-w-xl text-left">
                    Welcome to Studious! To find the perfect study spot on campus, simply select your campus from the dropdown menu and click "Browse". You'll be presented with a variety of study locations, each with its own unique atmosphere. Whether you prefer a quiet library, a lively café, or a scenic outdoor area, Studious has got you covered. Happy studying!
                </p>
            </div>
            <div className="flex flex-row items-center gap-10 mt-[-200px] w-100">
                <img src="/src/assets/hero.png" alt="guide step 1" className="w-full h-full object-cover rounded-xl"/>
            </div>
        </div>
    </div>
  )
}