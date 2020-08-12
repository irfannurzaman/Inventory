export interface TableHeader<T = any> {
  name?: string;
  label?: string;
  field: string | ((row: T) => void);
  required?: boolean;
  align?: 'left' | 'right' | 'center' | 'justify';
  sortable?: boolean;
  sort?: (a, b, rowA: T, rowB: T) => number;
  format?: (val, row: T) => void;
  style?: string;
  classes?: string;
  headerStyle?: string;
  headerClasses?: string;
}
