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
    width: '200',
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
    width: '200',
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
    width: '300',
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
    width: '100',
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
    width: '200',
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
    width: '150',
    type: 'link',
  },
];

export const planTableColumns: Array<DataGridColumn> = [
  {
    id: 'id',
    name: 'Plan ID',
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
    name: 'Plan Name',
    sortable: true,
    headerTooltip: 'Plan Name',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '',
    type: 'text',
  },
  {
    id: 'program_id',
    name: 'Program ID',
    sortable: true,
    headerTooltip: 'Program ID',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '200',
    type: 'text',
  },
  {
    id: 'description',
    name: 'Description',
    sortable: true,
    headerTooltip: 'Plan Description',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '',
    type: 'text',
  },
  {
    id: 'price',
    name: 'Price',
    sortable: true,
    headerTooltip: 'Plan Price',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '',
    type: 'number',
  },
];

export const userTableColumns: Array<DataGridColumn> = [
  {
    id: 'id',
    name: 'User ID',
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
    name: 'Full Name',
    sortable: true,
    headerTooltip: 'User Name',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '300',
    type: 'text',
  },
  {
    id: 'email',
    name: 'Email',
    sortable: true,
    headerTooltip: 'Email',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '',
    type: 'text',
  },

  {
    id: 'location',
    name: 'Location',
    sortable: true,
    headerTooltip: 'Location',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '250',
    type: 'text',
  },
];