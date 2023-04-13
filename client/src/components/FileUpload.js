import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import Swal from "sweetalert2";

const FileUpload = ({ account, provider, contract }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No File Selected");

  const handleSubmit = async (e) => {
    e.preventDefault(); //avoids reloading of the page while submitting the form
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `bbd1e22548433b729843`,
            pinata_secret_api_key: `87f3e5c2b780569c3ef31473d4340d31e335b866382257eb2e60939ff9d949de`,
            "Content-Type": "multipart/form-data",
          },
        });

        //retrieving the image hash from ipfs
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;

        //storing it on the block chain
        // const signer = contract.connect(provider.getSigner());
        // signer.add(account, ImgHash);
        contract.add(account, ImgHash);
        alert("File uploaded successfully");
        setFileName("No file selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload file");
        // console.error(e);
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0]; // files is array of files object
    console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea"> File : {fileName} </span>
        <button style={{}} type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
