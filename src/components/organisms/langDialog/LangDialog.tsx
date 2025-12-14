import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client/react';
import { DialogActions, DialogContent, MenuItem } from '@mui/material';
import {
  type Proficiency,
  type LanguageProficiency,
  type Language,
} from 'cv-graphql';
import { proficiencyOptions } from './constants';
import { LANGUAGES } from '../../../graphql/profileLanguages/queries';
import { StyledButton } from '../../atoms/styledButton';
import { BaseDialog } from '../../molecules/baseDialog';
import { SelectInput } from '../../molecules/selectInput';

interface LangDialogProps {
  mode: 'add' | 'update';
  initialLang?: LanguageProficiency | null;
  existingLangs: LanguageProficiency[];
  open: boolean;
  onClose?: () => void;
  onConfirm: (name: string, proficiency: Proficiency) => void;
}

export const LangDialog = ({
  mode,
  initialLang,
  existingLangs,
  open,
  onClose,
  onConfirm,
}: LangDialogProps) => {
  const { t } = useTranslation();

  const [lang, setLang] = useState<string | null>(null);
  const [proficiency, setProficiency] = useState<Proficiency>(
    'A1' as Proficiency,
  );

  const { data: languagesData } = useQuery<{ languages: Language[] }>(
    LANGUAGES,
  );

  const filteredLangs = useMemo(() => {
    const excludedNames = existingLangs
      .filter((l) => l.name !== initialLang?.name)
      .map((l) => l.name);

    return (
      languagesData?.languages.filter((l) => !excludedNames.includes(l.name)) ??
      []
    );
  }, [languagesData?.languages, existingLangs, initialLang?.name]);

  useEffect(() => {
    if (!open) return;

    if (mode === 'update' && initialLang) {
      const existingLang =
        languagesData?.languages.find((l) => l.name === initialLang.name) ??
        null;
      setLang(existingLang?.name ?? null);
      setProficiency(initialLang.proficiency);
    } else {
      setLang(null);
      setProficiency('A1' as Proficiency);
    }
  }, [open, mode, initialLang?.name, languagesData?.languages]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!lang) return;
    onConfirm(lang, proficiency);
    onClose?.();
  };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={
        mode === 'add'
          ? t('languages.addLanguageModalTitle')
          : t('languages.updateLanguageModalTitle')
      }
    >
      <DialogContent>
        <SelectInput
          disabled={mode === 'update'}
          value={lang}
          onChange={setLang}
          label={t('languages.language')}
        >
          {filteredLangs.map((option) => (
            <MenuItem value={option.name} key={option.name}>
              {t(`${option.name}`)}
            </MenuItem>
          ))}
        </SelectInput>
        <SelectInput
          disabled={!lang}
          value={proficiency}
          onChange={setProficiency}
          label={t('languages.languageProficiency')}
        >
          {proficiencyOptions.map((option: string) => (
            <MenuItem value={option} key={option}>
              {t(`${option}`)}
            </MenuItem>
          ))}
        </SelectInput>
      </DialogContent>

      <DialogActions
        sx={(theme) => {
          return {
            [theme.breakpoints.down('sm')]: {
              flexWrap: 'wrap',
              gap: '10px',
            },
          };
        }}
      >
        <StyledButton onClick={onClose} variant="outlined">
          {t('languages.cancelBtn')}
        </StyledButton>
        <StyledButton
          type="submit"
          disabled={
            !lang || !proficiency || initialLang?.proficiency === proficiency
          }
          variant="contained"
          color="primary"
        >
          {t('languages.confirmBtn')}
        </StyledButton>
      </DialogActions>
    </BaseDialog>
  );
};
