import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { Store, SKU, PlanningData, Week } from '../types';

interface AppState {
  stores: Store[];
  skus: SKU[];
  planningData: PlanningData[];
  weeks: Week[];
}

const initialState: AppState = {
  stores: [],
  skus: [],
  planningData: [],
  weeks: [],
};

const appSlice = createSlice({
  name: 'app',
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