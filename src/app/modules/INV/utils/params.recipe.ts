import {formatterMoney} from '~/app/helpers/formatterMoney.helper'
import {date} from 'quasar'

export const DATA_RECIPE = (GET_DATA) => {
    const data = GET_DATA.tHRezept['t-h-rezept'].map((item, i) =>
    Object.assign({}, item, GET_DATA.costList['cost-list'][i])
    );
    return data.map((data) => {
        const result = data.cost / data.portion
        const result1 = result.toString()
        .substring(0, result.toString().indexOf('.') + 3)
        const result2 = formatterMoney(parseInt(result1))
        return {
        artnrrezept: data.artnrrezept,
        betriebsnr: data.betriebsnr,
        bezeich1: data.bezeich.substring(0, 24),
        bezeich2: data.bezeich.substring(24),
        cost: formatterMoney(data.cost),
        datumanlage: date.formatDate(data.datumanlage, 'DD/MM/YY'),
        datummod: date.formatDate(data.datummod, 'DD/MM/YY'),
        kategorie: data.kategorie,
        portion: data.portion,
        CostPortion: result2.toString().replace('.00','')+
        result1.substring(result1.indexOf('.'))
    }
})}