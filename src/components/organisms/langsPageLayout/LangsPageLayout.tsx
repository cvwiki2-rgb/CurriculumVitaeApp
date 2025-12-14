import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteForever, Add as AddIcon } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import { StyledButton } from '../../atoms/styledButton';
import { LangItem } from '../../molecules/langItem';
import { LangsList } from '../../molecules/langsList';
import { LangDialog } from '../langDialog';
import type { LanguageProficiency, Proficiency } from 'cv-graphql';

interface LangsPageLayoutProps {
  languages: LanguageProficiency[];
  readOnly?: boolean;
  handleAdd?: (lang: string, proficiency: Proficiency) => void;
  handleUpdate?: (lang: string, proficiency: Proficiency) => void;
  handleDelete?: (langs: string[]) => void;
  dialogOpen?: boolean;
  onOpenDialog?: () => void;
  onCloseDialog?: () => void;
}

export const LangsPageLayout = ({
  languages,
  readOnly,
  handleAdd,
  handleUpdate,
  handleDelete,
  onOpenDialog,
  dialogOpen = false,
  onCloseDialog,
}: LangsPageLayoutProps) => {
  const { t } = useTranslation();

  const [deleteMode, setDeleteMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [dialogMode, setDialogMode] = useState<'add' | 'update'>('add');
  const [initialLang, setInitialLang] = useState<{
    name: string;
    proficiency: Proficiency;
  } | null>(null);

  const openAddDialog = () => {
    setDialogMode('add');
    setInitialLang(null);
    onOpenDialog?.();
  };

  const openUpdateDialog = (lang: LanguageProficiency) => {
    setDialogMode('update');
    setInitialLang({
      name: lang.name,
      proficiency: lang.proficiency,
    });
    onOpenDialog?.();
  };

  const handleToggleSelect = (name: string) => {
    setSelected((prev) => {
      const copy = new Set(prev);
      if (copy.has(name)) {
        copy.delete(name);
      } else {
        copy.add(name);
      }
      return copy;
    });
  };

  return (
    <Container
      maxWidth="md"
      sx={(theme) => {
        return {
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          paddingTop: '32px',
          [theme.breakpoints.up('md')]: {
            paddingLeft: '24px',
            paddingRight: '24px',
          },
        };
      }}
    >
      <LangsList>
        {languages.map((language) => (
          <LangItem
            proficiency={language.proficiency}
            label={language.name}
            readOnly={readOnly}
            deleteMode={deleteMode}
            selected={selected.has(language.name)}
            onToggleSelect={() => handleToggleSelect(language.name)}
            onClick={() => !readOnly && openUpdateDialog(language)}
            key={language.name}
          />
        ))}
      </LangsList>

      {!readOnly && (
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            paddingBottom: '16px',
            zIndex: 3,
            height: '64px',
            width: 'calc(100% + 48px)',
            margin: 'auto -24px 0px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            gap: '16px',
            background: (theme) =>
              `linear-gradient(transparent 0%, ${theme.palette.background.default} 50%)`,
            backdropFilter: 'blur(0.5px)',
            '& .MuiButton-root': {
              gap: '16px',
            },
          }}
        >
          {deleteMode ? (
            <>
              <StyledButton
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setDeleteMode(false);
                  setSelected(new Set());
                }}
              >
                {t('languages.cancelBtn')}
              </StyledButton>
              <StyledButton
                variant="contained"
                color="primary"
                disabled={selected.size === 0}
                onClick={() => {
                  handleDelete?.(Array.from(selected));
                  setSelected(new Set());
                  setDeleteMode(false);
                }}
              >
                {t('languages.removeBtn')}
                {selected.size ? (
                  <Box
                    component="div"
                    sx={{
                      marginLeft: '12px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      color: 'rgb(198, 48, 49)',
                      fontWeight: 600,
                    }}
                  >
                    {selected.size}
                  </Box>
                ) : null}
              </StyledButton>
            </>
          ) : (
            <>
              <StyledButton
                variant="text"
                color="secondary"
                onClick={openAddDialog}
                fullWidth={!languages.length}
              >
                <AddIcon />
                {t('languages.addLanguageBtn')}
              </StyledButton>
              {languages.length ? (
                <StyledButton
                  variant="text"
                  color="primary"
                  onClick={() => setDeleteMode(true)}
                >
                  <DeleteForever />
                  {t('languages.removeLanguagesBtn')}
                </StyledButton>
              ) : null}
            </>
          )}
        </Box>
      )}
      <LangDialog
        existingLangs={languages}
        open={dialogOpen}
        mode={dialogMode}
        initialLang={initialLang ?? undefined}
        onClose={onCloseDialog}
        onConfirm={(name, proficiency) => {
          if (dialogMode === 'add') {
            handleAdd?.(name, proficiency);
          } else {
            handleUpdate?.(name, proficiency);
          }
          onCloseDialog?.();
        }}
      />
    </Container>
  );
};
