import { useState } from 'react';
import { DeleteForever, Add as AddIcon } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import { groupSkillsByCategory } from '../../../utils/groupSkillsByCategory';
import { StyledButton } from '../../atoms/styledButton';
import { SkillItem } from '../../molecules/skillItem';
import { SkillsList } from '../../molecules/skillsList';
import { SkillDialog } from '../skillDialog';
import type { Mastery, SkillCategory, SkillMastery } from 'cv-graphql';

interface SkillsPageLayoutProps {
  skills: SkillMastery[];
  categories: SkillCategory[];
  readOnly?: boolean;
  handleAdd?: (
    skill: string,
    mastery: Mastery,
    categoryId?: null | string,
  ) => void;
  handleUpdate?: (
    skill: string,
    mastery: Mastery,
    categoryId?: string | null,
  ) => void;
  handleDelete?: (skills: string[]) => void;
  dialogOpen?: boolean;
  onOpenDialog?: () => void;
  onCloseDialog?: () => void;
}

export const SkillsPageLayout = ({
  skills,
  categories,
  readOnly,
  handleAdd,
  handleUpdate,
  handleDelete,
  onOpenDialog,
  dialogOpen = false,
  onCloseDialog,
}: SkillsPageLayoutProps) => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [dialogMode, setDialogMode] = useState<'add' | 'update'>('add');
  const [initialSkill, setInitialSkill] = useState<{
    name: string;
    mastery: Mastery;
    categoryId: string | null;
  } | null>(null);

  const openAddDialog = () => {
    setDialogMode('add');
    setInitialSkill(null);
    onOpenDialog?.();
  };

  const openUpdateDialog = (skill: SkillMastery) => {
    setDialogMode('update');
    setInitialSkill({
      name: skill.name,
      mastery: skill.mastery,
      categoryId: skill.categoryId ?? null,
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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        paddingTop: '32px',
      }}
    >
      {groupSkillsByCategory(categories, skills).map((list) => (
        <SkillsList title={list.category.name} key={list.category.id}>
          {list.skills.map((skill) => (
            <SkillItem
              mastery={skill.mastery}
              label={skill.name}
              readOnly={readOnly}
              deleteMode={deleteMode}
              selected={selected.has(skill.name)}
              onToggleSelect={() => handleToggleSelect(skill.name)}
              onClick={() => !readOnly && openUpdateDialog(skill)}
              key={skill.name}
            />
          ))}
        </SkillsList>
      ))}
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
                Cancel
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
                Delete
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
              >
                <AddIcon />
                Add skill
              </StyledButton>
              <StyledButton
                variant="text"
                color="primary"
                onClick={() => setDeleteMode(true)}
              >
                <DeleteForever />
                Remove skills
              </StyledButton>
            </>
          )}
        </Box>
      )}
      <SkillDialog
        existingSkills={skills}
        open={dialogOpen}
        mode={dialogMode}
        initialSkill={initialSkill ?? undefined}
        onClose={onCloseDialog}
        onConfirm={(name, mastery, categoryId) => {
          if (dialogMode === 'add') {
            handleAdd?.(name, mastery, categoryId);
          } else {
            handleUpdate?.(name, mastery, categoryId);
          }
          onCloseDialog?.();
        }}
      />
    </Container>
  );
};
