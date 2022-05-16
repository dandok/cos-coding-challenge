import { injectable } from 'inversify';
import { CarOnSaleResponseDTO } from '../../../DTO/CarOnSaleResponse.dto';
import { CarOnSaleClient } from './CarOnSaleClient';

@injectable()
export class CarOnSaleClientService {
  constructor(private readonly carOnSaleClient: CarOnSaleClient) {}

  async getRunningAuctions() {
    const result = await this.carOnSaleClient.getRunningAuctions();
    const auctions = await this.finalResult(result);

    return auctions;
  }

  private async finalResult(result: any): Promise<CarOnSaleResponseDTO[]> {
    let runningAuctions = await Promise.all(
      result["items"].map(async (auction: any) => {
        const avereagePercentageOfAuctionProgress =
          (auction.currentHighestBidValue * 100) / auction.minimumRequiredAsk;

        const auctions = {
          ...auction,
          avereagePercentageOfAuctionProgress:
            Math.round(
              (avereagePercentageOfAuctionProgress + Number.EPSILON) * 100
            ) / 100,
        };

        return auctions;
      })
    );

    let finalResult = {
      runningAuctions,
      page: result["page"],
      total: result["total"],
    } as unknown as CarOnSaleResponseDTO[];

    return finalResult;
  }
}

export default CarOnSaleClientService;
