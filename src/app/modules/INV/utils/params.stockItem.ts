import { formatterMoney } from '~/app/helpers/formatterMoney.helper'


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