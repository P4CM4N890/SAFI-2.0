import { createContext, useEffect, useReducer } from 'react';

import { ActiveComponentState, activeComponentReducer } from './ActiveComponentReducer';
import { components } from '../types/appTypes';

type ActiveComponentContextProps = {
    component: components;
    changeActiveComponent: (component: components) => void;
};

const activeComponentInitialState: ActiveComponentState = {
    component: 'HomeScreen'
};

export const ActiveComponentContext = createContext( {} as ActiveComponentContextProps );

export const ActiveComponentProvider = ({ children }: any) => {
    const [ state, dispatch ] = useReducer(activeComponentReducer, activeComponentInitialState);

    useEffect(() => {
        changeActiveComponent('HomeScreen');
    }, []);

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
            }}
        >
            { children }
        </ActiveComponentContext.Provider>
    )
};