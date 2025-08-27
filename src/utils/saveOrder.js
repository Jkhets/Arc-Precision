import { supabase } from '../supabase';

export const saveOrder = async ({ cartItems, total, shippingAddress, userEmail }) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        user_email: userEmail,
        items: cartItems,
        total_value: total,
        status: 'pending',
        shipping_address: `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postcode}`,
      },
    ]);

  if (error) {
    console.error('Error saving order:', error);
    return { error };
  }

  return { data };
};
