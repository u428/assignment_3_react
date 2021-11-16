import axios from 'axios';
import {ACCESS_TOKEN} from '../constants/enams';

const request = (options) => {
    // const header =new Headers({
    //     Accept: "application/json; charset=utf-8",
    //     "Content-Type":"application/json; charset=utf-8"
    // });
   
    const header =new Headers({});
        // header.append('Authorization', localStorage.getItem(ACCESS_TOKEN));
        // console.log(header);
        // let header;
        if(localStorage.getItem(ACCESS_TOKEN)){
            // header={
            //     'Authorization': localStorage.getItem(ACCESS_TOKEN)
            // }
            header.append('Authorization', localStorage.getItem(ACCESS_TOKEN));
        }
    // const defaults = {headers: header};
    // const option = Object.assign(options, defaults);
    if(options.method==='GET'){
        return axios.get(options.url,{headers: header})
            // .then(response => 
            //     response.json().then(json => {
            //         console.log(json);
            //         console.log(response);
            //         if(!response.ok) {
            //             return Promise.reject(json);
            //         }
            //         return json;
            //     })
            // );
    }else if(options.method === 'POST'){
        return axios.post(options.ur,options.body,{headers: header})
            // .then(response => {console.log(response)}
                // response.json().then(json => {
                //     console.log(json);
                //     if(!response.ok) {
                //         return Promise.reject(json);
                //     }
                //     return json;
                // })
            // );
    }else if(options.method==='PUT'){
        
        return axios.put(options.url, options.body,{headers:  header})
            // .then(response => 
            //     response.json().then(json => {
            //         if(!response.ok) {
            //             return Promise.reject(json);
            //         }
            //         return json;
            //     })
            // );
    }else{
        return axios.delete(options.url, {headers: header})
    }
    
};

export function loginApi(loginRequest) {
    return request({
        url: "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signUpApi(signupRequest) {
    return request({
        url: "/auth/signUp",
        method: 'POST',
        body: signupRequest
    });
}

export function checkPhone(phone) {
    return request({
        url: "/auth/checkTelNomer?tel=" + phone,
        method: 'GET'
    });
}

export function getCurrentUser() {
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/all/getCurrentCustomer",
            method: 'GET'
        });
    }
    return;
}
export function getUserRole(){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/all/getRole",
            method: 'GET'
        });
    }
    return;
}

export function getAllproduct(limit, activePage){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/all/getProducts?limit="+limit+"&page="+activePage,
            method: 'GET'
        });
    }
    return;
}

export function getProductById(id){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/all/getproduct?id="+id,
            method: 'GET'
        });
    }
    return;
}

export function postProduct(sendBody){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/admin/addProduct",
            method: 'POST',
            body:sendBody
        });
    }
    return;
}
export function deleteProduct(produtId){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/admin/deleteProduct?id="+produtId,
            method: 'DELETE'
        });
    }
    return;
}

export function deleteProductPhoto(photoId){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/admin/deleteProductPhoto?id="+photoId,
            method: 'DELETE'
        });
    }
    return;
}
export function changeProductPhoto(photId, photo){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/admin/changeProductPhoto?productPhotoId="+photId,
            method: 'PUT',
            body: photo
        });
    }
    return;
}

export function getAllCategory(){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/all/getAllCategory",
            method: 'GET'
        });
    }
    return;
}

export function postCategory(categoryName){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/admin/addCategory?categoryName="+categoryName,
            method: 'POST'
        });
    }
    return;
}

export function putCategory(id, categoryName){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/admin/putcategory?id="+id+"&categoryName="+categoryName,
            method: 'PUT'
        });
    }
    return;
}

export function deleteCategory(categoryId){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/admin/deleteCategory?id="+categoryId,
            method: 'DELETE'
        });
    }
    return;
}

export function getProductByCategoryId(id, limit, activePage){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/all/sortProductByCategory?id="+id+"&limit="+limit+"&page="+activePage,
            method: 'GET'
        });
    }
    return;
}

export function getAllPayments(){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/admin/allPayments",
            method: 'GET'
        });
    }
    return;
}
export function getAllInvoices(){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/admin/allInvoices",
            method: 'GET'
        });
    }
    return;
}
export function addKarzinka(product){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/customer/addKarzinka",
            method: 'POST',
            body:product
        });
    }
    return;
}
export function getKarzinka(){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/customer/getKarzinka",
            method: 'GET'
        });
    }
    return;
}

export function deleteDetails(id){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/customer/deleteDetails?id="+id,
            method: 'DELETE'
        });
    }
    return;
}
export function updateDetails(id, quantity){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/customer/updateDetails?id="+id+"&quantity="+quantity,
            method: 'PUT'
        });
    }
    return;
}

export function payment(){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/customer/payment",
            method: 'GET'
        });
    }
    return;
}
export function buy(input){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/customer/buy?summa="+input,
            method: 'POST'
        });
    }
    return;
}

export function getAllInvoice(){
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return request({
            url: "/customer/getAllInvoices",
            method: 'GET'
        });
    }
    return;
}