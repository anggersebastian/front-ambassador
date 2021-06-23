import {getCookies} from '../helpers/Authentication'
import * as Cookies from 'js-cookie'



export default function (context) {
    let arrLink = ['/login', '/register', '/missing-password', '/reset-password']
    let token = null
    if(process.server){
        let cookie = context.req.headers.cookie
        if(cookie){
            token = getCookies('token', cookie)
            context.store.commit('auth/setToken', token)
            let url = context.req.baseUrl + context.req.path
            if(token == null || token == 'null'){
                context.store.dispatch('auth/destroyed')
                context.store.dispatch('setCart', [])
                if(!arrLink.includes(url)){
                    return context.redirect('/')
                }
            }else{
                if(arrLink.includes(url)){
                    return context.redirect('/')
                }
            }
        }
    } 
    else {
        let token = Cookies.get('token')
        if(!token){
            context.store.dispatch('auth/destroyed')
            context.store.dispatch('setCart', [])
        }
    }
}