import axios from 'axios';
import { injectable } from 'inversify';
import { CarOnSaleResponseDTO } from '../../../DTO/CarOnSaleResponse.dto';
import { ICarOnSaleClient } from '../interface/ICarOnSaleClient';
require('dotenv').config();

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
  constructor() {}

  private base_url = process.env.BASE_URL;

  async getRunningAuctions(): Promise<CarOnSaleResponseDTO> {
    try {
      const headers = await this.headers();
      if (!headers) throw new Error("Missing required headers");

      const url = `${this.base_url}/v2/auction/buyer/`;
      const { data } = await axios.get(url, headers);

      return data as CarOnSaleResponseDTO;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  private async getAuthToken() {
    
    const url = `${this.base_url}/v1/authentication/buyer-challenge@caronsale.de`;
    const body = {
      password: "Test123.", 
      meta: "dok", 
    };
    const { data } = await axios.put(url, body);

    return data;
  }

  private async headers() {
    const auth = await this.getAuthToken();
    if (!auth) throw new Error("Authentication required");
    const authToken = auth.token;

    return {
      headers: {
        userid: "buyer-challenge@caronsale.de",
        authToken,
      },
    };
  }
}
