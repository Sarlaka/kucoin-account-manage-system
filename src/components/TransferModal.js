import React,{Component} from 'react'
import {uuid} from '../funcStore/utils'

export default class TransferModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            count: ''
        }
    }
    iptHandle = (e) => {
        if(isNaN(e.target.value)){
            alert('输入数字')
        }else{
            this.setState({
                count: e.target.value
            })
        }
    }
    seleectAll = (count) => {
        this.setState({
            count
        })
    }
    transferHandle=()=>{
        const {count} = this.state
        const {currentUser,currency,recData} = this.props
        // currentUser.private_post_accounts()
        // currentUser.private_post_accounts_inner_transfer()
        let recCurrency = recData.find(v => v.currency==currency.currency)
        let params = {
            clientOid: uuid(),
            payAccountId: currency.id,
            recAccountId:'',
            amount:count
        }
        if(recCurrency){
            params.recAccountId = recCurrency.id
            currentUser.private_post_accounts_inner_transfer(params)
        }else{
            currentUser.private_post_accounts({
                type:'main',
                currency: currency.currency
            }).then(res => {
                if(res.code=='200000'){
                    params.recAccountId = res.data.id
                    currentUser.private_post_accounts_inner_transfer(params)
                }
            })
        }
    }
    render(){
        const {count} = this.state
        const {closeHandle,currency,type,currentUser,recData} = this.props
        return (
            <div className="modalWrapper">
                <div className="modalBox transferBox">
                    <div className="closeBtn" onClick={closeHandle}>
                        <img className='icon-close' src={`${process.env.PUBLIC_URL}/images/close.png`} alt=""/>
                    </div>
                    <div className="modal-title">{type=='main'?'储蓄账户 => 交易账户':'交易账户 => 储蓄账户'}</div>
                    <div className="modal-content">
                        <div className="row">
                            <span className='label'>{currency.currency}：</span>
                            <input className='ipt' type="text" placeholder={'请输入转账数额'} value={count} onChange={this.iptHandle}/> 
                        </div>
                        
                        <div className="row" style={{paddingLeft:'90px'}}>
                            可转额度：{currency.available}
                            <span className='all' onClick={()=>{this.seleectAll(currency.available)}}>全部转账</span>
                        </div>
                        <div className="common-btn" onClick={this.transferHandle}>确认转账</div>
                    </div>
                </div>
            </div>
        )
    }
}