import React, {useState, useEffect} from 'react'

export default function PopUp(props) {

    const [inputType, setInputType]=useState('');
    
   

    return (
        <div className="position-absolute"  tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4>You have to pay {props.all} in 20 minute</h4>
                    <button className="btn btn-secondary close" onClick={()=>{props.opening()}}> &times;</button>
                    </div>
                    <div className="modal-body">
                        <input  type="number" className="form-control" value={inputType} onChange={(e)=>{setInputType(e.target.value)}} placeholder="Enter Payment Summa" required/>
                        <button className="btn btn-secondary" onClick={()=>{props.buy(inputType)}}>Payment</button>
                    </div>
                </div>
            </div>
        </div>
    )

}
