import { useParams } from 'react-router';

export const useCurrentLang = (): string => {
  const { lang } = useParams<{ lang?: string }>();
  return lang || 'en';
};
