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
  }
  interface PaletteOptions {
    mastery?: {
      Novice?: { bar: string; track: string; value: number };
      Competent?: { bar: string; track: string; value: number };
      Advanced?: { bar: string; track: string; value: number };
      Proficient?: { bar: string; track: string; value: number };
      Expert?: { bar: string; track: string; value: number };
    };
  }
}
export {};
