import en from './en';
import vi from './vi';

const dictionaries = {
  en,
  vi,
};

export const getDictionary = async (locale: string) => {
  return dictionaries[locale as keyof typeof dictionaries] ?? dictionaries.en;
}; 