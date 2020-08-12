import { DoRequest } from '../config/repository';

const AR_URL = 'vhpAR';

export interface AccountReceivableEndpoints {
  getPrepareSelectGLAcct: any;
}

export default (doFetch: DoRequest): AccountReceivableEndpoints => ({
  getPrepareSelectGLAcct: (
    body = {
      currDept: 0,
      fromFibu: '',
    }
  ) =>
    doFetch({ url: `${AR_URL}/getPrepareSelectGLAcct`, body }).then(
      ([, res]) => res?.glacctList?.['glacct-list']
    ),
});
