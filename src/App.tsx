import React, { useState } from 'react';
import AppBar from './AppBar';
import Characters, { ICharacter } from './components/Characters';
import InitiativeList from './components/InitiativeList';

export const style = {
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
}

function App() {
  const [initiative, setInitiative] = useState<ICharacter[]>([])

  const  addInitiative = (c:ICharacter) => {
    setInitiative([...initiative, c])
  }  
  return (
    <div className="flex flex-col h-screen">
      {window.Main && (
        <div className="flex-none">
          <AppBar />
        </div>
      )}
      <div className="flex-auto">
        <div className="grid grid-cols-3 h-full bg-zinc-800 gap-3">
          <Characters initiative={initiative} AddInititive={addInitiative}/>
          <div className='flex justify-center items-center'>
          <button style={style} onClick={() => setInitiative([])} 
          className="text-indigo-500 whitespace-nowrap hover:text-white border border-indigo-500 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 h-12 text-center dark:border-blue-500 dark:hover:text-white dark:hover:bg-indigo-500 m-1"
          >Clear Initiative</button>
          </div>
          <InitiativeList Characters={initiative} editOrder={setInitiative}/>
        </div>
          
      </div>
    </div>
  );
}



export default App;
