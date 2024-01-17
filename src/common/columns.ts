import { DataGridColumn } from './interfaces/datagrid.interface';

export const programTableColumns: Array<DataGridColumn> = [
  {
    _id: '_id',
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
    _id: 'name',
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
    _id: 'description',
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
    _id: 'phases',
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
    _id: 'coach_id',
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
    _id: 'img',
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
    _id: '_id',
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
    _id: 'name',
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
    _id: 'program_id',
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
    _id: 'description',
    name: 'Description',
    sortable: true,
    headerTooltip: 'Plan Description',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '300',
    type: 'text',
  },
  {
    _id: 'price',
    name: 'Price',
    sortable: true,
    headerTooltip: 'Plan Price',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '',
    type: 'number',
  },
  {
    _id: 'delivery_days',
    name: 'Delivery Days',
    sortable: true,
    headerTooltip: 'Delivery Days',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '',
    type: 'number',
  },
];

export const userTableColumns: Array<DataGridColumn> = [
  {
    _id: '_id',
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
    _id: 'name',
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
    _id: 'email',
    name: 'Email',
    sortable: true,
    headerTooltip: 'Email',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '200',
    type: 'text',
  },

  {
    _id: 'address',
    name: 'Address',
    sortable: true,
    headerTooltip: 'Address',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '250',
    type: 'text',
  },
];

export const orderTableColumns: Array<DataGridColumn> = [
  {
    _id: 'status',
    name: 'Status',
    sortable: true,
    headerTooltip: 'Status',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '100',
    type: 'dropdown',
  },
  {
    _id: '_id',
    name: 'Order ID',
    sortable: true,
    headerTooltip: '#ID',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '',
    type: 'text',
  },

  {
    _id: 'items',
    name: 'Items',
    sortable: true,
    headerTooltip: 'Items',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '350',
    type: 'array',
  },
  {
    _id: 'addons',
    name: 'Addons',
    sortable: true,
    headerTooltip: 'Addons',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '300',
    type: 'array',
  },
  {
    _id: 'createdAt',
    name: 'Created At',
    sortable: true,
    headerTooltip: 'Created At',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '150',
    type: 'date',
  },
  {
    _id: 'updatedAt',
    name: 'Updated At',
    sortable: true,
    headerTooltip: 'Updated At',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '250',
    type: 'date',
  },
];
export const invoiceTableColumns: Array<DataGridColumn> = [
  {
    _id: 'name',
    name: 'Item Name',
    sortable: true,
    headerTooltip: 'Item Name',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '300',
    type: 'text',
  },
  {
    _id: 'description',
    name: 'Item Description',
    sortable: true,
    headerTooltip: 'Item Description',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '300',
    type: 'text',
  },
  {
    _id: 'price',
    name: 'Price',
    sortable: true,
    headerTooltip: 'Price',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '',
    type: 'number',
  },
  {
    _id: 'quantity',
    name: 'Quantity',
    sortable: true,
    headerTooltip: 'Quantity',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '250',
    type: 'number',
  },
  {
    _id: 'amount',
    name: 'Amount',
    sortable: true,
    headerTooltip: 'Amount',
    hidden: false,
    icon: '',
    iconFile: '',
    width: '250',
    type: 'number',
  },
];
