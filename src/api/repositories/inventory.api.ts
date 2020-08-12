import { DoRequest } from '../config/repository';
const INV_URL = 'vhpINV';
const Common = 'Common'

export interface InventoryEndpoint {
    FetchAPIINV: any,
    FetchCommon: any
}

export default (doFetch: DoRequest): InventoryEndpoint => ({
    FetchAPIINV: (api, body) =>
    doFetch({ url: `${INV_URL}/${api}`, body }).then(
        ([, res]) => res
    ),
    FetchCommon: (api, body) =>
    doFetch({ url: `${Common}/${api}`, body }).then(
        ([, res]) => res
    ),

})
