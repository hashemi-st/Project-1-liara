import mongoose from 'mongoose';
import config from "./config.js";
import Application from './application.js';
import UserControllers from "./controllers/user-controllers.js";
import ValidateService from './services/ValidateService.js';
import FeedbackControllers from './controllers/feedback-controllers.js'
import VoteControllers from './controllers/vote-controllers.js'

async function bootstrap() {
  await mongoose.connect(config.DATABASE_URL);
  console.log('Connected to the database.');

  const app = new Application;

  app.route({
    method: 'post',
    path: '/api/v1/register',
    schema: ValidateService.registerSchema,
    controller: UserControllers.register,
  });

  app.route({
    method: 'post',   
    path: '/api/v1/login',
    controller: UserControllers.login,
  });

  app.route({
    method: 'post',
    path: '/api/v1/forgot-password',
    controller: UserControllers.forgotPassword,
  });

  app.route({
    method: 'post',
    path: '/api/v1/reset-password/:id/:token',
    controller: UserControllers.resetPassword,
  });

  app.route({
    method: 'post',
    path: '/api/v1/add-feedback',
    controller: FeedbackControllers.addFeedback,
    schema: ValidateService.feedbackSchema,
    auth:true,
  });

  app.route({
    method: 'get',
    path: '/api/v1/feedbacks',
    controller: FeedbackControllers.getFeedback,
  });

  app.route({
    method: 'post',
    path: '/api/v1/upload-image',
    controller: FeedbackControllers.upload,
    auth:true,
    uploadFile: true
  });

  app.route({
    method: 'post',
    path: '/api/v1/add-vote',
    controller: VoteControllers.addVote,
    schema: ValidateService.voteSchema,
    auth:true,  
  });

  await app.listen();
}

bootstrap();
