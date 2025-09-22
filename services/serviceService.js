import { supabase } from "../supabaseClient";

const table = "services";

export async function findServiceById(id) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}
