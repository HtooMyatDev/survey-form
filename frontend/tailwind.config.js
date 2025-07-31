// tailwind.config.js
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: ["daisyui"],
    daisyui: {
        themes: [
            {
                hellokitty: {
                    primary: "#ff69b4",
                    secondary: "#fff0f5",
                    accent: "#ffb6c1",
                    neutral: "#f3f4f6",
                    "base-100": "#ffeef8",
                    info: "#93c5fd",
                    success: "#86efac",
                    warning: "#fde68a",
                    error: "#fca5a5",
                },
            },
        ],
        darkTheme: "hellokitty", // optional
    },
};
