import React, { Component } from 'react';
import './CreateToken.styles.scss';
import {pinataApiKey, pinataSecretApiKey,url} from '../../pinataApi';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { getUsername } from '../../utils/getUsernameFromAddress';
import { Container } from 'react-bootstrap';
import HeroSection from '../hero/HeroSection';

class CreateToken extends Component
{
    constructor(props)
    {
     super(props);
     this.productName= React.createRef();
     this.productimage = React.createRef();
     this.productDescription = React.createRef();
     this.state={
                 file:null,
                 account:props.account,
                 contract:props.contract,
                 count:0
               };
     this.handleChange.bind(this);
   }
  

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
     contract:nextProps.contract,
     account:nextProps.account
    };
   }
  

   handleChange(event) { 
     this.setState({name:event.target.value})
    };
 
   async onSubmit(name, image,description) 
     {
       this.props.handlestateofApp("spinner",true);
       const FormData = require("form-data");
      
       const axios = require("axios");
       let data = new FormData();
       data.append("file", image);
       const res =  await axios.post(url, data, {
                         maxContentLength: "Infinity", 
                         headers: {
                         "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                         pinata_api_key: pinataApiKey, 
                         pinata_secret_api_key: pinataSecretApiKey,
                         }
                     });
       this.setState({image: `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`});
       this.state.contract.options.gas= 500000;
 
       if(res.data && res.data.IpfsHash)
       {
         let Data=await this.state.contract.methods.mint([name, res.data.IpfsHash,description],new Date().getTime()).send({ from:this.state.account ,gasLimit: 3000000});
         Data=Data.events.nftTransaction.returnValues["nfts"]
         const newNote={
          cid1:res.data.IpfsHash,
          count:this.state.count,
      }
      axios.post("http://localhost:3001/upload",newNote)
         this.setState({file:null , name:null});
         this.props.handlestateofApp("data",Data);
         window.alert("Asset Minted Successfully!")
       }
       else 
       {
        window.alert("There was some problem in minting asset , try after some time")
       }
       
     }
 
 
   uploadFile = (event) => {
     event.preventDefault()
     this.setState({file: event.target.files[0]})
   }
  

  




  render() 
  {
    
    return (
    
     
      
        <div className='file_form'>
          
            <Form onSubmit={(event) => {
                        event.preventDefault()
                        const name = this.productName.value
                        const image = this.state.file
                        const description=this.productDescription.value;
                        this.onSubmit(name, image,description)}}>

                <Form.Group className="mb-3" controlId="floatingInput">
                    <Form.Label>Asset Name</Form.Label>
                    <Form.Control type="text" ref={(input) => { this.productName = input }} placeholder="Enter the name of asset" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Asset Description</Form.Label>
                  <Form.Control as="textarea" rows={3} ref={(input) => { this.productDescription = input }}  placeholder="Enter description of asset"/>
              </Form.Group>

                <Form.Group controlId="formFileLg" className="mb-3">
                    <Form.Label>Upload A Image</Form.Label>
                    <Form.Control name='file' onChange={this.uploadFile}  ref={(input) => { this.productImage = input }} type="file" size="lg" required/>
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" className='submit_button' >
                        Submit
                    </Button>
                </div>
          </Form>
        </div>
     
    );
  }


}

export default CreateToken;