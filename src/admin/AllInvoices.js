import React, {useState, useEffect} from 'react'
import {getAllInvoices} from '../api/ApiHelper';

export default function AllInvoices() {

    const [invoices, setinvoices]=useState([])
    const [update, setupdate]=useState(0);



    useEffect(()=>{
        getAllInvoices().then(res =>{
            const myData = [].concat(res.data)
                .sort((a, b) => a.id < b.id ? 1 : -1)
            setinvoices(myData);
        })
    }, [update])


    return (
        <div>
            <table className="mt-3 table table-striped text-center table-bordered table-hover table-sm">
                    <thead>
                        <tr>
                            <td>IMAGE</td>
                            <td>NAME</td>
                            <td>SUMMA</td>
                            <td>DATE</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           invoices && invoices.map((invoice, ind)=>{
                               return(
                                   <>
                                   <tr>
                                   <td colSpan="4" >Customer Id: <span className="bg-light h5">{invoice.customerId}</span>  &nbsp; &nbsp; On &nbsp;  <span className="bg-light h3">{invoice.date}</span> &nbsp; date amount is &nbsp; <span className="bg-warning h3">{invoice.invoice.amount}</span></td>
                                   </tr>
                                   {
                                invoice.details.map((detail, index)=>{
                                    return(
                                        <tr key={index}>
                                            <td width="200px"><img className="card-img-top" src={`http://localhost:8040/auth/image?id=${detail.product.photos[0].id}`} alt="Card" height="100px"/></td>
                                            <td>{detail.product.name} : {detail.product.description}</td>
                                            <td>{detail.product.price} * {detail.quantity} = {detail.product.price*detail.quantity}</td>
                                            <td>{invoice.date}</td>
                                        </tr>
                                    )
                                })
                                }
                                
                                <td colSpan="4"><hr style={{border: '1px solid black'}}></hr></td>
                                </>
                               );
                           })
                        }
                    </tbody>
                </table>
        </div>
    )
}
