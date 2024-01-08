import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  currentOrderId: null, 
  serviceIds: []      
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.currentOrderId = action.payload;
    },
    addServiceToOrder: (state, action) => {
      const serviceId = action.payload;
      if (!state.serviceIds.includes(serviceId)) {
        state.serviceIds.push(serviceId);
      } else {
        throw new Error('Услуга уже в корзине');
      }
    },
    clearCart: (state) => {
      state.currentOrderId = null;
      state.serviceIds = [];
    },
    removeServiceFromOrder: (state, action: PayloadAction<number>) => {
      const serviceId = action.payload;
      state.serviceIds = state.serviceIds.filter(id => id !== serviceId);
    },
  }
});

export const { setOrder, addServiceToOrder, clearCart, removeServiceFromOrder } = cartSlice.actions;
export default cartSlice.reducer;
