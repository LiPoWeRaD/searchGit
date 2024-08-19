import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../store/reducers/index'

// используем селекторы в хуках
export const useTypesSelector: TypedUseSelectorHook<RootState> = useSelector