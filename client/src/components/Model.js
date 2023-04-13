import { useEffect } from "react";
import './Model.css';

const Model = ({setModelOpen, contract}) => {

    const share = async () => {
        const address = document.querySelector(".address").value;  //feetching the address from the input field down the field
        await contract.allow(address);                           //calling the allow the function from conttract

    };

    //for showing the access list by default
    useEffect(()=>{

        const accessList = async ()=>{
            //storing the accesslist by calling the shareAccess from the contracts
            const addressList = await contract.shareAccess();
            let select = document.querySelector('selectNumber');
            const options = addressList;
        }
    })

    return <>
    <div className="modalBackground">
        <div className="modalContainer">
            <div className="title">Share with</div>
            <div className="body">
            <input type='text' className="address" placeholder="Enter address"></input>
            </div>
            <form id="myform">
                <select id="selectNumber">
                    <option className="address">People with access</option>
                </select>
            </form>
            <div className="footer">
                <button onClick={()=>{setModelOpen(false)}} id='cancelBtn'>Cancel</button>
                <button onClick={()=> share()}>Share</button>
            </div>
        </div>
    </div>
    </>
};

export default Model;