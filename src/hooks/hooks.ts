// hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store.ts'; 

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const useSelectedService = () => useAppSelector(state => state.service.selectedService);


export const useCurrentOrder = () => useAppSelector(state => state.order.currentOrder);
