import { useState } from 'react'
import Main from './main/Main'

function App() {
  return (
    <>
      <div style={{height: '90vh'}}>
        <header style={{background:'gray', padding: 20}}>
        header
        </header>
        <div className="content" style={{display:'flex', justifyContent:'space-between', height: '100%'}}>
          <div className="sidebar" style={{width: 200, background:'#555' , height: '100%', padding: 20}}>
            side
          </div>
         <Main />
        </div>
        
      </div>
    </>
  )
}

export default App
