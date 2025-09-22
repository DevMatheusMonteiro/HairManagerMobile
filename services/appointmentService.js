import { supabase } from "../supabaseClient";

export async function createAppointment({
  business_id,
  professional_id,
  customer_id,
  service_id,
  date,
}) {
  const { data, error } = await supabase
    .from("appointments")
    .insert([
      {
        business_id,
        professional_id,
        customer_id,
        service_id,
        date,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}
