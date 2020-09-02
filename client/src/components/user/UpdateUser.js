import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {saveNewUser, setRedirectOff} from "../../actions/index"
import swal from 'sweetalert';

//COMPONENTE PARA TERMINAR DE CREAR EL USUARIO
export  class UpdateUser extends React.Component {
  constructor(props) {
    //PROPIEDADES DEL USUARIO
    super(props);
    this.state={
      email:"",
      password:"",
      nombre:"",
      apellido:"",
      calle:"",
      numero:"",
      departamento:"",
      localidad:"",
      provincia:"",
      telefono1:"",
      telefono2:""
    };
  }

  //MANEJO DEL ESTADO DE LOS INPUTS
  handleInputChange(e){
    this.setState({[e.target.name]:e.target.value})
}

//FUNCION QUE GUARDA LOS DATOS DEL USUARIO
saveData(e){
  e.preventDefault()
  let data = {
    email: this.props.newUser.email,
    password: this.props.newUser.password,
    nombre:this.state.nombre,
    apellido:this.state.apellido,
    calle:this.state.calle,
    numero:this.state.numero,
    departamento:this.state.departamento,
    localidad:this.state.localidad,
    provincia:this.state.provincia,
    telefono1:this.state.telefono1,
    telefono2:this.state.telefono2
  }

  //GUARDA LOS DATOS EN LA BASE DE DATOS
  axios.post(`http://localhost:3001/users`, data)
  .then(res => {
    //CREADO!!
    if(res.status === 201){
      swal ({
        title: "Usuario creado!",
        icon: "success"})
        return;
    }  
  })
  //MANEJO DE ERRORES
  .catch(err => {return "error"})
  this.props.setRedirectOff();

}

  render () {
    return (
      <div >
        <form className="form3">
          <label for="exampleInputEmail1">Nombre</label>
          <input class="form-control" type="text" name="nombre" placeholder="Ingrese nombre" onChange={(e) => this.handleInputChange(e)}></input>
          <label for="exampleInputEmail1">Apellido</label>
          <input class="form-control" type="text" name="apellido" placeholder="Ingrese apellido" onChange={(e) => this.handleInputChange(e)}></input> 
          <label for="exampleInputEmail1">Direccion</label>
          <input class="form-control" type="text" name="calle" placeholder="Ingrese su direccion" onChange={(e) => this.handleInputChange(e)}></input>  
          <label for="exampleInputEmail1">Numero</label>
          <input class="form-control" type="text" name="numero" placeholder="Numero" onChange={(e) => this.handleInputChange(e)}></input> 
          <label for="exampleInputEmail1">Departamento</label>
          <input class="form-control" type="text" name="departamento" placeholder="Departamento" onChange={(e) => this.handleInputChange(e)}></input> 
          <label for="exampleInputEmail1">Localidad</label>
          <input class="form-control" type="text" placeholder="Localidad" onChange={(e) => this.handleInputChange(e)}></input> 
          <label for="exampleInputEmail1">Provincia</label>
          <input class="form-control" type="text" placeholder="Provincia" onChange={(e) => this.handleInputChange(e)}></input> 
          <label for="exampleInputEmail1">Telefonos Celular/Whatsapp</label>
          <input class="form-control" name="telefono1" placeholder="" onChange={(e) => this.handleInputChange(e)}></input> 
          <label for="exampleInputEmail1">Otro telefono</label>
          <input class="form-control" type="text" name="telefono2" placeholder="" onChange={(e) => this.handleInputChange(e)}></input>  
          <button class="btn btn-outline-success" onClick={(e) => this.saveData(e)} >Guardar</button>   
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRedirectOff:() => dispatch(setRedirectOff())
  }
}

const mapStateToProps = state => {
  return {
    newUser: state.newUser,
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);

