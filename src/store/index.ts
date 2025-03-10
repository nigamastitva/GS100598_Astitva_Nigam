import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { Store, SKU, PlanningData, Week } from "../types";

interface AppState {
  stores: Store[];
  skus: SKU[];
  planningData: PlanningData[];
  weeks: Week[];
}

const initialState: AppState = {
  stores: [
    {
      id: "1",
      name: "Downtown Store",
      city: "New York",
      state: "New York",
      order: 0,
    },
    {
      id: "2",
      name: "Mall Location",
      city: "Los Angeles",
      state: "California",
      order: 1,
    },
    {
      id: "3",
      name: "Suburban Store",
      city: "Chicago",
      state: "Illinois",
      order: 2,
    },
    { id: "4", name: "Airport Shop", city: "Dallas", state: "Texas", order: 3 },
    {
      id: "5",
      name: "Outlet Center",
      city: "Miami",
      state: "Florida",
      order: 4,
    },
  ],

  skus: [
    {
      id: "1",
      name: "Premium T-Shirt",
      price: 29.99,
      cost: 12.5,
      class: "Apparel",
      department: "Clothing",
    },
    {
      id: "2",
      name: "Designer Jeans",
      price: 89.99,
      cost: 35.0,
      class: "Denim",
      department: "Clothing",
    },
    {
      id: "3",
      name: "Leather Wallet",
      price: 49.99,
      cost: 20.0,
      class: "Accessories",
      department: "Fashion",
    },
    {
      id: "4",
      name: "Running Shoes",
      price: 119.99,
      cost: 45.0,
      class: "Footwear",
      department: "Sportswear",
    },
    {
      id: "5",
      name: "Casual Watch",
      price: 79.99,
      cost: 30.0,
      class: "Watches",
      department: "Accessories",
    },
    {
      id: "6",
      name: "Sunglasses",
      price: 159.99,
      cost: 55.0,
      class: "Eyewear",
      department: "Accessories",
    },
  ],
  weeks: [
    {
      id: "w1",
      weekNumber: 1,
      month: "January",
      startDate: "2025-01-01",
      endDate: "2025-01-07",
    },
    {
      id: "w2",
      weekNumber: 2,
      month: "January",
      startDate: "2025-01-08",
      endDate: "2025-01-14",
    },
    {
      id: "w3",
      weekNumber: 3,
      month: "January",
      startDate: "2025-01-15",
      endDate: "2025-01-21",
    },
    {
      id: "w4",
      weekNumber: 4,
      month: "January",
      startDate: "2025-01-22",
      endDate: "2025-01-28",
    },
    {
      id: "w5",
      weekNumber: 5,
      month: "February",
      startDate: "2025-01-29",
      endDate: "2025-02-04",
    },
    {
      id: "w6",
      weekNumber: 6,
      month: "February",
      startDate: "2025-02-05",
      endDate: "2025-02-11",
    },
    {
      id: "w7",
      weekNumber: 7,
      month: "February",
      startDate: "2025-02-12",
      endDate: "2025-02-18",
    },
    {
      id: "w8",
      weekNumber: 8,
      month: "February",
      startDate: "2025-02-19",
      endDate: "2025-02-25",
    },
    {
      id: "w9",
      weekNumber: 9,
      month: "March",
      startDate: "2025-02-26",
      endDate: "2025-03-04",
    },
    {
      id: "w10",
      weekNumber: 10,
      month: "March",
      startDate: "2025-03-05",
      endDate: "2025-03-11",
    },
    {
      id: "w11",
      weekNumber: 11,
      month: "March",
      startDate: "2025-03-12",
      endDate: "2025-03-18",
    },
    {
      id: "w12",
      weekNumber: 12,
      month: "March",
      startDate: "2025-03-19",
      endDate: "2025-03-25",
    },
  ],
  planningData: [
    // Downtown Store - Premium T-Shirt (Steady growth)
    {
      storeId: "1",
      skuId: "1",
      weekId: "w1",
      salesUnits: 45,
      salesDollars: 1349.55,
      gmDollars: 787.05,
      gmPercentage: 0.58,
    },
    {
      storeId: "1",
      skuId: "1",
      weekId: "w2",
      salesUnits: 52,
      salesDollars: 1559.48,
      gmDollars: 910.48,
      gmPercentage: 0.58,
    },
    {
      storeId: "1",
      skuId: "1",
      weekId: "w3",
      salesUnits: 58,
      salesDollars: 1739.42,
      gmDollars: 1015.42,
      gmPercentage: 0.58,
    },
    {
      storeId: "1",
      skuId: "1",
      weekId: "w4",
      salesUnits: 65,
      salesDollars: 1949.35,
      gmDollars: 1137.85,
      gmPercentage: 0.58,
    },

    // Mall Location - Designer Jeans (Holiday spike)
    {
      storeId: "2",
      skuId: "2",
      weekId: "w1",
      salesUnits: 30,
      salesDollars: 2699.7,
      gmDollars: 1649.7,
      gmPercentage: 0.61,
    },
    {
      storeId: "2",
      skuId: "2",
      weekId: "w2",
      salesUnits: 45,
      salesDollars: 4049.55,
      gmDollars: 2474.55,
      gmPercentage: 0.61,
    },
    {
      storeId: "2",
      skuId: "2",
      weekId: "w3",
      salesUnits: 35,
      salesDollars: 3149.65,
      gmDollars: 1924.65,
      gmPercentage: 0.61,
    },
    {
      storeId: "2",
      skuId: "2",
      weekId: "w4",
      salesUnits: 28,
      salesDollars: 2519.72,
      gmDollars: 1539.72,
      gmPercentage: 0.61,
    },

    // Suburban Store - Running Shoes (Weekend peaks)
    {
      storeId: "3",
      skuId: "4",
      weekId: "w1",
      salesUnits: 15,
      salesDollars: 1799.85,
      gmDollars: 1124.85,
      gmPercentage: 0.62,
    },
    {
      storeId: "3",
      skuId: "4",
      weekId: "w2",
      salesUnits: 25,
      salesDollars: 2999.75,
      gmDollars: 1874.75,
      gmPercentage: 0.62,
    },
    {
      storeId: "3",
      skuId: "4",
      weekId: "w3",
      salesUnits: 18,
      salesDollars: 2159.82,
      gmDollars: 1349.82,
      gmPercentage: 0.62,
    },
    {
      storeId: "3",
      skuId: "4",
      weekId: "w4",
      salesUnits: 28,
      salesDollars: 3359.72,
      gmDollars: 2099.72,
      gmPercentage: 0.62,
    },

    // Airport Shop - Sunglasses (Tourist season)
    {
      storeId: "4",
      skuId: "6",
      weekId: "w1",
      salesUnits: 20,
      salesDollars: 3199.8,
      gmDollars: 2099.8,
      gmPercentage: 0.65,
    },
    {
      storeId: "4",
      skuId: "6",
      weekId: "w2",
      salesUnits: 35,
      salesDollars: 5599.65,
      gmDollars: 3674.65,
      gmPercentage: 0.65,
    },
    {
      storeId: "4",
      skuId: "6",
      weekId: "w3",
      salesUnits: 42,
      salesDollars: 6719.58,
      gmDollars: 4409.58,
      gmPercentage: 0.65,
    },
    {
      storeId: "4",
      skuId: "6",
      weekId: "w4",
      salesUnits: 38,
      salesDollars: 6079.62,
      gmDollars: 3989.62,
      gmPercentage: 0.65,
    },

    // Outlet Center - Casual Watch (Clearance pattern)
    {
      storeId: "5",
      skuId: "5",
      weekId: "w1",
      salesUnits: 30,
      salesDollars: 2399.7,
      gmDollars: 1499.7,
      gmPercentage: 0.62,
    },
    {
      storeId: "5",
      skuId: "5",
      weekId: "w2",
      salesUnits: 45,
      salesDollars: 3599.55,
      gmDollars: 2249.55,
      gmPercentage: 0.62,
    },
    {
      storeId: "5",
      skuId: "5",
      weekId: "w3",
      salesUnits: 55,
      salesDollars: 4399.45,
      gmDollars: 2749.45,
      gmPercentage: 0.62,
    },
    {
      storeId: "5",
      skuId: "5",
      weekId: "w4",
      salesUnits: 40,
      salesDollars: 3199.6,
      gmDollars: 1999.6,
      gmPercentage: 0.62,
    },

    // Extended data for trend analysis
    {
      storeId: "1",
      skuId: "1",
      weekId: "w5",
      salesUnits: 70,
      salesDollars: 2099.3,
      gmDollars: 1224.3,
      gmPercentage: 0.58,
    },
    {
      storeId: "1",
      skuId: "1",
      weekId: "w6",
      salesUnits: 75,
      salesDollars: 2249.25,
      gmDollars: 1311.75,
      gmPercentage: 0.58,
    },
    {
      storeId: "2",
      skuId: "2",
      weekId: "w5",
      salesUnits: 32,
      salesDollars: 2879.68,
      gmDollars: 1759.68,
      gmPercentage: 0.61,
    },
    {
      storeId: "2",
      skuId: "2",
      weekId: "w6",
      salesUnits: 38,
      salesDollars: 3419.62,
      gmDollars: 2089.62,
      gmPercentage: 0.61,
    },
    {
      storeId: "3",
      skuId: "4",
      weekId: "w5",
      salesUnits: 30,
      salesDollars: 3599.7,
      gmDollars: 2249.7,
      gmPercentage: 0.62,
    },
    {
      storeId: "3",
      skuId: "4",
      weekId: "w6",
      salesUnits: 35,
      salesDollars: 4199.65,
      gmDollars: 2624.65,
      gmPercentage: 0.62,
    },

    // March data for seasonal analysis
    {
      storeId: "4",
      skuId: "6",
      weekId: "w9",
      salesUnits: 45,
      salesDollars: 7199.55,
      gmDollars: 4724.55,
      gmPercentage: 0.65,
    },
    {
      storeId: "4",
      skuId: "6",
      weekId: "w10",
      salesUnits: 50,
      salesDollars: 7999.5,
      gmDollars: 5249.5,
      gmPercentage: 0.65,
    },
    {
      storeId: "5",
      skuId: "5",
      weekId: "w11",
      salesUnits: 35,
      salesDollars: 2799.65,
      gmDollars: 1749.65,
      gmPercentage: 0.62,
    },
    {
      storeId: "5",
      skuId: "5",
      weekId: "w12",
      salesUnits: 42,
      salesDollars: 3359.58,
      gmDollars: 2099.58,
      gmPercentage: 0.62,
    },
  ],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setStores: (state, action: PayloadAction<Store[]>) => {
      state.stores = action.payload;
    },
    setSKUs: (state, action: PayloadAction<SKU[]>) => {
      state.skus = action.payload;
    },
    setPlanningData: (state, action: PayloadAction<PlanningData[]>) => {
      state.planningData = action.payload;
    },
    setWeeks: (state, action: PayloadAction<Week[]>) => {
      state.weeks = action.payload;
    },
    addStore: (state, action: PayloadAction<Store>) => {
      state.stores.push(action.payload);
    },
    updateStore: (state, action: PayloadAction<Store>) => {
      const index = state.stores.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.stores[index] = action.payload;
      }
    },
    removeStore: (state, action: PayloadAction<string>) => {
      state.stores = state.stores.filter((s) => s.id !== action.payload);
    },
    addSKU: (state, action: PayloadAction<SKU>) => {
      state.skus.push(action.payload);
    },
    updateSKU: (state, action: PayloadAction<SKU>) => {
      const index = state.skus.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.skus[index] = action.payload;
      }
    },
    removeSKU: (state, action: PayloadAction<string>) => {
      state.skus = state.skus.filter((s) => s.id !== action.payload);
    },
  },
});

export const {
  setStores,
  setSKUs,
  setPlanningData,
  setWeeks,
  addStore,
  updateStore,
  removeStore,
  addSKU,
  updateSKU,
  removeSKU,
} = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
