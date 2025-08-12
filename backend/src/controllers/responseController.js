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
        const { age, gender, occupation, page = 1, limit = 10 } = req.query
        const filter = {}

        if (age) filter.age = Number(age);
        if (gender) filter.gender = gender;
        if (occupation) filter.occupation = { $regex: occupation, $options: 'i' };

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        const responses = await Response.find(filter)
            .skip(skip)
            .limit(limitNum)
            .sort({ createdAt: -1 });

        const total = await Response.countDocuments(filter);
        const totalPages = Math.ceil(total / limitNum);

        res.status(200).json({
            responses,
            pagination: {
                currentPage: pageNum,
                totalPages,
                totalItems: total,
                itemsPerPage: limitNum,
                hasNextPage: pageNum < totalPages,
                hasPrevPage: pageNum > 1
            }
        });
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

export async function deleteResponse(req, res) {
    try {
        const { id } = req.params;

        const response = await Response.findByIdAndDelete(id);

        if (!response) {
            return res.status(404).json({ message: "Response not found" });
        }

        res.status(200).json({ message: "Response deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete response", error: error.message })
    }
}
