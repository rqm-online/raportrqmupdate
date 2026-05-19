import { createContext, useContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

// Fake admin session for bypass mode
const FAKE_ADMIN_USER = {
    id: 'bypass-admin-local',
    email: 'admin@rqm.com',
    role: 'admin',
    aud: 'authenticated',
    app_metadata: {},
    user_metadata: { full_name: 'Admin RQM' },
    created_at: new Date().toISOString(),
} as unknown as User;

const FAKE_ADMIN_SESSION = {
    access_token: 'bypass-token',
    refresh_token: 'bypass-refresh',
    expires_in: 999999,
    token_type: 'bearer',
    user: FAKE_ADMIN_USER,
} as unknown as Session;

const AuthContext = createContext<AuthContextType>({
    session: FAKE_ADMIN_SESSION,
    user: FAKE_ADMIN_USER,
    loading: false,
    signOut: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContext.Provider value={{ 
            session: FAKE_ADMIN_SESSION, 
            user: FAKE_ADMIN_USER, 
            loading: false, 
            signOut: async () => { window.location.reload(); } 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
