import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { stationValidation } from './station.validation';
import { StationController } from './station.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(stationValidation.CreateStationValidation),
  StationController.createStation,
);

router.get('/', StationController.getAllStations);
router.get('/:stationId/trains', StationController.getSingleStation);

router.get('/:stationId', StationController.getSingleStation);

export const StationRoutes = router;
