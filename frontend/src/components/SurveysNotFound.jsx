import { Binoculars } from "lucide-react";

const SurveysNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 space-y-6 max-w-md mx-auto text-center animate-in fade-in duration-700">
            <div className="bg-pink-100 rounded-full p-10 shadow-inner relative group">
                <Binoculars className="size-12 text-pink-500 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 text-2xl animate-bounce">🔍</div>
            </div>
            <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-pink-700">No responses yet! 🎀</h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    We're still waiting for respondents to share their thoughts.
                    Check back soon for sparkly new data! ✨
                </p>
            </div>
        </div>
    );
};
export default SurveysNotFound;
