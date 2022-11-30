// import logo from './logo.svg';
import React,{useEffect,useState} from 'react';
import {ethers} from 'ethers';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import icon from './icon.svg';
import InputGroup from 'react-bootstrap/InputGroup';
import {toast} from 'react-toastify';
import Twitter from "./twitterAbi.json";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import Card from 'react-bootstrap/Card';


function App() {

  const [tweetTyped, setTweetTyped] = useState('')
  const [signer, setSigner] = useState(undefined)
  const [allTweets, setAllTweets] = useState([])
  const getAllTweets = async () => {
    try {
      const { ethereum } = window
      if (ethereum && signer) {
       // console.log(signer,process.env.REACT_APP_URL_TWITTER_FACTORY)
        const TwitterContract = new ethers.Contract(
          process.env.REACT_APP_URL_TWITTER_FACTORY,
          Twitter.abi,
          signer
        )

        let allTweets = await TwitterContract.getAllTweets();
        if (allTweets) {
          console.log(allTweets);
          setAllTweets(allTweets);
        }
        // setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllTweets();
  }, [signer])

  // const tweets = [
  //     'This is my foirfaj n laenf ano eofjgna ewooaewf  oiaf iwafmnaw a onwfn awakwnf o oawfnwona auhaweuna la lknma u oaij owfa a laknf awifja oakma okwfjaow oiaj oinaw lk ',
  //     'Kirubha',
  //     'Haran',
  //     'Kiru',
  //     'K',
  //     'I',
  //     'R',
  //     'U',

  // ]

  return (
    <div className="aps">
      {/* <CollapsibleExample /> */}
      <Navbar collapseOnSelect expand="lg" bg="#E1E8ED" variant="dark" style={{backgroundColor:'#AAB8C2',display:'flex'}}>
        <Container style={{justifyContent:'space-around',padding:20,textAlign:'center',alignItems:'center',display:'flex',width:'100%'}}>
          <Navbar.Brand style={{margin:0,color:'#657786'}} >Home</Navbar.Brand>
          <Navbar.Brand style={{margin:0,color:'#657786'}} >Recommend</Navbar.Brand>
          <Navbar.Brand style={{margin:0,color:'#657786'}}>Meet the Team</Navbar.Brand>
          <Navbar.Brand href="#metamask" onClick={()=>{
                           try {
                                const { ethereum } = window
                                if (ethereum) {
                                  window.ethereum.request({ method: 'eth_requestAccounts' })
                                    .then(res => {
                                      // Return the address of the wallet
                                      const provider = new ethers.providers.Web3Provider(ethereum);
                                      const signer = provider.getSigner();
                                      setSigner(signer);
                                    })

                                } else {
                                  console.log("Ethereum object doesn't exist");
                                }
                              } catch (error) {
                                console.log(error);
                              }
                        }} style={{margin:0,color:'#657786'}}>Connect Wallet</Navbar.Brand>
        </Container>
     </Navbar>
      <div>
        <div className="App">
          <div classname="container">
            <header className="App-header">
              <img src={icon} className="App-logo" alt="logo" style={{width:100,height:100}} />
                <p style={{color:'#657786',fontFamily:'ariel'}}>
                  Say Hello to the Ethereum Twitter!!!!
                </p>
                <Form style={{width:window.innerWidth-300,padding:20}}>
                    <div style={{justifyContent:'space-between'}}>
                      <div style={{justifyContent:'center'}}>
                        <InputGroup>
                        <Form.Control as="textarea" aria-label="With textarea" onChange={(e) => setTweetTyped(e.target.value)} style={{width:500,height:40,justifySelf:'center',justifyContent:'center'}} />
                        </InputGroup>
                      </div>
                      <div classname = "button" style={{width: window.innerWidth-300,justifyContent:'space-evenly',display:'flex',marginTop:10}}>
                        <Button variant="primary" onClick={async () => {
                console.log(process.env.REACT_APP_URL_TWITTER_FACTORY)
                const TwitterContract = new ethers.Contract(
                  process.env.REACT_APP_URL_TWITTER_FACTORY,
                  Twitter.abi,
                  signer
                )

                let twitterTx = await TwitterContract.addTweet(tweetTyped);
                if (twitterTx) {
                  toast("Tweet Add Request Sent")

                }
                console.log(twitterTx);
              }}
              style={{width:100,height:40,backgroundColor:'#1DA1F2',borderRadius:10}}>
                            Add Tweet
                        </Button>
                        <Button variant="danger" onClick={async () => {
                               getAllTweets()
                            }}  style={{width:100,height:40,backgroundColor:'orange',borderRadius:10}}>
                            Reload
                        </Button>
                        {/* <Button variant="danger" onClick={()=>{
                           try {
                                const { ethereum } = window
                                if (ethereum) {
                                  window.ethereum.request({ method: 'eth_requestAccounts' })
                                    .then(res => {
                                      // Return the address of the wallet
                                      const provider = new ethers.providers.Web3Provider(ethereum);
                                      const signer = provider.getSigner();
                                      setSigner(signer);
                                    })

                                } else {
                                  console.log("Ethereum object doesn't exist");
                                }
                              } catch (error) {
                                console.log(error);
                              }
                        }}  style={{width:100,height:40,backgroundColor:'brown',borderRadius:10}}>
                            MetaMask
                        </Button> */}
                      </div>
                      <div style={{display:'flex',flexDirection:'column',marginTop:10,marginBottom:10,fontFamily:'ariel',width:window.innerWidth-300}}>
                            {allTweets && (
                              allTweets.map(e => {
                                return(
                                  <div style={{display:'flex',alignContent:'center',alignItems:'center',justifyContent:'center',flexWrap:'wrap',marginLeft:15,marginRight:15,backgroundColor:'white',padding:20,margin:10,borderRadius:15}}>
                                    <div style={{color:'#657786',display:'flex',flexDirection:'row',marginTop:10,marginBottom:10,fontFamily:'ariel',justifyContent:'space-between',flex:0.7,flexWrap:'wrap'}}>
                                      <div style={{flexDirection:'column'}}>
                                      <div style={{color:'black',fontSize:15}}>User Name: {e && e.userName || "N/A"} </div>
                                        <br />
                                      <div style={{color:'blue',fontSize:25}}> Tweet : {e && e.text || "N/A"} </div>
                                          </div>
                                          <Button variant="danger" onClick={async()=> { const TwitterContract = new ethers.Contract(
                                                process.env.REACT_APP_URL_TWITTER_FACTORY,
                                                Twitter.abi,
                                                signer
                                                )
                                                let twitterTx = await TwitterContract.deleteTweet(e.id,true);
                                                }}  style={{width:100,height:40,backgroundColor:'red',borderRadius:10}}>
                                            DELETE
                                          </Button> 
                                        </div>
                                    </div>
                                  
                                )
                              })
                             ) }
                
               </div>
               
               {/* <div style={{flex:1,display:'flex',flexWrap:'wrap'}}>
               {allTweets && (
                allTweets.map(e =>{
                  return(
                    <div style={{flex:0.5,display:'flex',flexWrap:'wrap'}}>
                    <Card style={{ width: '18rem',backgroundColor:'olive',alignItems:'center',justifyItems:'center',flex:0.7,display:'flex',flexWrap:'wrap' }}>
                    <Card.Img variant="top" src="./logo.svg" />
                    <Card.Body>
                      <Card.Title>User Name: {e && e.userName || "N/A"}</Card.Title>
                      <Card.Text>Tweet : {e && e.text || "N/A"}</Card.Text>
                      <Button variant="primary">Delete</Button>
                    </Card.Body>
                   </Card>
                   </div>
                  )
                })
               )}
               </div> */}
                            
                    </div>
                </Form>
              
            </header>
          </div>
        </div>
      </div>
    </div>
    
    
  );
}

export default App;
