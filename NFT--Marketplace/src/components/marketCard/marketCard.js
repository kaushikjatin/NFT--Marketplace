import React ,{useEffect,useState} from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {Card, CardActionArea, CardMedia, Tooltip, Typography} from "@material-ui/core/";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PanToolSharpIcon from "@material-ui/icons/PanToolSharp";
import LocalOfferSharpIcon from "@material-ui/icons/LocalOfferSharp";
import { Grid} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import axios from "axios";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#ffffff",
    maxWidth: 345,
    borderRadius: 8,
    color: "#000000",
    maxHeight: 395,
    "&:hover": {
      boxShadow:
        "0 1px 3px rgba(255,255,255,0.12), 0 1px 3px rgba(255,255,255,0.24)",
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    },
  },
  media: {
    height: 220,
    width: "100%",
    borderRadius: 5,
    transition: "transform 0.15s ease-in-out",
    "&:hover": {
      transform: "scale3d(1.05, 1.05, 1)",
    },
  },
  bidPriceInfoContainer: {
    marginLeft: 15,
  },
  myButton: {
    color: "#00D54B",
    backgroundColor: "#080808",
    height: 23,
    position: "relative",
    top: 7,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 12,
    borderRadius: 5,
    border: "1px solid",
    borderColor: "#00D54B",
    "&:hover": {
      backgroundColor: "#00D54B",
      borderColor: "#00D54B",
      color: "#000",
    },
  },
});


const MyTooltip = withStyles((theme) => ({
  tooltip: {fontSize: 20},
}))(Tooltip);

const MarketCard = ({name,cid,sellPrice,isBiddable,maxBid,index}) => {
  const classes = useStyles();
  
  const [state, setState] = React.useState([{
    cid1:"",
    count:0,
  }]);

  useEffect(()=>{
    axios.get("http://localhost:3001/note").then(res=>{
      return res;
    }).then(jsonRes=> {
      setState(jsonRes.data[index-1]);

    });

    
},[])


    




  const selectShortlistedApplicant = (e) => {
    const checked = e.target.checked;
    if (checked) {
      handlechange(state.count+1);
      setState({
        ...state,
        count: state.count + 1,
      });

    } else {
      handlechange(state.count-1);
      setState({
        ...state,
        count: state.count - 1,
      });
    }
    
    
  };
  const handlechange=(e) => {
    const newNote={
        cid1:cid,
        count:e,
    }
    axios.post("http://localhost:3001/card",newNote)
}


  return (
    <Card className={classes.root} variant="outlined">
      <Grid container>
        <Grid item xs>
          <CardActionArea
            disableRipple
            onClick={() => {
              window.location.href ="http://localhost:3000/all_tokens/" +index ;
            }}
          >
            <Grid container>
              <CardMedia
                className={classes.media}
                image={"https://gateway.pinata.cloud/ipfs/"+cid} 
                title={name}
              />
            </Grid>
            <Grid container direction="column" style={{ marginTop: 15 }}>
              <Grid item style={{ marginLeft: 15, marginBottom: 6 }}>
                
                <Typography    gutterbottom="true" variant="h6" component="h1">
                  {name}
                </Typography>
              </Grid>
              <Grid item style={{ alignSelf: "flex-start", marginLeft: 15 }}>
                
                <div style={{ textAlign: "left" }}>
                  <div>
                    <LocalOfferSharpIcon
                      style={{
                        verticalAlign: "middle",
                        marginRight: 5,
                        fontSize: 20,
                      }}
                    />
                    <MyTooltip title={window.web3.utils.fromWei(sellPrice.toString())} arrow>
                      <Typography variant="caption">
                        Price: {sellPrice!=0 ? sellPrice + " Ξ" : "-"}
                      </Typography>
                    </MyTooltip>
                  </div>
                </div>
                <div style={{ marginTop: 7, textAlign: "left" }}>
                  <div>
                    <PanToolSharpIcon
                      style={{
                        verticalAlign: "middle",
                        marginRight: 5,
                        fontSize: 20,
                      }}
                    />
                    <MyTooltip title={window.web3.utils.fromWei(maxBid.toString())} arrow>
                      <Typography variant="caption">
                        Highest bid: {isBiddable ? maxBid + " Ξ" : "-"}
                      </Typography>
                    </MyTooltip>
                  </div>
                </div>
               
              </Grid>
            </Grid>
          </CardActionArea>
         
          
          

          <div style={{
            marginLeft: "70%",
          
            display: 'inline-block',
            justifyContent: 'normal',
            spacing: '20px',
          }}>
          
          
            <FormControlLabel
            
              control={<Checkbox icon={<FavoriteBorder />} 
                        checkedIcon={<Favorite />  }
                name="checkedH"  onChangeCapture={(e) => {
                    selectShortlistedApplicant(e)}} />}
            
              
            ></FormControlLabel>
            {(state!=null)?(state.count):(0)}
          
            
          </div>
            
         
        </Grid>
      </Grid>
    </Card>
  );
};

export default MarketCard;