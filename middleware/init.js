import * as Cookies from 'js-cookie'
import {getCookies} from '../helpers/Authentication'

let lang, currency
export default function (context) {
    if(process.server){
        let expired = new Date
        expired.setDate(expired.getDate() + (30 || 365))
        let cookie = context.req.headers.cookie
        if(!cookie){
            context.res.setHeader('Set-Cookie', [`currency=idr;expires=${expired};`, `lang=en;expires=${expired};`])
        } else {
            if(!getCookies('lang', cookie) || !getCookies('currency', cookie)){
                context.res.setHeader('Set-Cookie', [`currency=idr;expires=${expired};`, `lang=en;expires=${expired};`])
            }
        }
    } else {
        lang = Cookies.get('lang')
        currency = Cookies.get('currency')
    
        if(!lang){
            Cookies.set('lang', 'en', { expires: 30})
        }
    
        if(!currency){
            Cookies.set('currency', 'idr', { expires: 30})
        }
    }
}