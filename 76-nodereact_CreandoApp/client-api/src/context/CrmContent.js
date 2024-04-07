import { createContext, useState } from "react";

/*
const CrmContext = createContext([{}, () => {}]);

const CrmProvider = props => {
  // Definir el state inicial
  const [auth, guardarAuth] = useState({
    token: '',
    auth: false
  });

  return (
    <CrmContext.Provider
      value={[
        auth, 
        guardarAuth
      ]}
    >
      {props.children}
    </CrmContext.Provider>
  );
};

export { CrmContext, CrmProvider };
*/

// Definir el contect
const CrmContext = createContext();

// Definir el provider
const CrmProvider = ({children}) => {
  // States
  const [auth, guardarAuth] = useState({
    token: '',
    auth: false
  });

  return (
    <CrmContext.Provider
      value={{
        auth,
        guardarAuth
      }}
    >
      {children}
    </CrmContext.Provider>
  );
};

// Exports
export {
  CrmProvider
}
export default CrmContext;