import { UserRole } from 'src/app/model/user.model';

export interface DataGridColumn {
  /** Identifier for the grid columns. */
  _id: string;

  /** Displayed column name. */
  name: string;

  /** Is this column visible? */
  hidden: boolean;

  /** Is the column sortable? */
  sortable?: boolean;

  /** Width of the column (in pixels) or a string value for the width. */
  width?: number | string;

  /** Tooltip for the column header. */
  headerTooltip?: string;

  /** Icon to use. */
  icon?: string;

  /** Icon file to use. */
  iconFile?: string;

  type: 'link' | 'text' | 'array' | 'object' | 'number' | 'lookup' | 'date';
}
