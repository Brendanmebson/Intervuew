import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Mock users for MVP
const MOCK_USERS = {
  'recruiter@acme.com': { id: 'org1', role: 'organization', name: 'Sarah Chen', company: 'Acme Corp', password: 'password' },
  'candidate@email.com': { id: 'cand1', role: 'prepper', name: 'Alex Johnson', password: 'password' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password, role) => {
    // Mock auth for MVP
    const found = MOCK_USERS[email];
    if (found && found.password === password) {
      setUser(found);
      return { success: true, user: found };
    }
    // Allow any login for demo
    const demoUser = {
      id: Date.now().toString(),
      role,
      name: email.split('@')[0],
      email,
      company: role === 'organization' ? 'Demo Corp' : null,
    };
    setUser(demoUser);
    return { success: true, user: demoUser };
  };

  const register = (data) => {
    const newUser = {
      id: Date.now().toString(),
      role: data.role,
      name: data.name,
      email: data.email,
      company: data.company || null,
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
