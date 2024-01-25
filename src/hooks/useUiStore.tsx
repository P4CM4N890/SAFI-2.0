import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setActiveComponent, setBarVisibility } from "../store/ui/uiSlice";
import { components } from "../types/appTypes";

export const useUiStore = () => {
    const dispatch = useAppDispatch();
    const { activeComponent, isBottomTabShown } = useAppSelector(state => state.ui);

    const changeActiveComponent = (component: components) => {
        dispatch( setActiveComponent(component) );
    };

    const changeBarVisibility = (isShown: boolean) => {
        dispatch( setBarVisibility(isShown) );
    };

    return {
        activeComponent,
        isBottomTabShown,

        changeActiveComponent,
        changeBarVisibility,
    }
};
