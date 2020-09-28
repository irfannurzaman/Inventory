import {use_input} from '../tables/IncomingStock.tables'
import {date} from 'quasar'
const param = [
    'docu-nr',
    'besteller',
    'deparmet',
    'supplier',
    'bestelldatum',
    'billdate',
    'bestellart',
    'gedruckt',
    'currencyScreenValue'
]

export const data_table = (params) => {
    const data = Object.assign(
        params,
        params.tLOrderhdr['t-l-orderhdr'][0]
    )
    const data1 = map_data(data)
    param.map((items, index) => {
        use_input[index].value = data1[items as any]
    })
}

const map_data = (data) => {
    console.log('sukses', data)
    return {
        'docu-nr': data['docu-nr'],
        'besteller': data.besteller,
        'deparmet': data['angebot-lief'][0],
        'supplier': data.supplier,
        'bestelldatum': date.formatDate(data.bestelldatum, 'DD/MM/YY'),
        'billdate': date.formatDate(data.billdate, 'DD/MM/YY'),
        'bestellart': data.bestellart,
        'gedruckt': date.formatDate(data.gedruckt, 'DD/MM/YY'),
        'currencyScreenValue': data.currencyScreenValue
    }
}