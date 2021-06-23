export const generateGroupItem = (params) => {
    let result = Object.keys(params).map(function(key) {
        return params[key]
    })
    return result
}

export const cekNumber = (evt) => {
    evt = (evt) ? evt : window.event
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
    } else {
        return true
    }
}


export const calculatePriceRange = (quantity, priceGroup) => {
    if(!quantity) return
    quantity = parseInt(quantity)
    let price = priceGroup.filter(x=>{
        if(quantity <= x.endNumber){
            return x
        } else if(x.endNumber === null){
            return x
        }
    })
    price = price[0]
    let m = price.sellPrice * quantity
    return m
}

export const calculatePriceOthers = (quantity, group) => {
    if(!quantity) return 0
    let price = 0
    group.map(x => {
        x.map(e => {
            price = price + (e.quantity * e.price)
        })
    })

    return price
}

export const calculatePriceFix = (quantity, price) => {
    if(!quantity) return
    return quantity * price
}