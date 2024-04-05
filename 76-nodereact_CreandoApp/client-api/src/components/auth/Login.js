const Login = () => {
  // Actualizar los valores
  const actualizarValores = e => {
    console.log('Actualizando...');
  };

  return (
    <div className="login">
      <h2>Iniciar Sesión</h2>

      <div className="contenedor-formulario">
        <form>
          <div className="campo">
            <label>Email</label>
            <input 
              type="text" 
              name="email" 
              placeholder="Ingrese su email" 
              required 
              onChange={actualizarValores}
            />
          </div>

          <div className="campo">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Ingrese su password" 
              required 
              onChange={actualizarValores}
            />
          </div>

          <input type="submit" value="Iniciar Sesión" className="btn btn-verde btn-block" />
        </form>
      </div>
    </div>
  );
}
 
export default Login;