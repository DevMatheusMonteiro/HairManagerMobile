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

export async function findAppointmentsByCustomer({
  customer_id,
  status = "requested",
}) {
  const { data, error } = await supabase
    .from("appointments")
    .select(
      `
      *,
      customers(*),        
      businesses(*),       
      professionals(*),    
      services(*)          
    `
    )
    .eq("customer_id", customer_id)
    .eq("status", status)
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
}
export async function findAppointmentsByBusiness({
  business_id,
  status = "requested",
}) {
  const { data, error } = await supabase
    .from("appointments")
    .select(
      `
      *,
      customers(*),        
      businesses(*),       
      professionals(*),    
      services(*)          
    `
    )
    .eq("business_id", business_id)
    .eq("status", status)
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateAppointmentStatus(appointmentId, status) {
  const { data, error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", appointmentId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
