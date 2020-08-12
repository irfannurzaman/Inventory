import { TableHeader } from '~/components/VhpUI/typings';
import { PaymentRecord } from '../models/payment.model';

export const dialogPaymentColumns: TableHeader<PaymentRecord>[] = [
  {
    label: 'Article Number',
    field: 'artnr',
    name: 'artnr',
    align: 'left',
  },
  {
    label: 'Description',
    field: 'bezeich',
    name: 'bezeich',
    align: 'left',
  },
  {
    label: 'In %',
    field: 'proz',
    name: 'proz',
  },
  {
    label: 'Payment Amount',
    field: 'betrag',
    name: 'betrag',
  },
  {
    label: 'Remark',
    field: 'dummy',
    name: 'dummy',
  },
  { name: 'actions', field: 'actions' },
];
