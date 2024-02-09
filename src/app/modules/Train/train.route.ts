import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TrainValidation } from './train.validation';
import { TrainController } from './train.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(TrainValidation.CreateTrainValidation),
  TrainController.createTrain,
);

export const TrainRoutes = router;
