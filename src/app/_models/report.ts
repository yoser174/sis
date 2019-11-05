export interface GoodsReceivedData {
    no_catalog: string,
    description: string,
    quantity_in:string,
    storages:string,
    username:string,
    date:string
  }
  export interface GoodsConsumptionData {
    no_catalog: string,
    description: string,
    quantity_out:string,
    storages:string,
    username:string,
    date:string
  }