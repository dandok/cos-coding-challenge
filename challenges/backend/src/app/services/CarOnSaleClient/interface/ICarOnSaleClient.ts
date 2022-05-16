import { CarOnSaleResponseDTO } from '../../../DTO/CarOnSaleResponse.dto';

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {
  getRunningAuctions(): Promise<CarOnSaleResponseDTO> /* TODO: Introduce a type */;
}
