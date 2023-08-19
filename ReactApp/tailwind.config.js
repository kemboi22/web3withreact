/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "media", // or 'media' or 'class'
    theme: {
        fontFamily: {
            display: ["Open Sans", "sans-serif"],
            body: ["Open Sans", "sans-serif"],
        },
        extend: {
            screens: {
                "mf": "990px",
            },
            keyframes: {
                "slide-in": {
                    "0%": {
                        "-webkit-transform": "translateX(120%)",
                        transform: "translateX(120%)",
                    },
                    "100%": {
                        "-webkit-transform": "translateX(0%)",
                        transform: "translateX(0%)",
                    },
                },
            },
            animation: {
                "slide-in": "slide-in 0.5s ease-out",
            },
        },
    },
    variants: {
        extend: {},
    },
    // eslint-disable-next-line no-undef
    plugins: [require("@tailwindcss/forms")],
}

