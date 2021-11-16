import React, {useState, useEffect} from 'react'
import {getAllproduct, getAllCategory, getProductByCategoryId, addKarzinka} from '../../api/ApiHelper';
import { Link, withRouter,} from 'react-router-dom'

export default function ProductPage() {

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

    function addKazrink(id) {
        const A={
            "product_id":id,
            "product_quantity":1
        }
        addKarzinka(A).then(res=>{
            alert("SUCCESS");
        })
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
                                                <p className="card-text">Name: {data.name} , Description: {data.description}</p>
                                                <p className="card-text">Price: {data.price}</p>
                                                <Link className="btn btn-primary mr-2" to={"/seeMore/"+data.id} >See profil</Link>
                                                <button className="btn btn-primary" onClick={()=>{addKazrink(data.id)}}>add Karzinka</button>
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
        </div>
    )
}
