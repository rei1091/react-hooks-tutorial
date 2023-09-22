import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const reiInfo = {
	name: 'rei',
	age: 23,
};

const ReiContext = createContext(reiInfo);

ReactDOM.createRoot(document.getElementById('root')).render(
<ReiContext.Provider value={reiInfo}>
	<React.StrictMode>
    <App />
  </React.StrictMode>
</ReiContext.Provider>
)

export default ReiContext;