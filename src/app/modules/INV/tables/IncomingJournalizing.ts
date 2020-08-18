import { TableHeader } from '~/components/VhpUI/typings';
import { formatterMoney } from '../../../helpers/formatterMoney.helper'
export const tableHeaders: TableHeader[] = [
  {
    label: 'Account Number',
    field: 'acct-fibukonto',
    name: 'acct-fibukonto',
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
    label: 'Debit',
    field: 'debit',
    name: 'debit',
    sortable: false,
  },
  {
    label: 'Credit',
    field: 'credit',
    name: 'credit',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Remark',
    field: 'bemerk',
    name: 'bemerk',
    align: 'right',
    sortable: false,
  },
  {
    label: 'User ID',
    field: 'userinit',
    name: 'userinit',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Post Date',
    field: 'sysdate',
    name: 'sysdate',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Changed ID',
    field: 'content',
    name: 'content',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Change Date',
    field: 'einzelpreis',
    name: 'einzelpreis',
    sortable: false,
  },
  { name: 'actions', field: 'actions' },
];

export const dataTable = (items) => {
  return items.tGList['t-g-list'].map((item) => ({
    'docu-nr': item['docu-nr'],
    lscheinnr: item.lscheinnr,
    'acct-fibukonto': item['acct-fibukonto'],
    bezeich: item.bezeich,
    debit: formatterMoney(item.debit),
    credit: formatterMoney(item.credit),
    bemerk: item.bemerk,
    userinit: item.userinit,
    sysdate: item.sysdate,
    content: item.content,
    einzelpreis: item.einzelpreis,
    actions: '',
    selected: false,
    zeit: item.zeit,
    chgdate: item.chgdate,
    duplicate: item.duplicate,
    'add-note': item['add-note']
  }))
}
