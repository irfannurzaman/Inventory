import { ModuleAbbr } from '~/app/constants/module.constant';
import { reportList } from './reportList';

export const generateModulePath = (
  moduleAbbr: string,
  path: string,
  pageName: string
) => ({
  path: `/${moduleAbbr.toLowerCase()}/${path}`,
  name: pageName,
  component: () =>
    import(
      `../app/modules/${ModuleAbbr[moduleAbbr]}/Page${moduleAbbr}${pageName}.vue`
    ),
  meta: { module: moduleAbbr, reportList: reportList[moduleAbbr] },
});