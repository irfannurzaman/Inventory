interface HomeModule {
  path: string;
  name: string;
  logo: string;
}

export const moduleList: HomeModule[] = [
  {
    path: '/front-office-reception',
    name: 'Front Office Reception',
    logo: 'FOR',
  },
  {
    path: '/foc/guest-folio',
    name: 'Front Office Cashier',
    logo: 'FOC',
  },
  {
    path: '/telephone-operator',
    name: 'Telephone Operator',
    logo: 'TO',
  },
  {
    path: '/hk/overview',
    name: 'Housekeeping',
    logo: 'HK',
  },
  {
    path: '/sales-marketing',
    name: 'Sales Marketing',
    logo: 'SM',
  },
  {
    path: '/point-of-sales',
    name: 'Point Of Sales',
    logo: 'POS',
  },
  {
    path: '/banquet',
    name: 'Banquet',
    logo: 'Banquet',
  },
  {
    path: '/outlet',
    name: 'Outlet',
    logo: 'Outlet',
  },
  {
    path: '/accounts-receivable',
    name: 'Accounts Receivable',
    logo: 'AR',
  },
  {
    path: '/purchasing',
    name: 'Purchasing',
    logo: 'Purchasing',
  },
  {
    path: '/inv/incoming-journalizing',
    name: 'Inventory',
    logo: 'Inventory',
  },
  {
    // TODO: Change with AP Aging Report
    path: '/ap/supplier-profile',
    name: 'Accounts Payable',
    logo: 'AP',
  },
  {
    path: '/general-cashier',
    name: 'General Cashier',
    logo: 'GC',
  },
  {
    path: '/gl/chart-of-accounts',
    name: 'General Ledger',
    logo: 'GL',
  },
  {
    path: '/fixed-assets',
    name: 'Fixed Assets',
    logo: 'FixedAssets',
  },
  {
    path: '/engineering',
    name: 'Engineering',
    logo: 'Engineering',
  },
  {
    path: '/system-tools',
    name: 'System Tools',
    logo: 'SettingTools',
  },
  {
    path: '/setting',
    name: 'Setting',
    logo: 'Setting',
  },
  {
    path: '/night-audit',
    name: 'Night Audit',
    logo: 'NightAudit',
  },
  {
    path: '/income-audit',
    name: 'Income Audit',
    logo: 'IncomeAudit',
  },
];
