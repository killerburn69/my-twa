import './App.css';
import '@twa-dev/sdk';

import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from './hooks/useTONConnect';
import { useCounterContract } from './hooks/useCounterContract';
import { useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';

function App() {
  const { connected } = useTonConnect();
  const { value, address, sendIncrement } = useCounterContract();
  const [isTransfer, setIsTransfer] = useState(false)
  const [tonConnectUI] = useTonConnectUI();
  const [valueAddress, setValueAddress] = useState("")
  const [valueAmount, setValueAmount] = useState(0)
  
  const handleTranfer = (address:string,amount:number)=>{
    const transaction:any = {
      messages: [
          {
              address: address, // destination address
              amount: String(100000000000000) //Toncoin in nanotons
          }
      ]
    }
    tonConnectUI.sendTransaction(transaction)
  }
  return (
    <div className='App'>
      <div className='Container'>
        <TonConnectButton />
        {!isTransfer  ? (
          
          <>
            <div className='Card'>
              <b>Counter Address</b>
              <div className='Hint'>{address}</div>
            </div>

            <div className='Card'>
              <b>Counter Value</b>
              <div>{value ?? 'Loading...'}</div>
            </div>

            <a
              className={`Button ${connected ? 'Active' : 'Disabled'}`}
              onClick={() => {
                sendIncrement();
              }}
            >
              Increment
            </a>
          </>
        ):(
          <div>
            <h1>Transfer to</h1>
            <div className='flex flex-col gap-y-7'>
              <div className='flex gap-x-2 items-center'>
                <label htmlFor="">Address</label>
                <input type="text" name="" id="" className='max-w-[400px] w-[400px] px-[8px] py-[10px]' onChange={(e)=>setValueAddress(e.target.value)} value={valueAddress}/>
              </div>
              <div>
                <label htmlFor="">Amount</label>
                <input type="number" name="" id="" className='max-w-[400px] w-[400px] px-[8px] py-[10px]' onChange={(e)=>setValueAmount(Number(e.target.value))} value={valueAmount}/>
              </div>
              <button onClick={()=>handleTranfer(valueAddress,valueAmount)}>Send to</button>
            </div>
          </div>
        )}
        <button onClick={()=>setIsTransfer(!isTransfer)}>Transfer</button>
      </div>
    </div>
  );
}

export default App
