import { TableHeader } from '~/components/VhpUI/typings';

export const roomTableHeaders: TableHeader[] = [
  {
    label: 'Article Number',
    field: 'artnr',
    name: 'articelNumber',
    align: 'center',
    sortable: false,
  },
  {
    label: 'Description',
    field: 'bezeich',
    name: 'descriPtion',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Unit ',
    field: 'masseinheit',
    name: 'masseinheit',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Content',
    field: 'inhalt',
    name: 'inhalt',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Unit',
    field: 'traubensorte',
    name: 'roomType',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Content',
    field: 'lief-einheit',
    name: 'roomStatus',
    align: 'center',
    sortable: false,
  },
  {
    label: 'Minumum Stock (Mess)',
    field: 'min-bestand',
    name: 'guestNote',
    align: 'center',
    sortable: false,
  },
  {
    label: 'Actual',
    field: 'ek-aktuell',
    name: 'guestPax',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Last',
    field: 'ek-letzter',
    name: 'last',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Purchase Frequensi',
    field: 'vk-preis',
    name: 'purchase',
    align: 'center',
    sortable: false,
  },
  {
    label: 'Account Number',
    field: 'lieferfrist',
    name: 'accountNumber',
    align: 'center',
    sortable: false,
  },
  {
    label: 'Average',
    field: 'fibukonto',
    name: 'average',
    align: 'center',
    sortable: false,
  },
  { name: 'actions', field: 'actions' },
];

export const inputCategory = [
  {
    label: 'Main Group',
    value: '',
    width: '200px',
    options: []
  },
  {
    label: 'Sub Group',
    value: '',
    width: '200px',
    options: []
  },
]

export const inputArticelNumber = [
  {
    label: 'Articel Number',
    value: '',
    width: '100px',
    mt : '-10px'
  },
  {
    label: '',
    value: '',
    width: '30px',
    mt: '15px'
  },
]

export const UnitPrice = [
  {
    label: 'Delivery Unit',
    value: '',
    width: '150px',
    placeholder: 'box'
  },
  {
    label: 'Mess Unit',
    value: '',
    width: '150px',
    placeholder: 'kg'
  },
  {
    label: 'Recipe Unit',
    value: '',
    width: '150px',
    placeholder: 'gram'
  },
  {
    label: 'Recipe Number',
    value: '',
    width: '150px',
    placeholder: '',
    onClick: true
  },
  {
    label: 'Delivery unit conv',
    value: '',
    width: '150px',
    top: '10px',
    placeholder: '',
  },
  {
    label: 'Actual Purchase Price',
    value: '',
    width: '150px',
    top: '10px',
    placeholder: '',
  },
  {
    label: 'Delivery unit conv',
    value: '',
    width: '150px',
    placeholder: '',
  },
  {
    label: 'Last Price',
    value: '',
    width: '150px',
    placeholder: '',
  },
  {
    label: 'Average Purchase Price',
    value: '',
    width: '150px',
    placeholder: '',
  },
]
export const inputUnitPrice = [
  {
    label: 'Unit Convertion',
    mR: '200px',
    value: ['Conversion Info', 
    'Conversion section will be available', 
    'after all configurations field at unit',
    'tab has been fulfill' ] as any
  },
  {
    label: 'Unit Price',
    mR: '200px',
    value: ['Conversion Info', 
    'Conversion section will be available', 
    'after all configurations field at unit',
    'tab has been fulfill' ] as any
  },

]
