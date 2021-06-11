const sites = [
    {
        id: 'devto',
        api: 'https://dev.to/api/',
    },
    {
        id: 'codenewbie',
        api: 'https://community.codenewbie.org/api',
    }
]

const getUrlsForSite = (name: string) => {
    return sites.find(({ id }) => id === name)
}

export default getUrlsForSite