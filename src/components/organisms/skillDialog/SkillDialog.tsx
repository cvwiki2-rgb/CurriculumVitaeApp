import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useQuery } from '@apollo/client/react';
import { DialogActions, DialogContent, MenuItem } from '@mui/material';
import {
  type Mastery,
  type Skill,
  type SkillCategory,
  type SkillMastery,
} from 'cv-graphql';
import { masteryOptions } from './constants';
import { SKILLS } from '../../../graphql/profileSkills/queries';
import { parseSkill } from '../../../utils/parseSkill';
import { StyledButton } from '../../atoms/styledButton';
import { BaseDialog } from '../../molecules/baseDialog';
import { GroupedSelect } from '../../molecules/groupedSelect';
import { SelectInput } from '../../molecules/selectInput';

type ParsedSkill = {
  id: string;
  label: string;
  category: undefined | null | SkillCategory;
  group: string | null | undefined;
  groupOrder: number;
};

interface SkillDialogProps {
  mode: 'add' | 'update';
  initialSkill?: SkillMastery | null;
  existingSkills: SkillMastery[];
  open: boolean;
  onClose?: () => void;
  onConfirm: (
    name: string,
    mastery: Mastery,
    categoryId?: string | null,
  ) => void;
}

export const SkillDialog = ({
  mode,
  initialSkill,
  existingSkills,
  open,
  onClose,
  onConfirm,
}: SkillDialogProps) => {
  const [skill, setSkill] = useState<ParsedSkill | null>(null);
  const [mastery, setMastery] = useState<Mastery>('Novice' as Mastery);

  const { data: skillsData } = useQuery<{ skills: Skill[] }>(SKILLS);

  const filteredSkills = useMemo(() => {
    const excludedNames = existingSkills
      .filter((s) => s.name !== initialSkill?.name)
      .map((s) => s.name);

    return (
      skillsData?.skills.filter((s) => !excludedNames.includes(s.name)) ?? []
    );
  }, [skillsData?.skills, existingSkills, initialSkill?.name]);

  const parsedSkills: ParsedSkill[] = useMemo(
    () =>
      filteredSkills
        .map(parseSkill)
        .sort((a, b) =>
          a.groupOrder !== b.groupOrder
            ? a.groupOrder - b.groupOrder
            : a.label.localeCompare(b.label),
        ),
    [filteredSkills],
  );

  useEffect(() => {
    if (!open) return;

    if (mode === 'update' && initialSkill) {
      const existingSkill =
        skillsData?.skills
          .map(parseSkill)
          .find((s) => s.label === initialSkill.name) ?? null;
      setSkill(existingSkill);
      setMastery(initialSkill.mastery);
    } else {
      setSkill(null);
      setMastery('Novice' as Mastery);
    }
  }, [open, mode, initialSkill?.name, skillsData?.skills]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!skill) return;
    onConfirm(skill.label, mastery, skill.category?.id);
    onClose?.();
  };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={mode === 'add' ? 'Add skill' : 'Update skill'}
    >
      <DialogContent>
        <GroupedSelect
          options={parsedSkills || []}
          groupBy={(option) => option?.group || ''}
          getOptionLabel={(option) => option?.label || ''}
          value={skill}
          onChange={setSkill}
          label="Skill"
          disabled={mode === 'update'}
        />
        <SelectInput disabled={!skill} value={mastery} onChange={setMastery}>
          {masteryOptions.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
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
          Cancel
        </StyledButton>
        <StyledButton
          type="submit"
          disabled={!skill || !mastery || initialSkill?.mastery === mastery}
          variant="contained"
          color="primary"
        >
          Confirm
        </StyledButton>
      </DialogActions>
    </BaseDialog>
  );
};
