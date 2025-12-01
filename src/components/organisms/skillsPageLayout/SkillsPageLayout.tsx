import { useState } from 'react';
import { DeleteForever, Add as AddIcon } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import { groupSkillsByCategory } from '../../../utils/groupSkillsByCategory';
import { StyledButton } from '../../atoms/styledButton';
import { SkillItem } from '../../molecules/skillItem';
import { SkillsList } from '../../molecules/skillsList';
import type { Skill } from '../../../types/skills';
import type { SkillCategory } from 'cv-graphql';

interface SkillsPageLayoutProps {
  skills: Skill[];
  categories: SkillCategory[];
  readOnly?: boolean;
  handleAdd?: () => void;
  handleDelete?: (skills: string[]) => void;
}

export const SkillsPageLayout = ({
  skills,
  categories,
  readOnly,
  handleAdd,
  handleDelete,
}: SkillsPageLayoutProps) => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

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
              key={skill.name}
            />
          ))}
        </SkillsList>
      ))}
      {!readOnly && (
        <Box
          sx={{
            position: 'sticky',
            bottom: '16px',
            zIndex: 3,
            height: '64px',
            width: 'calc(100% + 48px)',
            margin: 'auto -24px 0px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            gap: '16px',
            background:
              'linear-gradient(transparent 0%, var(--skills-btns-bg) 50%)',
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
                onClick={handleAdd}
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
    </Container>
  );
};
