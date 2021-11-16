import React, {useEffect, useState} from 'react'
import {getAllCategory, deleteCategory, postCategory, putCategory} from '../api/ApiHelper';

export default function PostCategory() {

    const [category, setcategory] =useState([]);
    const [categoryName, setcategoryName] =useState('');
    const [id, setId] =useState(0);
    const [updates, setUpdates] = useState(0);

    useEffect(()=>{
        getAllCategory().then(res =>{
            setcategory(res.data);
        })
    }, [updates])

    function handle(){
        if(id === 0 && categoryName!==''){
        postCategory(categoryName).then(res =>{
            setcategoryName('');
            setUpdates(updates+1);
        });
    }else if(categoryName!==''){
        putCategory(id, categoryName).then(res =>{
           setUpdates(updates+1);
           setcategoryName('');
           setId(0);
        })
    }
    }
    function deleteCategories(id){
        deleteCategory(id).then(res =>{
            setUpdates(updates+1);
        })
    }

    return (
        <div>
            <table className="mt-3 table table-striped text-center table-bordered table-hover table-sm">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>NAME</td>
                            <td>Functions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            category.map(
                                category => {
                                    return(
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                    <td><button className="btn btn-outline-danger btn-sm mr-sm-2" onClick={()=>{ console.log("object"); deleteCategories(category.id)}}>delete</button>
                                        <button className="btn btn-outline-info btn-sm mr-sm-2" onClick={()=>{setId(category.id); setcategoryName(category.name)}}>
                                            Edit
                                        </button>
                                        {/* <button className="btn btn-outline-primary btn-sm mr-sm-2" onClick={()=>this.DownloadImage(pecategoryrsons.fileName)}>Download Image</button> */}
                                        </td>
                                        
                                </tr>
                                    )
                            })
                        }
                    </tbody>
                </table>

                <div className="container mt-3">
                <div className="justify-content-center">
                        
                        
                        <div className="form-group form-group-lg">
                            <input className="form-control" type="test" name="categoryName" value={categoryName} onChange={(e)=>{setcategoryName(e.target.value)}} placeholder="Enter Product Name" />
                        </div>
                        
                        <div>
                            <button  className="btn btn-info btn-sm btn-block" onClick={()=> handle()}>Submit</button>
                        </div>
                </div>
        </div>
        </div>
    )
}
