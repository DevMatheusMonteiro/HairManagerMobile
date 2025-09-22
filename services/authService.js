import { supabase } from "../supabaseClient.js";
import { createUser } from "./userService.js";

export async function register({
  email,
  password,
  name,
  telephone,
  role = "customer",
  extra,
  address,
}) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  const userId = authData.user?.id;

  if (authError) throw authError;

  const profileData = await createUser({
    id: userId,
    email,
    telephone,
    name,
    role,
    extra,
    address,
  });
  return profileData;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function sendEmail() {
  const { data, error } = await supabase.functions.invoke("sendEmail", {
    method: "POST",
    body: JSON.stringify({
      to: "carlosmathmonteiro@gmail.com",
      subject: "Teste de e-mail",
      html: "<h1>Olá! Este é um teste</h1>",
    }),
  });

  if (error) throw error;

  return data;
}
