// userSeeder.js
import User from "./models/User.js";

const userSeeder = async () => {
    try {
        // const existing = await User.findOne({ email: "researcher@example.com" });
        // if (existing) {
        //     console.log("Researcher user already exists.");
        //     return;
        // }

        await User.create({
            name: "Esther Oo",
            email: "estheroo@gmail.com",
            password: "hxwm@91022",
        });

        await User.create({
            name: "Rex",
            email: "htookaungmyataung@gmail.com",
            password: "hxwm@91022",
        });

        console.log("Researcher user seeded.");
        console.log("Maintainer user seeded.");

    } catch (err) {
        console.error("Seeding failed:", err.message);
    }
};

export default userSeeder;
