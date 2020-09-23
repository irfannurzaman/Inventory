import { formatterMoney } from '~/app/helpers/formatterMoney.helper'
import {inputCategory, inputAdditional, UnitPrice} from '../tables/stockItem.table'

export const data_table = (data) => {
    return data.map(items => {
        const result = items['vk-preis'].toString()
            .substring(0, items['vk-preis'].toString().indexOf('.'))
        const last_result = items['vk-preis'].toString()
            .substring(items['vk-preis'].toString().indexOf('.'),
                items['vk-preis'].toString().indexOf('.') + 3)
        const data = {
            artnr: items.artnr,
            bezeich: items.bezeich,
            masseinheit: items.masseinheit,
            inhalt: items.inhalt,
            traubensorte: items.traubensorte,
            'lief-einheit': `${items['lief-einheit']}.00`,
            'min-bestand': items['min-bestand'],
            'ek-aktuell': `${formatterMoney(items['ek-aktuell'])}.00`,
            'ek-letzter': `${formatterMoney(items['ek-letzter'])}.00`,
            'vk-preis': formatterMoney(Number(result)) + last_result,
            lieferfrist: items.lieferfrist,
            fibukonto: items.fibukonto.substring(0, 8)
        }
        return data
    })
}

export const dataArticel = (data) => {
    return data.map(items => ({
        artnrrezept: items.artnrrezept,
        bezeich: items.bezeich.substring(0, 24),
        kategorie: items.kategorie,
        selected: false
    }))
}

export const dataAccount = (data) => {
    return data.map(items => ({
        'acc-type': items['acc-type'],
        activeflag: items.activeflag,
        bezeich: items.bezeich,
        deptnr: items.deptnr,
        fibukonto: items.fibukonto,
        'main-nr': items['main-nr'],
        'subdept-bez': items['subdept-bez'],
        'subdept-nr': items['subdept-nr'],
        selected: false
    }))
}

const keyInput = [
    'endkum', 
    'zwkum',
    'artnr',
    'bezeich',
    'min-bestand',
    'masseinheit',
    'anzverbrauch',
    'masseinheit',
    'fibukonto',
    'traubensorte',
    'masseinheit',
    'sUnit',
    'betriebsnr',
    'traubensorte',
    'inhalt',
    'masseinheit',
    'ek-aktuell',
    'traubensorte',
    'masseinheit',
    'lief-einheit',
    'sUnit',
    'ek-letzter',
    'masseinheit',
    'vk-preis',
    'masseinheit'
]


export const functional_modify = (GET_DATA) => {
    const x = inputCategory
    .concat(
    inputAdditional as any, 
    UnitPrice as any)
    let data = Object.assign(GET_DATA.lArt['l-art'][0], GET_DATA)
    const filterData = x.filter(i => {
        const number = i.width.
        substr(0, i.width.indexOf('px'))
         if (parseInt(number) > 70) {
             return parseInt(number)
         }
    })
    keyInput.map((params, val) => {
        filterData[val].value = data[params]
    })
}

