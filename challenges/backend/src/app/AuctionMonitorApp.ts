import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { ILogger } from './services/Logger/interface/ILogger';
import { DependencyIdentifier } from './DependencyIdentifiers';
import CarOnSaleClientService from './services/CarOnSaleClient/classes/CarOnSaleClientService';
import { CustomError } from './services/CarOnSaleClient/Errors/CustomError';

@injectable()
export class AuctionMonitorApp {
  protected app: express.Application;

  public constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    @inject(CarOnSaleClientService)
    private CarOnSaleClientService: CarOnSaleClientService
  ) {
    this.app = express();
  }

  async handleError(
    err: TypeError | CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    let customError = err;

    if (!(err instanceof CustomError)) {
      customError = new CustomError("General Error handling");
    }

    res.status((customError as CustomError).status).send(customError);
  }

  public async start(): Promise<void> {
    const port = process.env.PORT || 3000;
    this.app.post('/auction', async (_req: Request, res: Response) => {
      try {
        const results = await this.CarOnSaleClientService.getRunningAuctions();

        return res.json({ results });
      } catch (error: any) {
        throw new Error(error.message);
      }
    });

    this.app.use(this.handleError);

    this.app.listen(port, () => {
      this.logger.log(`Auction Monitor started on port ${port}`);
    });
    // TODO: Retrieve auctions and display aggregated information (see README.md)
  }
}
