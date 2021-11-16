import React, {useState, useEffect} from 'react'
import {postProduct, getAllCategory} from '../api/ApiHelper';

export default function PostProduct() {


    const [name, setName]=useState('');
    const [description, setDescription]=useState('');
    const [price, setPrice]=useState('');
    const [categoryId, setcategoryId]=useState(-1);
    const [files1, setfiles1]=useState(undefined);
    const [files2, setfiles2]=useState(undefined);
    const [files3, setfiles3]=useState(undefined);
    const [files4, setfiles4]=useState(undefined);

    const [filesShow1, setFileSHow1]=useState(undefined);
    const [filesShow2, setFileSHow2]=useState(undefined);
    const [filesShow3, setFileSHow3]=useState(undefined);
    const [filesShow4, setFileSHow4]=useState(undefined);

    const [fileValue, setFileValue]=useState('')

    // const [updates, setUpdates] = useState(0);
    const [category, setcategory] =useState([]);

    useEffect(()=>{
        getAllCategory().then(res =>{
            setcategory(res.data);
        })
    }, [])


    function posting(id) {
        const setProductDto = new FormData();
        setProductDto.append('name', name);
        setProductDto.append('price', price);
        setProductDto.append('description', description);
        setProductDto.append('categoryId', id);
        setProductDto.append('files', files1);
        setProductDto.append('files', files2);
        setProductDto.append('files', files3);
        setProductDto.append('files', files4);
        postProduct(setProductDto).then(res =>{
            setDescription('')
            setName('')
            setPrice('')
            setcategoryId('')
            setfiles1(undefined)
            setfiles2(undefined)
            setfiles3(undefined)
            setfiles4(undefined)
            setFileSHow1(undefined)
            setFileSHow2(undefined)
            setFileSHow3(undefined)
            setFileSHow4(undefined)
        })
    }


    function handleClick(){
       
        if(categoryId === -1){
            
            if(category != []){
                setcategoryId(category[0].id);
                posting(category[0].id);
            }
        }else{
            posting(categoryId);
        }
    }

    return (
        <div className="container mt-3">
                <div className="justify-content-center">
                        
                        <div className="form-group form-group-lg">
                            <input className="form-control" type="test" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}   placeholder="Enter Product Name" />
                        </div>

                        <div className="form-group form-group-sm">
                            <input className="form-control" type="number" name="price" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="Enter Product Cost" />
                        </div>

                        <div className="form-group form-group-sm">
                            <input className="form-control col-cover-fill" type="text" name="description" value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="Enter other description" />
                        </div>
                        
                    <table className="mt-3 table table-striped text-center table-bordered table-hover table-sm">
                    <thead>
                        <tr>
                            <td>Images</td>
                            <td>See images</td>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><input type="file" placeholder="file1" value={fileValue} onChange={(e) =>{setfiles1(e.target.files[0]); setFileSHow1(URL.createObjectURL(e.target.files[0])); console.log(e.target.files[0]) }}></input></td>
                        <td><img src={filesShow1} height="200px" width="200px" /></td>
                    </tr>
                    <tr>
                        <td width="300px"><input type="file" placeholder="file1" onChange={(e) =>{setfiles2(e.target.files[0]); setFileSHow2(URL.createObjectURL(e.target.files[0])) }}></input></td>
                        <td><img src={filesShow2} height="200px" /></td>
                    </tr>
                    <tr>
                        <td><input type="file" placeholder="file1" onChange={(e) =>{setfiles3(e.target.files[0]); setFileSHow3(URL.createObjectURL(e.target.files[0])) }}></input></td>
                        <td><img src={filesShow3} height="200px" /></td>
                    </tr>
                    <tr>
                        <td><input type="file" placeholder="file1" onChange={(e) =>{setfiles4(e.target.files[0]); setFileSHow4(URL.createObjectURL(e.target.files[0])) }}></input></td>
                        <td><img src={filesShow4} height="200px" /></td>
                    </tr>
                    
                    </tbody>
                </table>

                        <select className="btn btn-info btn-md btn-block mb-3" name="cars" id="cars" onChange={(e)=>{setcategoryId(e.target.value)}}>
                            {
                                category.map(res =>
                                    <option value={res.id}>{res.name}</option>
                                )
                            }
                        </select>
                        
                        
                        <div>
                            <button  className="btn btn-info btn-md btn-block mb-5" onClick={()=>{handleClick()}}>Submit</button>
                        </div>
                </div>
        </div>
    )
}
