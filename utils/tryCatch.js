import boom from '@hapi/boom'

const tryCatch = (controller) => async(req,res,next) => {
    try{
      await controller(req,res)
    } catch(error) {
      return next(error)
      // next(boom.boomify(error))
    }
}
export default tryCatch 