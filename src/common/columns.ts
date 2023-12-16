import { DataGridColumn } from './interfaces/datagrid.interface';

export const programTableColumns: Array<DataGridColumn> = [
  {
    id: 'id',
    name: 'Program ID',
    sortable: true,
    headerTooltip: '#ID',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '',
    type: 'text',
  },
  {
    id: 'name',
    name: 'Program Name',
    sortable: true,
    headerTooltip: 'Program Name',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '',
    type: 'text',
  },
  {
    id: 'description',
    name: 'Description',
    sortable: true,
    headerTooltip: 'Program Description',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '',
    type: 'text',
  },
  {
    id: 'phases',
    name: 'Phases',
    sortable: true,
    headerTooltip: 'Program Phases',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '',
    type: 'object',
  },
  {
    id: 'coach_id',
    name: 'Coach ID',
    sortable: true,
    headerTooltip: 'Coach ID',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '',
    type: 'lookup',
  },
  {
    id: 'img',
    name: 'Image URL',
    sortable: true,
    headerTooltip: 'Image Reference Link',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '',
    type: 'link',
  },
];
