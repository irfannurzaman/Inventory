import repository from './repository';
import { ApiEndpoints } from '~/plugins.types';

// endpoints
import GeneralLedgerAPI from '../repositories/generalLedger.api';
import AccountReceivableApi from '../repositories/accountReceivable.api';
import AuthApi from '../repositories/auth.api';
import HousekeepingApi from '../repositories/housekeeping.api';
import FrontOfficeCashierApi from '../repositories/frontOfficeCashier.api';
import AccountsPayableApi from '../repositories/accountsPayable.api';
import InventoryEndpoints from '../repositories/inventory.api';

const http: ApiEndpoints = {
  auth: AuthApi(repository),
  generalLedger: GeneralLedgerAPI(repository),
  accountReceivable: AccountReceivableApi(repository),
  housekeeping: HousekeepingApi(repository),
  frontOfficeCashier: FrontOfficeCashierApi(repository),
  accountsPayable: AccountsPayableApi(repository),
  inventory: InventoryEndpoints(repository),
};

export default http;
