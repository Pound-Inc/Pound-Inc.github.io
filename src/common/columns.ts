import { DataGridColumn } from './interfaces/datagrid.interface';

export const programTableColumns: Array<DataGridColumn> = [
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
    id: 'phases',
    name: 'Phases',
    sortable: true,
    headerTooltip: 'Plan Phases',
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
