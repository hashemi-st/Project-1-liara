import morgan from 'morgan'

morgan.token('userDetails', (req) => {
    const user = req.user ? req.user.aud : 'Guest'

    if(req.path === '/api/v1/login'){
        return `User: ${req.body.aud}` 
    } else {
        return `User: ${user}`
    }     
})

const customFormat = 'Method: :method - URL: :url - Status: :status :res[content-length] - Response-time: :response-time ms - :userDetails'

export const logger = morgan(customFormat, {stream: process.stdout})

