export const formatPhone = (phone: string) => {
  if (/^7\d{10}$/.test(phone)) {
    return phone.replace(/^7(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($1) $2-$3-$4');
  }

  if (/^375\d{9}$/.test(phone)) {
    return phone.replace(/^375(\d{2})(\d{3})(\d{2})(\d{2})$/, '+375 ($1) $2-$3-$4');
  }

  return `+${phone}`;
};