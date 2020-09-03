import { TableHeader } from '~/components/VhpUI/typings';
// import { getLabels } from '../../../helpers/getLabels.helpers';

export const tableHeaders: TableHeader[] = [
  {
    // label: getLabels('recipe_number'),
    label: 'recipe_number',
    field: 'artnrrezept',
    name: 'artnrrezept',
    align: 'left',
    sortable: true,
  },
  {
    // label: getLabels('description'),
    label: 'description',
    field: 'bezeich',
    name: 'bezeich',
    align: 'left',
    sortable: true,
  },
  {
    // label: getLabels('category'),
    label: 'category',
    field: 'kategorie',
    name: 'kategorie',
    sortable: true,
  },
  {
    label: 'Portion',
    field: 'portion',
    name: 'portion',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Category Name',
    field: 'bezeich',
    name: 'bezeich',
    sortable: true,
  },
  {
    // label: getLabels('created'),
    label: 'created',
    field: 'datumanlage',
    name: 'datumanlage',
    sortable: true,
  },
  {
    // label: getLabels('last_changed'),
    label: 'last_changed',
    field: 'datummod',
    name: 'datummod',
    sortable: true,
  },
  {
    label: 'Recipe Cost',
    field: 'cost',
    name: 'cost',
    sortable: true,
  },
  {
    label: 'Cost Portion',
    field: 'cost',
    name: 'cost',
    sortable: true,
  },
  { name: 'actions', field: 'actions' },
];

export const modalAdd: TableHeader[] = [
  {
    label: 'Artcle Number',
    field: 'artnr',
    name: 'artnr',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Description',
    field: 'bezeich',
    name: 'bezeich',
    align: 'left',
    sortable: true,
  },
  {
    label: 'R-Unit',
    field: 's-unit',
    name: 's-unit',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Net-Quantity',
    field: 'menge',
    name: 'menge',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Cost',
    field: 'cost',
    name: 'cost',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Unit',
    field: 'masseinheit',
    name: 'masseinheit',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Content',
    field: 'inhalt',
    name: 'inhalt',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Avg Price',
    field: 'vk-preis',
    name: 'vk-preis',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Avg Price',
    field: 'vk-preis',
    name: 'vk-preis',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Loss Factor(%)',
    field: 'lostfact',
    name: 'lostfact',
    align: 'left',
    sortable: true,
  },
  { name: 'actions', field: 'actions' },
];

export const stockArticle: TableHeader[] = [
  {
    label: 'Artcle Number',
    field: 'artnr',
    name: 'artnr',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Description',
    field: 'bezeich',
    name: 'bezeich',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Unit',
    field: 'masseinheit',
    name: 'masseinheit',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Content',
    field: 'inhalt',
    name: 'inhalt',
    align: 'left',
    sortable: true,
  },
  {
    label: 'R-Unit',
    field: 'herkunft',
    name: 'herkunft',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Avrg Price',
    field: 'vk-preis',
    name: 'vk-preis',
    align: 'left',
    sortable: true,
  },
];

export const Recipe: TableHeader[] = [
  {
    label: 'No',
    field: 'artnrrezept',
    name: 'artnrrezept',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Description',
    field: 'bezeich',
    name: 'bezeich',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Portion',
    field: 'portion',
    name: 'portion',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Category',
    field: '',
    name: '',
    align: 'left',
    sortable: true,
  },
];
