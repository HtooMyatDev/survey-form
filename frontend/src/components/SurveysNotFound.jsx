import { Binoculars } from "lucide-react";
import { Link } from "react-router";

const SurveysNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <Binoculars className="size-10" />
      </div>
      <h3 className="text-2xl font-bold">No survey yet</h3>
      <p className="">
        Please wait for the respondents to submit their responses.
      </p>
    </div>
  );
};
export default SurveysNotFound;
