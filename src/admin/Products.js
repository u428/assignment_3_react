import React, {useState, useEffect} from 'react';
import {getProductById, deleteProductPhoto, changeProductPhoto} from '../api/ApiHelper';

export default function Products(props) {
    const [product, setProduct] = useState([]);
    const [photos, setPhotos]=useState([])
    const [id, setId]=useState(props.match.params.id);
    const [updates, setUpdates] = useState(0);
    const [file, setFile]=useState();

    useEffect(()=>{
        getProductById(id).then(res=>{
            setProduct(res.data);
            setPhotos(res.data.photos);
        })
    }, [updates])

function deleteProductPhotos(id) {
    deleteProductPhoto(id).then(res=>{
        setUpdates(updates+1);
    })
}

function changeProdctPhoto(id) {
    const formFile = new FormData();
    formFile.append("multipartFile", file);
    changeProductPhoto(id, formFile).then(res=>{
        setUpdates(updates+1);
    })
}

    return (
        <div>
           <table className="mt-3 table table-striped text-center table-bordered table-hover table-sm">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Images</td>
                            <td>Functions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            photos.map(
                                photo => {
                                    return(
                                <tr key={photo.id}>
                                    <td>{photo.id}</td>
                                    <td><img src={`http://localhost:8040/auth/image?id=${photo.id}`} alt="Card" height="250px" width="600px"/></td>
                                   
                                    <td>
                                        <button className="btn btn-primary" onClick={()=>deleteProductPhotos()}>Delete this one</button>
                                        <div>
                                            <input type="file" placeholder="file2" onChange={(e) =>{setFile(e.target.files[0])}}></input>
                                        </div>
                                        <button className="btn btn-primary" onClick={()=>changeProdctPhoto(photo.id)}>Change Product Photo</button>    
                                        </td>                                        
                                    </tr>
                                    )
                            })
                        }
                    </tbody>
                </table>
        </div>
    )
}
