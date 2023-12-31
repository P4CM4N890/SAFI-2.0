import { createContext, useEffect, useReducer, useState } from 'react';

import { ActiveComponentState, activeComponentReducer } from './ActiveComponentReducer';
import { components } from '../types/appTypes';

type ActiveComponentContextProps = {
    component: components;
    showTabBar: boolean;
    changeTabBarVisibility: (visibility: boolean) => void;
    changeActiveComponent: (component: components) => void;
};

const activeComponentInitialState: ActiveComponentState = {
    component: 'HomeScreen'
};

export const ActiveComponentContext = createContext( {} as ActiveComponentContextProps );

export const ActiveComponentProvider = ({ children }: any) => {
    const [ state, dispatch ] = useReducer(activeComponentReducer, activeComponentInitialState);
    const [ showTabBar, setShowTabBar ] = useState<boolean>(true);

    useEffect(() => {
        changeActiveComponent('HomeScreen');
        changeTabBarVisibility(true);
    }, []);

    const changeTabBarVisibility = (visibility: boolean) => {
        setShowTabBar(visibility);
    };

    const changeActiveComponent = (component: components) => {
        if(component === 'HomeScreen') 
            dispatch({ type: 'setHomeComponent' });
        
        else if(component === 'GoalsStackNavigator') 
            dispatch({ type: 'setGoalsComponent' });

        else if(component === 'IncomesStackNavigator') 
            dispatch({ type: 'setIncomesComponent' });
        
        else if(component === 'SettingsStackNavigator') 
            dispatch({ type: 'setSettingsComponent' });
    }

    return (
        <ActiveComponentContext.Provider
            value={{
                ...state,
                changeActiveComponent,
                changeTabBarVisibility,
                showTabBar
            }}
        >
            { children }
        </ActiveComponentContext.Provider>
    )
};