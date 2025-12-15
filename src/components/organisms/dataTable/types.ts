export type Column<T> = {
  id: keyof T;
  label: string;
  sortable?: boolean;
  searchable?: boolean;
};
