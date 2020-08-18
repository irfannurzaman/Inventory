
export const dataIncomingJournalizing = (GET_DATA?, prepare?) => {
    const data = (key, GET_DATA?) => ({
        date: key == 'prepare' ? new Date('01-14-2019') :  new Date(),
        hasilCredit: key == 'prepare' ? 0 : GET_DATA.credits,
        hasilDebit: key == 'prepare' ? 0 : GET_DATA.debits,
        lebelSearch: key == 'prepare' ? 'search' : 'journalizing',
        disableButton: key == 'search' ? 
        GET_DATA.credits == GET_DATA.debits ? false : true : false,
        referenceNumber: key == 'search' ? 
        GET_DATA.searches.referenceNumber : '',
        discription: key == 'search' ? 
        GET_DATA.searches.discription : '',
        disableData: key == 'prepare' ? false : true
    })    
    if (prepare == 'prepare') {
        return data('prepare')
    } else {
        return data('search', GET_DATA)
    }
}

export const paramsReorg = (val) => ({
    userInit: '01',
    arrayNr: 41,
    expectedNr: val
})

export const paramsIncomingJournalizing = () => ({
    pvILanguage: 0,
    linkOut: true,
    linkIn: true,
    fromGrp: 0,
    fromDate: '01/02/19',
    toDate: '01/02/19',
    userInit: 0,
})

export const paramscheckPermission = (val) => ({
    userInit: val.userInit,
    arrayNr: 41,
    expectedNr: 2
})

export const paramsglLinkstock2 = (val) => ({
    gList: {
        'g-list': [{
            'fibukonto': val['acct-fibukonto'],
            'debit': val.debit,
            'credit': val.credit,
            'bemerk': val.bemerk,
            'userinit': val.userinit,
            'zeit': val.zeit,
            'add-note': val['add-note']
        }]
    }
})

export const linkstock_check_refnobl = () => ({
    'refno': '02076230',
    'jtype': 0
})