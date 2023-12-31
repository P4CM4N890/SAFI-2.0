import { components } from '../types/appTypes';

export interface ActiveComponentState {
    component: components;
};

type ActiveComponentAction = 
    | { type: 'setHomeComponent' }
    | { type: 'setIncomesComponent' }
    | { type: 'setGoalsComponent' }
    | { type: 'setSettingsComponent' }

export const activeComponentReducer = ( state: ActiveComponentState, action: ActiveComponentAction ): ActiveComponentState => {
    switch( action.type ) {
        case 'setHomeComponent': 
            return {
                ...state,
                component: 'HomeScreen'
            }
        case 'setIncomesComponent':
            return {
                ...state,
                component: 'IncomesStackNavigator'
            }
        case 'setGoalsComponent':
            return {
                ...state,
                component: 'GoalsStackNavigator'
            }
        case 'setSettingsComponent':
            return {
                ...state,
                component: 'SettingsStackNavigator'
            }
        default: 
            return state
    }
};