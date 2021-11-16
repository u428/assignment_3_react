import React, {useState, useEffect} from 'react'
import Product from './page/ProductPage'
import {getAllproduct, getAllCategory, deleteProduct, getProductByCategoryId} from '../api/ApiHelper';
import { Link, withRouter} from 'react-router-dom'

export default function Home() {

    const [product, setProducts] = useState([]);
    const [updates, setUpdates] = useState(0);
    const [category, setcategory] =useState([]);
    const [activePage, setActivePage]=useState(1);
    const [limit, setLimit]=useState(6);
    const [totalElements, setTotalElements]=useState(0);
    const [totalPages, setTotalPages]=useState(0);

    useEffect(() =>{
        getAllproduct(limit, activePage).then(response =>{
            setProducts(response.data.content);
            setTotalElements(response.data.totalElements);
            setTotalPages(response.data.totalPages);
        });
        getAllCategory().then(res =>{
            setcategory(res.data);
        })
    }, [updates])

    function deleteProducts(id) {
        deleteProduct(id).then(res=>{
            setUpdates(updates+1);
        })
    }
    function getProductByCategory(id) {
        if(id === "-1"){
            setUpdates(updates+1);
        }else{
            setActivePage(1);
        getProductByCategoryId(id, limit, activePage).then(response=>{
            setProducts(response.data.content);
            setTotalElements(response.data.totalElements);
            setTotalPages(response.data.totalPages);
        })
    }
    }
    function nextPage() {
        if(activePage< totalPages){
            setActivePage(activePage+1);
            setUpdates(updates+1);
        }
    }
    function previousPage(){
        if(activePage > 1){
            setActivePage(activePage -1);
            setUpdates(updates+1);
        }
    }

    return (
        <div className="container mt-3">

<                       select className="btn btn-info btn-md btn-block mb-3" name="cars" id="cars" onChange={(e)=>{getProductByCategory(e.target.value)}}>
                            <option value="-1">All</option>
                            {
                                category.map(res =>
                                    <option value={res.id}>{res.name}</option>
                                )
                            }
                        </select>

                    <div className="form-group">
                    <div className="input-group-prepend">
                        <p className="form-control">Topilganlari</p>
                        <p className="form-control">{totalElements}</p>
                        <p className="form-control">Oxirgi page</p>
                        <p className="form-control">{totalPages}</p></div>
                    </div>
                    
                        {
                

                            product.map(
                                data => {
                                    return(
                                    <div key={data.id} className="container mt-3" style={{display: 'inline-block', width: '340px'}}>
                                        <div className="card" style={{width: "300px", height: '420px'}}>
                                            <img className="card-img-top" src={`http://localhost:8040/auth/image?id=${data.photos[0].id}`} alt="Card" height="200px" />
                                            <div className="card-body">
                                                <h4 className="card-title">ID: {data.id}</h4>
                                                <p className="card-text">Name: {data.name}</p>
                                                <p className="card-text">Description: {data.description}</p>
                                                <Link className="btn btn-primary" to={"/editProduct/"+data.id} >See profil</Link>
                                                <button className="btn btn-danger ml-2" onClick={()=>deleteProducts(data.id)}>Delete Product</button>
                                            </div>
                                        </div>
                                    </div>
                                    )
                            })
                        }

<div>
  <ul className="pagination">
    <li className="page-item"><button className="page-link" onClick={()=>{previousPage()}}> Previous</button></li>
    <li className="page-link">{activePage}</li>
    <li className="page-item"><button className="page-link" onClick={()=>{nextPage()}}>Next</button></li>
  </ul>
</div>



            {/* <Product name={"dawdas"}></Product> */}
        </div>
    )
}
