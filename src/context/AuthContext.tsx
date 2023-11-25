import { createContext, useEffect, useReducer } from 'react';
import { AuthState, authReducer } from './AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextProps = {
    token: string | null;
    email: string | null
    status: 'checking' | 'authenticated' | 'not-authenticated';
    authenticate: (token: string, email: string) => void;
    logOut: () => void;
    checkTokens: () => void;
};

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    email: null
};

export const AuthContext = createContext( {} as AuthContextProps );

export const AuthProvider = ({ children }: any) => {

    const [ state, dispatch ] = useReducer(authReducer, authInitialState);

    useEffect(() => {
        checkTokens();
    }, []);

    const checkTokens = async () => {
        const token = await AsyncStorage.getItem('session_token');
        const email = await AsyncStorage.getItem('correo');

        if(token && email) {
            authenticate(token, email);
            dispatch({ type: 'authenticate', payload: { token, email } });
            return;
        }
        dispatch({ type: 'logOut' });
    };

    const authenticate = (token: string, email: string) => {
        dispatch({ type: 'authenticate',
            payload: {
                token,
                email
            }
        });
    };

    const logOut = async () => {
        await AsyncStorage.clear();

        dispatch({ type: 'logOut' });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                authenticate,
                logOut,
                checkTokens
            }}
        >
            { children }
        </AuthContext.Provider>
    )
};
