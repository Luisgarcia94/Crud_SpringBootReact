package com.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.models.Empleado;
import com.services.EmpleadoService;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST}) //Con esto permitimos comunicacion React Spring
@RequestMapping("/empleado") //Ruta por defecto
public class EmpleadoController {
    
    @Autowired //Inyeccion de dependencias para poder usar nuestros métodos creados en Empleado Service
    EmpleadoService empleadoService;

    @RequestMapping("/mostrar")
    public List<Empleado> mostrarEmpleados(){

        List<Empleado> listaDeEmpleados = empleadoService.mostrarEmpleados();
        return listaDeEmpleados;
    }

    @PostMapping("/guardar")
    public String guardarEmpleado(@RequestBody Empleado empleado){

        empleadoService.guardarEmpleado(empleado);
        return "Empleado guardado con exito";
        
    }

    @PostMapping("/editar/{id}")
    public String editarEmpleado(@RequestBody Empleado empleado, @PathVariable("id") Long id) {
        
        Empleado empleadoDesactualizado = empleadoService.buscarEmpleado(id);
        empleadoDesactualizado.setApellido(empleado.getApellido());
        empleadoDesactualizado.setComuna(empleado.getComuna());
        empleadoDesactualizado.setRegion(empleado.getRegion());
        empleadoDesactualizado.setNombre(empleado.getNombre());
        empleadoDesactualizado.setFechaNacimiento(empleado.getFechaNacimiento());
        empleadoDesactualizado.setTelefono(empleado.getTelefono());
        empleadoDesactualizado.setCorreo(empleado.getCorreo());
        empleadoService.guardarEmpleado(empleadoDesactualizado); //Ya no está desactualizado, sobre escrito.
        return "Datos actualizados";

    }

    @RequestMapping("/eliminar/{id}")
    public void eliminarEmpleado(@PathVariable("id") Long id){

        empleadoService.eliminarEmpleado(id);
    }


}
