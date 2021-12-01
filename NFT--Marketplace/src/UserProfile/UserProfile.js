import React from 'react';
import {getUsername} from "../utils/getUsernameFromAddress"
import './UserProfile.css';
import Button from 'react-bootstrap/Button'
class UserProfile extends React.Component
{
    constructor(props){
        super(props);
        //this.handleChange= this.handleChange.bind(this)
 //       this.handleSubmit= this.handleSubmit.bind(this)
        this.state={
            
            account:props.account,
            contract:props.contract,
            balance:props.balance,
            ownedTokens:0,
            TokensOnSale:0,
            TokensOnBid:0,
            UserName:"...",
            userBalance:0,
            data:props.data,
          };
    }

     async componentDidMount(){
         await this.getUser()
        
    }

    handleChange = (event) => {
     //   console.log("ssfgf",event.target.value)
        this.setState({UserName: event.target.value})
      }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
         contract:nextProps.contract,
         account:nextProps.account,
         data:nextProps.data,
         balance:nextProps.balance,
        };
    }

    async getUser(){
        console.log("account:",this.state.account)
        console.log("address:",this.state.contract)
        if(this.state.account && this.state.contract){
           
            const userName_temp= await getUsername(this.state.contract,this.state.account)
            this.setState({UserName:userName_temp.username})
            this.setState({userBalance:userName_temp.userBalance})
           
        }
        else{
            window.alert("no contract or account");
        }
        this.setState({ownedTokens:this.state.data.length})
        
        var saleCount=0;
        for(var i=0;i < this.state.data.length; i++){
            if(this.state.data[i][2] === true){
                saleCount++;
            }
        }
        this.setState({TokensOnSale:saleCount})

        var bidCount=0;
        for(var i=0;i < this.state.data.length; i++){
            if(this.state.data[i][4] === true){
                bidCount++;
            }
        }
        this.setState({TokensOnBid:bidCount})
    }

     updateUserBalance= async ()=> {

        let trans = await this.state.contract.methods.withdrawMoney(this.state.userBalance).send({from:this.state.account})
        console.log("withdraw money",trans)
    }

    async setUserName(name) {
        let usernameChange = await this.state.contract.methods.setUsername(name).send({from:this.state.account})
        console.log("sdfs",usernameChange)
        await this.get_username()
    }




    render()
    {
        // let viewMode = {}
        // let editMode = {}

        // if (this.state.editing) {
        // viewMode.display = "none"
        // } else {
        // editMode.display = "none"
        // }
       
        return(

            <div className="container">
            <div className="main-body">
            
                  <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex flex-column align-items-center text-center">
                            <img src="https://www.bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                            <div className="mt-3">
                              <h4>{this.state.UserName}</h4>
                              {/* <p className="text-muted font-size-sm"></p>
                              <button className="btn btn-primary">Follow</button>
                              <button className="btn btn-outline-primary">Message</button> */}
                              <form method=" " onSubmit={(event)=> {
                              event.preventDefault()
                              const name= this.state.UserName
                              this.setUserName(name)
                              }}>
                              < input type="text" value={this.state.UserName} style={{width:"50%"}} onChange={this.handleChange}/>
                              <Button variant="primary" type="submit">
                              Update Username
                              </Button>
                            </form>

                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                            <span className="text-secondary">....</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                            <span className="text-secondary">....</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                            <span className="text-secondary">....</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="card mb-3">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">User Account</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {this.state.account}
                            </div>
                          </div>
                          <hr/>
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">User Balance</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {this.state.userBalance} Wei
                            </div>
                            
                          </div>
                          <hr/>
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Wallet Balance</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {this.state.balance} Ethers
                            </div>
                          </div>
                          <hr/>
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Tokens Owned</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {this.state.ownedTokens}
                            </div>
                          </div>
                          <hr/>
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Tokens On Sale</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {this.state.TokensOnSale}
                            </div>
                          </div>
                          <hr/>
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Tokens On Auction</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {this.state.TokensOnBid}
                            </div>
                          </div>
                          <hr/>
                        <div className="row">
                            <form onSubmit={(event)=> {
                            event.preventDefault()
                            this.updateUserBalance();
                          }}>
                            <div className="col-sm-12">
                              <Button variant="primary" type="submit">
                              Update User Balance
                              </Button>
                            </div>
                          </form>
                          </div>
                        </div>
                      </div>
        
                    </div>
                  </div>
        
                </div>
            </div>

        )
    }
}


export default (UserProfile);