import { TableHeader } from '~/components/VhpUI/typings';
// import { getLabels } from '../../../helpers/getLabels.helpers';

export const tableHeaders: TableHeader[] = [
  {
    // label: getLabels('recipe_number'),
    label: 'recipe_number',
    field: 'artnrrezept',
    name: 'artnrrezept',
    align: 'left',
    sortable: false,
  },
  {
    // label: getLabels('description'),
    label: 'description',
    field: 'bezeich1',
    name: 'bezeich1',
    align: 'left',
    sortable: false,
},
{
    // label: getLabels('category'),
    label: 'category',
    field: 'kategorie',
    name: 'kategorie',
    align: 'left',
    sortable: false,
},
{
    label: 'Portion',
    field: 'portion',
    name: 'portion',
    align: 'left',
    sortable: false,
},
{
    label: 'Category Name',
    field: 'bezeich2',
    align: 'left',
    name: 'bezeich2',
    sortable: false,
},
{
    // label: getLabels('created'),
    label: 'created',
    field: 'datumanlage',
    align: 'left',
    name: 'datumanlage',
    sortable: false,
},
{
    // label: getLabels('last_changed'),
    label: 'last_changed',
    field: 'datummod',
    align: 'left',
    name: 'datummod',
    sortable: false,
},
{
    label: 'Recipe Cost',
    field: 'cost',
    align: 'left',
    name: 'cost',
    sortable: false,
},
{
    label: 'Cost Portion',
    field: 'cost',
    name: 'cost',
    align: 'left',
    sortable: false,
  },
  { name: 'actions', field: 'actions' },
];

export const modalAdd: TableHeader[] = [
  {
    label: 'Artcle Number',
    field: 'artnr',
    name: 'artnr',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Description',
    field: 'bezeich',
    name: 'bezeich',
    align: 'left',
    sortable: false,
  },
  {
    label: 'R-Unit',
    field: 's-unit',
    name: 's-unit',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Net-Quantity',
    field: 'menge',
    name: 'menge',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Cost',
    field: 'cost',
    name: 'cost',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Unit',
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
    label: 'Avg Price',
    field: 'vk-preis',
    name: 'vk-preis',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Avg Price',
    field: 'vk-preis',
    name: 'vk-preis',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Loss Factor(%)',
    field: 'lostfact',
    name: 'lostfact',
    align: 'left',
    sortable: false,
  },
  { name: 'actions', field: 'actions' },
];

export const stockArticle: TableHeader[] = [
  {
    label: 'Artcle Number',
    field: 'artnr',
    name: 'artnr',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Description',
    field: 'bezeich',
    name: 'bezeich',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Unit',
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
    label: 'R-Unit',
    field: 'herkunft',
    name: 'herkunft',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Avrg Price',
    field: 'vk-preis',
    name: 'vk-preis',
    align: 'left',
    sortable: false,
  },
];

export const Recipe: TableHeader[] = [
  {
    label: 'No',
    field: 'artnrrezept',
    name: 'artnrrezept',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Description',
    field: 'bezeich',
    name: 'bezeich',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Portion',
    field: 'portion',
    name: 'portion',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Category',
    field: '',
    name: '',
    align: 'left',
    sortable: false,
  },
];
const width1 = '130px'
const width2 = '190px'
const right = '10px'
export const useInputModal = [
    {
        label: 'Category Number',
        value: '',
        width: width1,
        marginRight: right
    },
    {
        label: 'Category Name',
        value: '',
        width: width2,
        marginRight: right
    },
    {
        label: 'Recipe Number',
        value: '',
        width: width1,
        marginRight: right
    },
    {
        label: 'Description',
        value: '',
        width: width2,
    },
    {
        label: 'Portion',
        value: '',
        width: width1,
        marginRight: '200px'
    },
    {
        label: 'Articel Number',
        value: '',
        width: width1,
        marginRight: right
    },
    {
        label: 'content',
        value: '',
        width: '90px',
        marginRight: right
    },
    {
        label: 'Quantity',
        value: '',
        width: '90px',
    },
    {
        label: 'Loss Factor',
        value: '',
        width: width1,
        marginRight: right
    },
    {
        label: 'Recipe Cost',
        value: '',
        width: width2,
    },
]