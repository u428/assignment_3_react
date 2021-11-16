import React, {useState, useEffect} from 'react'
import {getKarzinka, payment, deleteDetails, updateDetails, buy} from '../../api/ApiHelper'; 
import PopUp from './PopUp';


export default function Karzinka() {

    const [updates, setUpdates] = useState(1);
    const [orders, setOrders] = useState(undefined);
    const [summ, setSumm]=useState(0);
    const [open, setOpen]=useState(false);

    useEffect(() =>{
        getKarzinka().then(res=>{
            const myData = [].concat(res.data)
    .sort((a, b) => a.id > b.id ? 1 : -1)
            setOrders(myData);
            summa(res.data);
        });
        
    }, [updates])

    function deleteDetail(id) {
        deleteDetails(id).then(res=>{
            setUpdates(updates+1);
            if(open){setOpen(!open)}
        })
    }

    function updateDetail(id, quantity, other) {
        if(quantity > 1 && !other){
            quantity=quantity-1;
            updateDetails(id, quantity).then(res=>{
                setUpdates(updates+1);
            });
            
        }else if(other){
            quantity=quantity+1;
            updateDetails(id, quantity).then(res=>{
                setUpdates(updates+1);
            });
        }
    }

    function summa(data){
        let summa=0;
        data.map(date=>{
            summa=summa+date.quantity*date.product.price;
            setSumm(summa);
        })
    }

    function isOpen() {
        setOpen(!open);
    }

    function payments(){
        if(!open){
            payment().then(res=>{
                setOpen(true);
            });
        }
    }
    function buying(input) {
        buy(input).then(res=>{
            alert("SUCCESS");
            setOpen(!open);
            setOrders([]);
            setUpdates(updates+1);
        })
    }
   

if(orders !== undefined){
    return (
        <div className="container mt-3">

{open ? <PopUp opens={open} opening={isOpen} buy={buying} all={summ}></PopUp> :null}
            <div className="form-group">
                <div className="input-group-prepend">
                    {/* <p className="form-control">Jami</p> */}
                    <p className="form-control">Jami: {summ}</p>
                    {/* <p className="form-control"></p> */}
                    <button className="form-control btn btn-primary" onClick={()=>{payments()}}>Tolov qilish</button>
                </div>
            </div>

            

            <table className="mt-3 table table-striped text-center table-bordered table-hover table-sm">
                    <thead>
                        <tr>
                            <td>IMAGE</td>
                            <td>NAME</td>
                            <td>Functions</td>
                            <td>DELETE</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           orders.map((order, index)=>{
                            return(
                                <tr key={index}>
                                    <td width="300px"><img className="card-img-top" src={`http://localhost:8040/auth/image?id=${order.product.photos[0].id}`} alt="Card"  width="100px" height="100px" /></td>
                                    <td>{order.product.name} <br></br>{order.product.description}</td>
                                    <td> 
                                        {order.product.price}
                                        <div>
                                            <ul className="pagination">
                                                <li className="page-item"><button className="page-link" onClick={()=>{updateDetail(order.id, order.quantity, false)}}>-</button></li>
                                                <li className="page-link">{order.quantity}</li>
                                                <li className="page-item"><button className="page-link" onClick={()=>{updateDetail(order.id, order.quantity, true)}}>+</button></li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td><button className="btn btn-primary" onClick={()=>{deleteDetail(order.id)}}>X</button></td>
                                </tr>
                            );
                           })
                        }
                    </tbody>
                </table>
        </div>
        
    )
    }else {
        return(
            <div className="container mt-3">
                <table className="mt-3 table table-striped text-center table-bordered table-hover table-sm">
                        <thead>
                            <tr>
                                <td>IMAGE</td>
                                <td>NAME</td>
                                <td>Functions</td>
                                <td>DELETE</td>
                            </tr>
                        </thead>
                </table>
                Nothing on fount
            </div>
            
        )
    }
}
