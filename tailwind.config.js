
module.exports = {
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            maxWidth: {
                site: '1280px',
            },
            colors: {
                body: '#08090a',
                'ghost-light-hover': '#eef0f1',
                'button-primary-bg': '#3b49df',
                'button-primary-bg-hover': '#323ebe',
                'button-primary-color': '#f9fafa',
                'button-primary-color-hover': '#f9fafa',
                'footer-bg': '#d2d6db',
                link: '#3b49df',
                'link-gray': 'rgba(8, 9, 10, 0.05)',
            },
            backgroundColor: (theme) => ({
                ...theme('colors'),
                body: '#eef0f1',
            }),
            height: {
                header: '56px',
            },
            borderRadius: {
                devto: '5px',
            },
            boxShadow: {
                header: '0 1px 1px rgba(0, 0, 0, 0.1)',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}