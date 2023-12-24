import morgan from 'morgan'

morgan.token('user-email', (req)=> req.body.email ?? 'Guest')
const customFormat = ':method :url :status :res[content-length] - :response-time ms - User:  :user-email'

export const logger = morgan(customFormat, {stream: process.stdout})
