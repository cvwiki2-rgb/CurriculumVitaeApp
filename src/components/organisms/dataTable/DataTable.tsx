import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { KeyboardArrowRight, MoreVert } from '@mui/icons-material';
import {
  TableBody,
  TableHead,
  Table,
  TableRow,
  TableCell,
  IconButton,
  Avatar,
  TableContainer,
} from '@mui/material';
import { SearchInput } from '../../molecules/searchInput';
import { SortableHeaderCell } from '../../molecules/sortableHeaderCell';
import type { Column } from './types';

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  searchable?: boolean;
  sortable?: boolean;
  orderByColName?: keyof T;
  currentUserId?: string;
}

export const DataTable = <T extends Record<string, string | null | undefined>>({
  columns,
  rows,
  getRowId,
  searchable,
  sortable,
  currentUserId,
  orderByColName,
}: DataTableProps<T>) => {
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof T | null>(
    orderByColName ?? null,
  );

  const { t } = useTranslation();
  const navigate = useNavigate();

  const pinnedRow = useMemo(() => {
    if (!currentUserId) return null;
    return rows.find((row) => getRowId(row) === currentUserId) ?? null;
  }, [rows, currentUserId]);

  const rowsWithoutPinned = useMemo(() => {
    if (!currentUserId) return rows;
    return rows.filter((row) => getRowId(row) !== currentUserId);
  }, [rows, currentUserId]);

  const filteredRows = useMemo(() => {
    if (!search) return rowsWithoutPinned;

    const lower = search.toLowerCase();

    return rowsWithoutPinned.filter((row) =>
      columns.some(
        (col) =>
          col.searchable &&
          String(row[col.id] ?? '')
            .toLowerCase()
            .includes(lower),
      ),
    );
  }, [rowsWithoutPinned, search, columns]);

  const comparator = (a: T, b: T) => {
    if (!orderBy) return 0;

    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (aValue == null) return 1;
    if (bValue == null) return -1;

    return order === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  };

  const sortedRows = useMemo(() => {
    if (!sortable) return filteredRows;
    return [...filteredRows].sort(comparator);
  }, [filteredRows, order, orderBy]);

  const handleSort = (columnId: keyof T) => {
    if (orderBy === columnId) {
      setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setOrderBy(columnId);
      setOrder('asc');
    }
  };

  return (
    <TableContainer
      sx={{
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <Table
        stickyHeader
        sx={(theme) => {
          return {
            paddingBottom: '16px',
            [theme.breakpoints.down('md')]: {
              '& .MuiTableRow-root .MuiTableCell-root:nth-of-type(3)': {
                display: 'none',
              },
            },
            [theme.breakpoints.down('lg')]: {
              '& .MuiTableRow-root .MuiTableCell-root:nth-of-type(4)': {
                display: 'none',
              },
            },
            [theme.breakpoints.down('sm')]: {
              '& .MuiTableRow-root .MuiTableCell-root:nth-of-type(6)': {
                display: 'none',
              },
            },
          };
        }}
      >
        <TableHead
          sx={{
            position: 'sticky',
            top: '44px',
            zIndex: 4,
            background: (theme) =>
              `linear-gradient(${theme.palette.background.default} 80%, transparent 100%)`,
            backdropFilter: 'blur(0.5px)',
            '& .MuiTableCell-head': {
              background: 'transparent',
            },
          }}
        >
          <TableRow
            sx={{
              '& .MuiTableCell-head': {
                borderBottom: 'none',
              },
            }}
          >
            {searchable && (
              <TableCell colSpan={7}>
                <SearchInput
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  handleClear={() => setSearch('')}
                />
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell />
            {columns.map((column) =>
              column.label ? (
                column.sortable ? (
                  <SortableHeaderCell
                    label={t(`usersTable.${String(column.id)}`) ?? column.label}
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => {
                      handleSort(column.id);
                    }}
                    key={column.label}
                  />
                ) : (
                  <TableCell>
                    {t(`usersTable.${String(column.id)}`) ?? column.label}
                  </TableCell>
                )
              ) : null,
            )}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {pinnedRow &&
            String(pinnedRow.fullName)
              .toLowerCase()
              .includes(search.toLowerCase()) && (
              <TableRow key={getRowId(pinnedRow)}>
                <TableCell>
                  <Avatar src={pinnedRow.avatar ?? undefined}>
                    {pinnedRow.fullName?.[0] ?? ''}
                  </Avatar>
                </TableCell>
                <TableCell>{pinnedRow.firstName}</TableCell>
                <TableCell>{pinnedRow.lastName}</TableCell>
                <TableCell>{pinnedRow.email}</TableCell>
                <TableCell>{pinnedRow.department}</TableCell>
                <TableCell>{pinnedRow.position}</TableCell>
                <TableCell
                  onClick={() => {
                    navigate(`${pinnedRow.id}`);
                  }}
                >
                  <IconButton size="medium">
                    <MoreVert color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          {sortedRows.map((row) => (
            <TableRow key={getRowId(row)}>
              <TableCell>
                <Avatar src={row.avatar ?? undefined}>
                  {row.fullName?.[0]}
                </Avatar>
              </TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.position}</TableCell>
              <TableCell
                onClick={() => {
                  navigate(`${row.id}`);
                }}
              >
                <IconButton size="medium">
                  <KeyboardArrowRight color="secondary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
