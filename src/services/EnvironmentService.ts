
// Backend API host and port const for API call service usage.
export const baseURL: string = setURL();

// Retrieve backend API host and port based on environment variable preference.
// Default value is set to 127.0.0.1:8080
function setURL(): string {
    // Switch in case another host is wanted.
    switch(process.env.NODE_ENV) {
        case "development":
            return 'http://localhost:8080'
        default:
            return 'http://localhost:8080'
    }
}