import { CarOnSaleClient } from './services/CarOnSaleClient/classes/CarOnSaleClient';
import CarOnSaleClientService from './services/CarOnSaleClient/classes/CarOnSaleClientService';

export const DependencyIdentifier = {
  LOGGER: "logger",
  CAR_ON_SALE_CLIENT: CarOnSaleClient,
  CAR_ON_SALE_SERVICE: CarOnSaleClientService,
};
