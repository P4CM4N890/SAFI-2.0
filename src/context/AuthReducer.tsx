
export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    email: string | null;
};

type AuthAction = 
    | { type: 'authenticate', payload: { token: string, email: string } }
    | { type: 'logOut' };

export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {
    switch( action.type ) {
        case 'authenticate': 
            return {
                ...state,
                status: 'authenticated',
                token: action.payload.token,
                email: action.payload.email
            }
        case 'logOut':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                email: null
            }
        default: 
            return state
    }
};
