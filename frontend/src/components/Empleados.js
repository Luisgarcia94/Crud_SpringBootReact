import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from "react";
import { Form } from "react-bootstrap";
import listaComunas from './Comunas.js';

function Empleados(){

    // Generamos estados 
    const[info,setInfo] = useState([]) //Ocuparemos este estado para poder recibir nuestra lista de tipo empleado en BD; 

    const[nombre,setNombre] = useState(""); 
    const[apellido,setApellido] = useState(""); 
    const[correo,setCorreo] = useState(""); 
    const[fechaNacimiento,setFechaNacimiento] = useState(""); 
    const[telefono,setTelefono] = useState(""); 
    const [region, setRegiones] = useState("");
    const [comunas, setComunas] = useState([]);
    const [comuna, setComuna] = useState("");

    const[validacionEditar,setValidacionEditar] = useState(false); //Cuando apretemos editar, se intercambiara el boton con agregar
    const [idModificado,setIdModificado] = useState(0); //id modificado para la edicion

    useEffect(()=>{
        cargaDeDatos(); //llamado a la funcion que nos trae la base datos
    },[])

    const handleFromRegiones = (e) => {  //Metodo para lista desplegable
        const region = listaComunas.find(
        (region) => region.region === e.target.value
        );
        setRegiones(region.region);
        setComunas(region.comunas); 
        }

    //Esta función es para que podamos capturar la opcion de comuna, ya que el setComunas(en plural), nos devueve un arreglo y no la opción
    const handlerChangeComuna = (e)=>{
        setComuna(e.target.value);
    }

    //Funciones CRUD 

    //Create
    const agregarEmpleado = async(e) => {
        e.preventDefault(); //con esto evitamos que la página se recargue 
        await axios.post('http://localhost:8080/empleado/guardar',{
        nombre,
        apellido,
        correo,
        fechaNacimiento,
        telefono,
        region,
        comuna
        });
        cargaDeDatos(); //desplegar dato una vez guardado 
    };

    //Read
    const cargaDeDatos = async() =>{
        const respuesta = await axios.get('http://localhost:8080/empleado/mostrar'); //esperar una respuesta
        setInfo(respuesta.data);
    }

    //Delete
    const eliminarEmpleado = async(id) => {
        await axios.get(`http://localhost:8080/empleado/eliminar/${id}`);
        cargaDeDatos();
    }

    const modificarValidacion = async(id) =>{

        setValidacionEditar(true);  
        setIdModificado(id);     
    }

    //Update
    const editarEmpleado = async(e) =>{
        e.preventDefault(); //evitamos que página recargue datos
        await axios.post(`http://localhost:8080/empleado/editar/${idModificado}`,{
            nombre,
            apellido,
            correo,
            fechaNacimiento,
            telefono,
            region,
            comuna
        })   
        
        cargaDeDatos();
        setValidacionEditar(false);
    }
        return (
        <div className='container'>
            <h1 className='text-center'>Prueba Técnica Crud</h1>
            <div className='row'>  
                <div className="col-3">
                    <h3 className='text-center '>Formulario</h3>
                    <form className='bg-light rounded p-2'>
                    <div className="mb-3">
                        <label className="form-label" >Nombre</label>
                        <input type="text" className="form-control" onChange={(e)=>setNombre(e.target.value)} autoComplete='off'/>
                        <label className="form-label">Apellido</label>
                        <input type="text" className="form-control" onChange={(e)=>setApellido(e.target.value)} autoComplete='off'/>
                        <label className="form-label">Correo</label>
                        <input type="email" className="form-control" onChange={(e)=>setCorreo(e.target.value)} autoComplete='off'/>
                        <label className="form-label">Fecha de nacimiento</label>
                        <input type="date" className="form-control" onChange={(e)=>setFechaNacimiento(e.target.value)} autoComplete='off'/>
                        <label className="form-label">Telefono</label>
                        <input type="text" className="form-control mb-4"onChange={(e)=>setTelefono(e.target.value)} autoComplete='off'/>
                        <Form.Group controlId="custom-select">
                        <Form.Control
                            as="select"
                            className="rounded-0 shadow mb-4"
                            onChange={(e) => handleFromRegiones(e)}
                        >
                            <option className="d-none" value="">
                            Selecciona Region
                            </option>
                            {listaComunas.map((region, key) => (
                            <option key={key} value={region.region} >
                                {region.region}
                            </option>
                                        ))}
                            </Form.Control>
                            <Form.Control onChange={handlerChangeComuna} as="select" className="rounded-0 shadow">
                                <option className="d-none" value="">
                                Selecciona Comuna
                                </option>
                                {comunas.map((comuna, key) => (
                                <option key={key} title="" value={comuna}>
                                    {comuna}
                                </option>
                                ))}
                            </Form.Control>
                            </Form.Group>        
                        </div>  
                        {validacionEditar ?  //operador ternario, equivalente al if "si validacionEditar es true,muestra el boton de edicion, si no, solo muestra el boton de agregar"
                        (<td><button className='btn btn-warning' onClick={(e)=>editarEmpleado(e)} >Editar</button></td>) 
                        : (<td><button  className='btn btn-primary' onClick={(e)=>agregarEmpleado(e)}>Agregar Usuario</button></td>) 
                        }  
                        
                        </form>
                </div>
                <div className='col-9'>
                    <h3 className='text-center'>Lista de empleados</h3>
                    <table className="table table-Secondary table-bordered table-hover table-responsive table-dark table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Fecha de nacimiento</th>
                                <th>Region</th>
                                <th>Comuna</th>
                                <th>Telefono</th>
                                <th>Modificar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                info.map(fila=>
                                    <tr>
                                    <td >{fila.nombre}</td>
                                    <td>{fila.apellido}</td>
                                    <td>{fila.correo}</td>
                                    <td>{fila.fechaNacimiento}</td>
                                    <td>{fila.region}</td>
                                    <td>{fila.comuna}</td>
                                    <td>{fila.telefono}</td>
                                    <td><button className='btn btn-warning' onClick={ () => modificarValidacion(fila.id)}>Editar</button></td>
                                    <td><button className='btn btn-danger' onClick={ () => eliminarEmpleado(fila.id)}>Eliminar</button></td>
                                </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>  
            </div>
        </div>
    );
}

export default Empleados;
