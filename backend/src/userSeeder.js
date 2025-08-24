// userSeeder.js
import User from "./models/User.js";
import bcrypt from "bcrypt";

const userSeeder = async () => {
    try {
        // Check if users already exist to avoid duplicates
        const existingUsers = await User.find({});
        if (existingUsers.length > 0) {
            console.log("Users already exist, skipping seeder.");
            return;
        }

        // Create admin/researcher user
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const adminName = process.env.ADMIN_NAME || "Admin User";

        if (!adminEmail || !adminPassword) {
            console.log("Admin credentials not found in environment variables. Skipping admin creation.");
        } else {
            // Hash password before storing
            const hashedAdminPassword = await bcrypt.hash(adminPassword, 12);

            await User.create({
                name: adminName,
                email: adminEmail,
                password: hashedAdminPassword,
                role: "admin" // assuming you have roles
            });
            console.log(`Admin user created: ${adminEmail}`);
        }

        // Create test user (only in development)
        if (process.env.NODE_ENV === "development") {
            const testEmail = process.env.TEST_USER_EMAIL || "test@example.com";
            const testPassword = process.env.TEST_USER_PASSWORD || "testpassword123";
            const testName = process.env.TEST_USER_NAME || "Test User";

            const hashedTestPassword = await bcrypt.hash(testPassword, 12);

            await User.create({
                name: testName,
                email: testEmail,
                password: hashedTestPassword,
                role: "participant"
            });
            console.log(`Test user created: ${testEmail}`);
        }

        console.log("User seeding completed successfully.");

    } catch (err) {
        console.error("Seeding failed:", err.message);

        // Handle duplicate key errors
        if (err.code === 11000) {
            console.log("Some users already exist, continuing...");
        }
    }
};

export default userSeeder;
