import { Binoculars, Search, Ribbon, Sparkles } from "lucide-react";

const SurveysNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 space-y-6 max-w-md mx-auto text-center animate-in fade-in duration-700">
            <div className="bg-pink-100 rounded-full p-10 shadow-inner relative group">
                <Binoculars className="size-12 text-pink-500 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 text-pink-400 animate-bounce">
                    <Search className="size-6" />
                </div>
            </div>
            <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-pink-700 flex items-center justify-center gap-2">
                    No responses yet! <Ribbon className="size-6 text-pink-400" />
                </h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed flex flex-col items-center gap-1">
                    <span>We're still waiting for respondents to share their thoughts.</span>
                    <span className="flex items-center gap-2">
                        Check back soon for sparkly new data! <Sparkles className="size-4 text-pink-400" />
                    </span>
                </p>
            </div>
        </div>
    );
};
export default SurveysNotFound;
