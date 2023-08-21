import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MetasScreen } from '../screens/MetasScreen';
import { VerMetasScreen } from '../screens/VerMetasScreen';
import { CreateMeta } from '../screens/CRUDMetas/CreateMeta';
import { EditMeta } from '../screens/CRUDMetas/EditMeta';
import { AbonarMeta } from '../screens/CRUDMetas/AbonarMeta';
import { PutMeta } from '../screens/CRUDMetas/PutMeta';

export type RootStackParams = {
    MetasScreen: undefined,
    VerMetasScreen: undefined,
    CreateMeta: undefined,
    EditMeta: { id: number, nombre: string, fecha: string, dinero: number, objetivo: number },
    AbonarMeta: undefined,
    PutMeta: { id: number, nombre: string, fecha: string, dinero: number, objetivo: number },
} 

const MetasStack = createStackNavigator<RootStackParams>();

export const MetasStackNavigator = () => {
    return (
        <MetasStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='MetasScreen'
        >
            <MetasStack.Screen 
                name="MetasScreen" 
                options={{title: "Metas General"}} 
                component={ MetasScreen }
            />
            <MetasStack.Screen 
                name="VerMetasScreen" 
                options={{title: "Ver metas"}} 
                component={ VerMetasScreen }
            />
            <MetasStack.Screen 
                name="CreateMeta"
                options={{title: 'Crear meta'}}
                component={ CreateMeta }
            />
            <MetasStack.Screen
                name="EditMeta"
                options={{title: 'Editar meta'}}
                component={ EditMeta }
            />
            <MetasStack.Screen
                name="AbonarMeta"
                options={{title: 'Abonar meta'}}
                component={ AbonarMeta }    
            />
            <MetasStack.Screen
                name="PutMeta"
                options={{title: 'Abonar a meta'}}
                component={ PutMeta }    
            />
            
        </MetasStack.Navigator>
    );
};
