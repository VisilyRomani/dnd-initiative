import React, { useState } from 'react';
import AppBar from './AppBar';
import Characters, { ICharacter } from './components/Characters';
import InitiativeList from './components/InitiativeList';

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
        <div className="grid grid-cols-3 h-full bg-gray-800 gap-3">
          <Characters initiative={initiative} AddInititive={addInitiative}/>
          <div className='flex justify-center items-center'>

          <button onClick={() => setInitiative([])} className='bg-gray-200 p-3 hover:bg-gray-400 active:bg-gray-500 font-bold text-gray-700'>Clear Initiative</button>
          </div>
          <InitiativeList Characters={initiative} editOrder={setInitiative}/>
        </div>
          
      </div>
    </div>
  );
}

export default App;
