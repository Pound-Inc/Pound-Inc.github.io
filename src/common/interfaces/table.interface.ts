import { SortColumn, SortDirection } from "src/app/admin/sortable.directive";

export interface Table {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}
