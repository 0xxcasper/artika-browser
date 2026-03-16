export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  return (
    cleanPhone.length >= 7 &&
    cleanPhone.length <= 15 &&
    /^\d+$/.test(cleanPhone)
  );
};
