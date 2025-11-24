import { useNavigate } from 'react-router';
import { useCurrentLang } from './useCurrentLang';

export const useLangNavigate = () => {
  const navigate = useNavigate();
  const lang = useCurrentLang();

  return (path: string) => {
    const clean = path.replace(/^\/+/, '');
    navigate(`/${lang}/${clean}`);
  };
};
