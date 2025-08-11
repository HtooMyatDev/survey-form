import Response from "../models/Response.js"

export async function submitResponse(req, res) {

    try {
        await Response.create(req.body);
        res.status(201).json({ message: "Response submitted successfully!" });
    } catch (error) {
        res.status(400).json({
            message: "Error in submitResponse method",
            error: error.message,
        });
    }
}



export async function getFilteredResponses(req, res) {
    try {
        const { age, gender, occupation } = req.query
        const filter = {}

        if (age) filter.age = Number(age);
        if (gender) filter.gender = gender;
        if (occupation) filter.occupation = { $regex: occupation, $options: 'i' };

        const responses = await Response.find(filter);

        res.status(200).json(responses);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch responses", error: error.message })
    }
}

export async function getResponseById(req, res) {
    try {
        const { id } = req.params;
        const response = await Response.findById(id);
        if (!response) {
            return res.status(404).json({ message: "Response not found" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch response", error: error.message });
    }
}
