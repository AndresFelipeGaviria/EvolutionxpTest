import React,{useState} from 'react'

const FormUser = (props) => {
    const initialStateValues = {
        email: "",
        numCel: "",
        pin: "",
    };
      
    const [values, setValues] = useState(initialStateValues);
    const handleSubmit = (e) => {
        e.preventDefault()
        props.addOrEdit(values);
        setValues({...initialStateValues})

    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

      
    return (
      <div>
        <h1 style={{textAlign: 'center', margin: 20}}>Bienvenido</h1>
        <form onSubmit={handleSubmit} className="card card-body border-primary">
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">account_circle</i>
        </div>
        <input
          type="email"
          className="form-control"
          placeholder="ejemplo@hotmail.com"
          value={values.email}
          name="email"
          onChange={handleInputChange}
        />
      </div>
      <br/>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">call</i>
        </div>
        <input
          type="numCel"
          value={values.numCel}
          name="numCel"
          placeholder="44412334"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <br/>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">fingerprint</i>
        </div>
        <input
          type="pin"
          value={values.pin}
          name="pin"
          placeholder="3DKF3334KDSIV"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>

        <br/>
      <button className="btn btn-primary btn-block">
          Iniciar Sesión
        {/* {props.currentId === "" ? "Save" : "Update"} */}
      </button>
    </form>
    </div>

    )
}

export default FormUser;