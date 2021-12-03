import React from "react";
import { Container } from "react-bootstrap";
import OwnerComponent from "../OwnerComponent/OwnerComponent.components";
import ViewerComponent from "../ViewerComponent/ViewerComponent.jsx";
import {getUsername} from "../../utils/getUsernameFromAddress"
import Spinner from '../spinner/spinner'
import { Accordion } from "react-bootstrap";
import './ItemPage.styles.scss';

class ItemPage extends React.Component
{
    constructor(props)
    {
     super(props);
     this.state={}
   }



  static getDerivedStateFromProps(nextProps) {
    let Data=null;
    if(nextProps.data!=null)
    {
      let index=window.location.href.slice(-2);
      index=index.replace('/','');
      Data=nextProps.data[index-1];
    }
    
    return {
     contract:nextProps.contract,
     account:nextProps.account,
     data:Data
    };
  }

  async getUser(){
    if(this.state.account && this.state.contract && this.state.data){
        const owner= await getUsername(this.state.contract,this.state.data.owner)
        const creator= await getUsername(this.state.contract,this.state.data.creator)
        console.log("came here");
        this.setState({owner:owner.username , creator:creator.username})
    }
    else{
        window.alert("no contract or account");
    }
}






   render()
   {
     if(this.state.data && !this.state.owner)
        this.getUser();
     if(!this.state.data || !this.state.owner)
      return (<Spinner></Spinner>)
     else
       return(
           <Container>
              <br/> 
              <div className='fullinfo'>
                <img className='image' src={"https://gateway.pinata.cloud/ipfs/"+this.state.data.cid}/>
                <div className='rightsideinfo'>
                  <div className='assetname'>{this.state.data.name.toUpperCase()}</div>
                  <div className='creator_and_owner'>
                      <div className='creator'>Creator: {this.state.creator.toUpperCase()}</div>
                      <div className='creator'>Owner: {this.state.owner.toUpperCase()}</div>
                  </div>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Description</Accordion.Header>
                      <Accordion.Body style={{"max-height":"150px" , "overflowY":"scroll"}}>
                         {this.state.data.description}
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Created At</Accordion.Header>
                      <Accordion.Body>
                        {new Date(parseInt(this.state.data.time)).toString()}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
              <br/><br/> <br/><br/> <br/><br/>


              <div className='secondcomponent'>
                    <div className='leftcomponent'>
                      <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Contract Address</Accordion.Header>
                        <Accordion.Body>
                            0x20C899F27F6700F6E0928d94Fc8625528cEE425B
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Token Id</Accordion.Header>
                        <Accordion.Body>
                          {this.state.data.token_id}
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>Token Standard</Accordion.Header>
                        <Accordion.Body>
                          ERC - 721
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="3">
                        <Accordion.Header>Blockchain</Accordion.Header>
                        <Accordion.Body>
                          Rposten Test Network(Ethereum)
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    </div>
                    <div className='rightcomponent'>
                    {
                      (this.state.data.owner===this.state.account)?(
                        <OwnerComponent data={this.state.data} handlestateofApp={this.props.handlestateofApp} contract={this.state.contract}  account={this.state.account}></OwnerComponent>
                      ):( 
                        <ViewerComponent data={this.state.data} handlestateofApp={this.props.handlestateofApp} contract={this.state.contract}  account={this.state.account}></ViewerComponent>
                      )
                    }
                   </div>
              </div>

          

                <br/><br/>  <br/><br/>  

            
            </Container>
       )
   }
}


export default ItemPage