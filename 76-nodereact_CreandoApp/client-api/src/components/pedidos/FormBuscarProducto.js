const FormBuscarProducto = ({buscarProducto, leerDatosBusqueda}) => {
  return (
    <form
      onSubmit={buscarProducto}
    >
      <legend>Busca un Producto y agrega una cantidad</legend>

      <div className="campo">
        <label>Productos:</label>
        <input 
          type="text" 
          name="productos" 
          placeholder="Nombre Productos" 
          onChange={leerDatosBusqueda}
        />
      </div>

      <input 
        type="submit" 
        className="btn btn-azul btn-block" 
        value="Buscar Producto" 
      />
    </form>
  );
}
 
export default FormBuscarProducto;