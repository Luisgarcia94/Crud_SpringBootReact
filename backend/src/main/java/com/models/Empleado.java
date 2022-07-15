package com.models;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "empleados")
public class Empleado {

    
    
    public Empleado() {
    }

    
    public Empleado(@NotNull String nombre, @NotNull String apellido, @NotNull String correo, LocalDate fechaNacimiento,
            @NotNull String telefono, @NotNull String comuna,@NotNull String region) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.comuna = comuna;
        this.region = region;
    }


    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @NotNull
    private String nombre;

    @NotBlank
    @NotNull
    private String apellido;

    @NotBlank
    @NotNull
    private String correo;
    
    @NotNull
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private LocalDate fechaNacimiento; //Localdate para que no me guarde la hora 

    @NotBlank
    @NotNull
    private String telefono;

    @NotBlank
    @NotNull
    private String comuna;

    @NotBlank
    @NotNull
    private String region;

    @Column (updatable = false) //esta columna nunca se actualizará en el sistema 
    private Date createdAt;
    
    private Date updatedAt;
    
        //insertará en el atributo la fecha ANTES de insertar a base de datos
        @PrePersist
        protected void onCreate(){
            this.createdAt = new Date();
        }
        @PreUpdate
        protected void onUpdate(){
            this.updatedAt = new Date();
        }


        public Long getId() {
            return id;
        }


        public void setId(Long id) {
            this.id = id;
        }


        public String getNombre() {
            return nombre;
        }


        public void setNombre(String nombre) {
            this.nombre = nombre;
        }


        public String getApellido() {
            return apellido;
        }


        public void setApellido(String apellido) {
            this.apellido = apellido;
        }


        public String getCorreo() {
            return correo;
        }


        public void setCorreo(String correo) {
            this.correo = correo;
        }


        public LocalDate getFechaNacimiento() {
            return fechaNacimiento;
        }


        public void setFechaNacimiento(LocalDate fechaNacimiento) {
            this.fechaNacimiento = fechaNacimiento;
        }


        public String getTelefono() {
            return telefono;
        }


        public void setTelefono(String telefono) {
            this.telefono = telefono;
        }


        public String getComuna() {
            return comuna;
        }


        public void setComuna(String comuna) {
            this.comuna = comuna;
        }


        public String getRegion() {
            return region;
        }


        public void setRegion(String region) {
            this.region = region;
        }

        
}
