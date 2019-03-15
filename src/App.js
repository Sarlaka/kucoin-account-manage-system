import React, { Component } from 'react';
import ccxt from 'ccxt'
import 'antd/dist/antd.css';
import './App.css';
import AccountBox from './components/AccountBox'
import TradeTable from './components/TardeTable'
import MainTable from './components/MainTable'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      tradeAccount: [],
      mainAccount: [],
      currentUser: null,
      loading: true
    }
  }
  componentDidMount(){
    
  }

  initAccountHandle = (user) => {
    this.setState({
      loading: true
    })
    let kucoin2 = new ccxt.kucoin2 ({
        apiKey: user.api_key,
        secret: user.secret_key,
        password: user.api_password
      })
      kucoin2.proxy='https://cors-anywhere.herokuapp.com/'
      kucoin2.fetchBalance({type:''}).then(res => {
        let tradeAccount = res.info.filter(v => v.type=="trade")
        let mainAccount = res.info.filter(v => v.type=="main")
        this.setState({
          currentUser:kucoin2,
          tradeAccount,
          mainAccount,
          loading: false
        })
      }).catch(err => {
          console.log(err)
      })
}
loadHandle=()=>{
  this.setState({
    loading:false 
  })
}
  render() {
    const {kucoin2,tradeAccount,mainAccount,loading} = this.state
    return (
      <div className="App">
        <AccountBox initAccountHandle={this.initAccountHandle} loadHandle={this.loadHandle}/>
        <div className="tableArea">
          <div className="left">
            <TradeTable data={tradeAccount} loading={loading}/>
          </div>
          <div className="right">
            <MainTable data={mainAccount} loading={loading}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
