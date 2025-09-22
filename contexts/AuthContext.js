import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { findUserById } from "../services/userService";
import { register, login, logout } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState();

  async function fetchProfile() {
    if (!user) {
      setProfile(null);
      return;
    }
    const data = await findUserById(user.id);
    setProfile(data);
  }

  async function getSession() {
    setLoading(true);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error(error);
      setUser(null);
    } else {
      setUser(data.session?.user ?? null);
    }

    setLoading(false);
  }

  useEffect(() => {
    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    fetchProfile();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ loading, user, profile, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
