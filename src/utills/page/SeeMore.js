import React, {useState, useEffect} from 'react'
import {getProductById, addKarzinka} from '../../api/ApiHelper';

export default function SeeMore(props) {

    const [products, setProducts]=useState();
    const [id, setId]=useState(props.match.params.id);
    const [photoId, setPhotoId]=useState(0);
    const [updates, setUpdates] = useState(0);
    const [summ, setSumm]=useState(1);
    const [summa, setSumma]=useState(0);

    useEffect(()=>{
        getProductById(id).then(res=>{
            setProducts(res.data);
            setSumma(summ*res.data.price);
        })
    }, [updates])

    function changePhoto(params) {
       if(params > 0 && photoId < products.photos.length-1){
            setPhotoId(photoId+params);
       }else if(photoId > 0 && params < 0){
            setPhotoId(photoId+params);
       }
    }

    function sum(params) {
        if(params<0){
            if(summ > 1){
                setSumm(summ+params);
                setSumma((summ-1)*products.price);
            }
        }else{
            setSumm(summ+params);
            setSumma((summ+1)*products.price);
        }
    }

    function addKarzink() {
        const A={
            "product_id": id,
            "product_quantity": summ
        }
        addKarzinka(A).then(res=>{
            props.history.push("/karzinka")
        })
    }

if(products!==undefined){
    return (
        <div className="container mt-4">
            <div className="float-left">
                <ul className="pagination">
                   <li className="page-item mr-3 mt-4"><button className="page-link" onClick={()=>{changePhoto(-1)}}> - </button></li>
                   <li className="page-link"><img src={`http://localhost:8040/auth/image?id=${products.photos[photoId].id}`} alt="Card"  width="300px" height="300px" /></li>
                   <li className="page-item ml-3 mt-4"><button className="page-link" onClick={()=>{changePhoto(+1)}}> + </button></li>
                </ul>
            </div>
            <div className="float-right mt-4">
                    <h2>Name: {products.name}</h2>
                    <p>Description: {products.description}</p>
                    <p>Price: {products.price}  Summa: <span className="bg-warning"> {summa}</span></p>
                    <div className="float-left">
                    <ul className="pagination">
                        <li className="page-item"><button className="page-link" onClick={()=>{sum(-1)}}> - </button></li>
                        <li className="page-link">{summ}</li>
                        <li className="page-item"><button className="page-link" onClick={()=>{sum(+1)}}> + </button></li>
                    </ul>
            </div>
                    <button className="btn btn-primary ml-3" onClick={()=>{addKarzink()}}>Add Karzinka</button>
                    <button className="btn btn-danger ml-3 mr-4">Buy Now</button>
            </div>
        </div>
    )
    }else{
        return(
            <div>n nothing</div>
        )
    }
}
