// userSeeder.js
import User from "./models/User.js";

const userSeeder = async () => {
    try {
        await User.create({
            name: "Esther Oo",
            email: "estheroo@gmail.com",
            password: "mamacita123",
        });

        await User.create({
            name: "Rex",
            email: "htookaungmyataung@gmail.com",
            password: "mamacita123",
        });

        console.log("Researcher user seeded.");
        console.log("Maintainer user seeded.");

    } catch (err) {
        console.error("Seeding failed:", err.message);
    }
};

export default userSeeder;
