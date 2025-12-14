import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    mastery: {
      Novice: { bar: string; track: string; value: number };
      Competent: { bar: string; track: string; value: number };
      Advanced: { bar: string; track: string; value: number };
      Proficient: { bar: string; track: string; value: number };
      Expert: { bar: string; track: string; value: number };
    };
    menu: { background: string };
    skillItem: { action: { hover: string } };
    sidebar: {
      item: {
        color: stirng;
        activeColor: string;
        activeBackground: string;
      };
      user: {
        text: string;
        avatarBackground: string;
        avatarColor: string;
        hoverBackground: string;
      };
      collapseBtn: {
        iconColor: string;
        hoverBackground: string;
      };
    };
    header: { segment: string };
    proficiency: {
      A1: string;
      A2: string;
      B1: string;
      B2: string;
      C1: string;
      C2: string;
      Native: string;
    };
  }
  interface PaletteOptions {
    mastery?: {
      Novice?: { bar: string; track: string; value: number };
      Competent?: { bar: string; track: string; value: number };
      Advanced?: { bar: string; track: string; value: number };
      Proficient?: { bar: string; track: string; value: number };
      Expert?: { bar: string; track: string; value: number };
    };
    menu?: {
      background?: string;
    };
    skillItem?: { action?: { hover?: string } };
    sidebar?: {
      item?: {
        color?: stirng;
        activeColor?: string;
        activeBackground?: string;
      };
      user?: {
        text?: string;
        avatarBackground?: string;
        avatarColor?: string;
        hoverBackground?: string;
      };
      collapseBtn?: {
        iconColor?: string;
        hoverBackground?: string;
      };
    };
    header?: { segment?: string };
    proficiency?: {
      A1: string;
      A2: string;
      B1: string;
      B2: string;
      C1: string;
      C2: string;
      Native: string;
    };
  }
}
export {};
