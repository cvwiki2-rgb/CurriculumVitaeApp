import { darkMastery, lightMastery } from './mastery';

export const primary = { main: '#c63031', contrastText: '#fff' };
export const secondary = { main: '#767676', contrastText: '#fff' };

export const lightPalette = {
  primary,
  secondary,
  background: { default: '#F5F5F7' },
  text: { primary: '#2e2e2e', secondary: '#2E2E2E' },
  action: {
    hover: 'rgba(0,0,0,0.04)',
    disabled: 'rgba(0,0,0,0.26)',
    disabledBackground: 'rgba(0,0,0,0.12)',
  },
  mastery: lightMastery,
  menu: { background: '#ffffff' },
  skillItem: { action: { hover: 'rgba(118,118,118,0.08)' } },
};

export const darkPalette = {
  primary,
  secondary,
  background: { default: '#353535', paper: '#1e1e1e' },
  text: { primary: '#ffffff', secondary: '#f5f5f7' },
  action: {
    hover: 'rgba(255,255,255,0.08)',
    disabled: 'rgba(255,255,255,0.3)',
    disabledBackground: 'rgba(255,255,255,0.12)',
  },
  mastery: darkMastery,
  menu: { background: '#121212' },
  skillItem: { action: { hover: 'rgba(118,118,118,0.08)' } },
};
