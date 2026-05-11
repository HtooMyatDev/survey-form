import cron from 'node-cron';
import axios from 'axios';

/**
 * Initializes cron jobs to keep the backend and database alive.
 * Especially useful for free-tier deployments (like Render, Fly.io, or MongoDB Atlas)
 * that might go to sleep after inactivity.
 */
export const initCronJobs = () => {
    console.log('🎀 Initializing keep-alive cron jobs...');

    // Ping the health endpoint every 14 minutes
    // (Render free tier sleeps after 15 mins of inactivity)
    cron.schedule('*/14 * * * *', async () => {
        try {
            const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5002}`;
            const response = await axios.get(`${baseUrl}/api/health`);
            console.log(`[Cron] Keep-alive ping successful: ${response.data.status} at ${new Date().toISOString()}`);
        } catch (error) {
            console.error(`[Cron] Keep-alive ping failed: ${error.message}`);
        }
    });

    // Optional: Add a database-specific ping if needed
    // cron.schedule('0 * * * *', () => { ... });
};
