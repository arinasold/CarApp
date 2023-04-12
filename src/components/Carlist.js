import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import AddCar from './AddCar';
import EditCar from './EditCar';
import { API_URL } from '../constants';

function Carlist(){

    const [cars, setCars] = useState([]);
    useEffect(()=> {
       getCars();
    },[]);

    const [open, setOpen] = useState(false);

    const[msg, setMsg] = useState('');

    const getCars = () => {
        fetch(API_URL)
        .then(response => response.json())
        .then(data =>setCars(data._embedded.cars))
        .catch(err => console.error(err))
    }

    const deleteCar = (params) => {
        if (window.confirm('Are you sure')) {

        fetch(params.data._links.car.href, {method: 'DELETE'})
        .then(response =>{
            if (response.ok) {
            setMsg('Car deleted');
            getCars();
            setOpen(true);
            }
            else {
            alert("Something went wrong in deletion: " + response.status);
            }
        })
        .catch(err => console.error(err))
    }
    }

    const addCar = (car) => {
        fetch(API_URL, {
            method: 'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(car)
        })
        .then(response =>{
            if (response.ok)
            getCars();
            else
            alert('Something went wrong!')
        })
        .catch(err => console.error(err))

    }

    const updateCar = (url, updateCar) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(updateCar)
        })
        .then(response =>{
            if(response.ok){
            getCars();
            setMsg('Car updated');
            setOpen(true);}
            else
            alert('Something went wrong!' + response.statusText)
        })
        .catch(err => console.error(err))

    }

    const [columnDefs] = useState([
        {field: 'brand', sortable: true, filter: true},
        {field: 'model', sortable: true, filter: true},
        {field: 'color', sortable: true, filter: true, width:150},
        {field: 'fuel', sortable: true, filter: true, width:150},
        {field: 'year', sortable: true, filter: true, width:100},
        {field: 'price', sortable: true, filter: true, width:150},
        {cellRenderer: params => <EditCar updateCar={updateCar} params={params.data} />, width: 120
        
        },
        {cellRenderer: params => 
        <Button size='small' color='error' onClick={() => deleteCar(params)}>
            Delete
        </Button>, 
        width: 120} //käytä ikoni projektissa
    ])

    return(
        <>
        <AddCar addCar={addCar}/>
        <div className="ag-theme-material" style={{height: 600, width: '90%', margin: 'auto'}}>
        <AgGridReact
        pagination={true}
        paginationPageSize={10}
        rowData={cars}
        columnDefs={columnDefs}        
        />
        </div>
        <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={msg}
        />
        </>
    );
}

export default Carlist;