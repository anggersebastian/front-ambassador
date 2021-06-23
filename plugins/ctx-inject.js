import * as Cookies from 'js-cookie'

export default ({ app }, inject) => {
    inject('productNote', (note) => {
        if(note !== '' && note !== null){
            let cek = note.slice(-1)
            if(cek === ','){
                note = note.substring(0, note.length - 1)
            }
            let set = note.split(',')
    
            let result = []
            set.map((x) => {
                let extract = x.split('=')
                var quantity = ''
                if(extract[1]){
                    quantity = extract[1] !== '' ? extract[1]+' pcs' : '1 pcs'
                }
                result.push({
                    notes : extract[0],
                    quantity : quantity
                })
            })
            return result
        }
        return ['Note not defined']
    })

    inject('formatNumber', (params) =>{
        params = parseFloat(params)
        let genAngka = params.toFixed(2)
        genAngka = genAngka.split('.')
        if(genAngka.length > 1){
            params = genAngka[0]
        }
        let reverse = params.toString().split('').reverse().join('')
        let ribuan = reverse.match(/\d{1,3}/g)
        if(ribuan == null){
            return ribuan = 0   
        }
        ribuan = ribuan.join('.').split('').reverse().join('')
        return ribuan
    })

    inject('maxString', (stringSentence, lengthSentence) => {
        if(stringSentence == null) return stringSentence
        if (stringSentence.length > lengthSentence) {
            return stringSentence.substr(0, lengthSentence) + '...'
        }
        return stringSentence
    })

    inject('currencyType', () => {
        let params = Cookies.get('currency')
        switch (params) {
            case 'idr':
                    return 'Rp '
                break
            case 'usd':
                    return '$ '
                break
            case 'php':
                    return 'PHP '
                break
            case 'yuan':
                    return '元 '
                break
        
            default:
               return 'Rp '
        }
    })

    inject('generateBanner', (url)=> {
        return url.replace('150x150', '400x400')
    })

    inject('capitalizeFirstLetter', (params) => {
        params = params.toLowerCase()
        const newStr = params.replace(/^./, v => v.toUpperCase())
        return newStr
    })

    inject('checkNumber', (evt)=>{
        evt = (evt) ? evt : window.event
        if(evt.key == '.') return true
        var charCode = (evt.which) ? evt.which : evt.keyCode
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
            evt.preventDefault()
        } else {
            return true
        }
    })
}