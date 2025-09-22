import { supabase } from "../supabaseClient";

const table = "customers";

export async function findCustomerById(id) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function updateCustomer({ id, cpf }) {
  const currentCustomer = await findCustomerById(id);

  const { data, error } = await supabase
    .from(table)
    .update({ cpf: cpf ?? currentCustomer.cpf })
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}
