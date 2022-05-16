export class CarOnSaleResponseDTO {
  public items: any[];
  private page: number;
  private total: number;
  private avereagePercentageOfAuctionProgress: number;

  constructor(data: CarOnSaleResponseDTO) {
    this.items = data["items"];
    this.page = data["page"];
    this.total = data["total"];
    this.avereagePercentageOfAuctionProgress =
      data["avereagePercentageOfAuctionProgress"];
  }

  public getItems(): any[] {
    return this.items;
  }

  public getPage(): number {
    return this.page;
  }

  public getTotal(): number {
    return this.total;
  }

  public getAvereagePercentageOfAuctionProgress(): number {
    return this.avereagePercentageOfAuctionProgress;
  }
}
