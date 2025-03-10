export interface Store {
  id: string;
  name: string;
  order: number;
  city: string;
  state: string;
}

export interface SKU {
  id: string;
  name: string;
  price: number;
  cost: number;
  class: string;
  department: string;
}

export interface PlanningData {
  storeId: string;
  skuId: string;
  weekId: string;
  salesUnits: number;
  salesDollars: number;
  gmDollars: number;
  gmPercentage: number;
}

export interface Week {
  id: string;
  weekNumber: number;
  month: string;
  startDate: string;
  endDate: string;
}
