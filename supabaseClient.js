import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SUPABASE_URL = "https://ldggibymiywyjzvpquoc.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkZ2dpYnltaXl3eWp6dnBxdW9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NDY1NjMsImV4cCI6MjA3MjIyMjU2M30.ZjwjC2GCAKfCJD1nlWnJKHAVFVNdaUrVjxPTTcGI05M";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    storage: AsyncStorage,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
