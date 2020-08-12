import { SelectItem } from '~/app/shared/models/select.model';

export const mapWithBezeich = (items, prefix): SelectItem[] =>
  items
    ? items.map((item) => ({
        label: `${item[prefix]} - ${item.bezeich}`,
        value: item.bezeich,
      }))
    : [];
