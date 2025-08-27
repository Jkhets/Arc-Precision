import { supabase } from '../supabase';

export const saveEnquiry = async ({ name, email, message }) => {
  const { data, error } = await supabase
    .from('enquiries')
    .insert([{ name, email, message }]);

  if (error) {
    console.error('Error saving enquiry:', error);
    return { error };
  }

  return { data };
};
