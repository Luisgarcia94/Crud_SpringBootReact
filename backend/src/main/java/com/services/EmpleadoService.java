package com.services;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.models.Empleado;
import com.repositories.EmpleadoRepository;

@Service
public class EmpleadoService {

    @Autowired
    EmpleadoRepository empleadoRepository;

    //En el service, con la inyeccion de dependencias podremos llamar
    //a los métodos de JPA repository, con el fin de realizar el CRUD (SAVE,FindAll,FindById,Delete)

   public List<Empleado> mostrarEmpleados(){
    return empleadoRepository.findAll();
   }

   public void guardarEmpleado(@Valid Empleado empleado){

    empleadoRepository.save(empleado);
   }

   public Empleado buscarEmpleado(Long id){
    return empleadoRepository.findById(id).get();
   }

   public void eliminarEmpleado(Long id){
    empleadoRepository.deleteById(id);
   }

    
}
