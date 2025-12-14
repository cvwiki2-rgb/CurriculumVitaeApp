import { darkMastery, lightMastery } from './mastery';
import { darkSidebar, lightSidebar } from './sidebar';

export const primary = { main: '#c63031', contrastText: '#fff' };
export const secondary = { main: '#767676', contrastText: '#fff' };

export const lightPalette = {
  primary,
  secondary,
  background: { default: '#F5F5F7', paper: ' #f5f5f7' },
  text: { primary: '#2e2e2e', secondary: '#2E2E2E' },
  action: {
    hover: 'rgba(0,0,0,0.04)',
    disabled: 'rgba(0,0,0,0.26)',
    disabledBackground: 'rgba(0,0,0,0.12)',
  },
  mastery: lightMastery,
  menu: { background: '#ffffff' },
  skillItem: { action: { hover: 'rgba(118,118,118,0.08)' } },
  divider: 'rgba(0,0,0,0.12)',
  sidebar: lightSidebar,
  header: { segment: 'rgba(0, 0, 0, 0.6)' },
  proficiency: {
    A1: 'rgb(118, 118, 118)',
    A2: 'rgb(118, 118, 118)',
    B1: 'rgb(2, 136, 209)',
    B2: 'rgb(46, 125, 50)',
    C1: 'rgb(255, 184, 0)',
    C2: 'rgb(255, 184, 0)',
    Native: 'rgb(198, 48, 49)',
  },
};

export const darkPalette = {
  primary,
  secondary,
  background: { default: '#353535', paper: '#353535' },
  text: { primary: '#ffffff', secondary: '#f5f5f7' },
  action: {
    hover: 'rgba(255,255,255,0.08)',
    disabled: 'rgba(255,255,255,0.3)',
    disabledBackground: 'rgba(255,255,255,0.12)',
  },
  mastery: darkMastery,
  menu: { background: '#121212' },
  skillItem: { action: { hover: 'rgba(118,118,118,0.08)' } },
  divider: 'rgba(255,255,255,0.12)',
  sidebar: darkSidebar,
  header: { segment: 'rgba(255, 255, 255, 0.7)' },
  proficiency: {
    A1: 'rgb(118, 118, 118)',
    A2: 'rgb(118, 118, 118)',
    B1: 'rgb(41, 182, 246)',
    B2: 'rgb(102, 187, 106)',
    C1: 'rgb(255, 184, 0)',
    C2: 'rgb(255, 184, 0)',
    Native: 'rgb(198, 48, 49)',
  },
};
