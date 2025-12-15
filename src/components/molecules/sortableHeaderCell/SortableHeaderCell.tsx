import { TableCell, TableSortLabel } from '@mui/material';

interface SortableHeaderCellProps {
  label: string;
  active: boolean;
  direction?: 'asc' | 'desc';
  onClick: () => void;
}

export const SortableHeaderCell = ({
  label,
  active,
  direction,
  onClick,
}: SortableHeaderCellProps) => (
  <TableCell sortDirection={active ? direction : false}>
    <TableSortLabel active={active} direction={direction} onClick={onClick}>
      {label}
    </TableSortLabel>
  </TableCell>
);
