import '../App.css';
import Upload from '../artifacts/contracts/Upload.sol/Upload.json';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import FileUpload from "../components/FileUpload";
import Display from '../components/Display';
import Model from '../components/Model';
import Swal from 'sweetalert2';

function Decide({token,settoken}) {

  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);


  //interacting with smart contract
  useEffect(() => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {

      if (provider) {

        //window reloads if there is change in account or chain
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload()
        });

        await provider.send("eth_requestAccounts", []);   //opens metamask when the tab is loaded
        const signer = provider.getSigner();              // to write data to BC
        const address = await signer.getAddress();        // get address
        setAccount(address);                              // set account as soon as you get address

        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        //creating instance of the contract
        const contract = new ethers.Contract(
          contractAddress, Upload.abi, signer
        );

        console.log(contract);
        setContract(contract);
        setProvider(provider);
      }
      else {
        console.error("Metamask not up !!! ");
      }
    };

    provider && loadProvider();

  }, []);


  return (
    <>

       {/* to set the share button off and on */}
      {!modelOpen && (<button className='share' onClick={() => setModelOpen(true)}>Share</button>)}
      {modelOpen && (<Model setModelOpen={setModelOpen} contract={contract}></Model>)}

      <div className="App">
        <p>User:{token}</p>
        <button type="button" onClick={()=>{settoken(false)}} >Logout</button>

        <h1 style={{ color: 'white' }}>Decentralized Pocket</h1>

        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>
        

        <p style={{ color: 'white' }}>Account : {account ? account : "Not Connected"}</p>


        {/* main componenets */}

        <FileUpload account={account} provider={provider} contract={contract} ></FileUpload>
        <Display account={account} contract={contract} token={token} ></Display>


      </div>
    </>
  );
}

export default Decide;
