import React,{Component} from 'react'
import ccxt from 'ccxt'
import { Select } from 'antd'
import 'antd/lib/select/style/css'
import accountController from '../funcStore/storage'

const Option = Select.Option;

export default class TransferModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            type: 1,
            recAccountObj:null,
            depositAddress:'',
            count: ''
        }
    }
    selectTypeHandle = (type) => {
        this.setState({
            type,
            depositAddress:''
        })
    }
    selectAccountHandle = (id) => {
        let recAccount = accountController.account.find(v => v.id==id)
        if(recAccount){
            let recAccountObj = new ccxt.kucoin2 ({
                apiKey: recAccount.api_key,
                secret: recAccount.secret_key,
                password: recAccount.api_password
              })
              recAccountObj.proxy='https://cors-anywhere.herokuapp.com/'
              this.setState({
                recAccountObj
              })
              console.log(recAccountObj)
        }
    }
    getDepositAddresses = () => {
        const {recAccountObj} = this.state
        const {currency} = this.props
        if(recAccountObj){
            recAccountObj.private_get_deposit_addresses({
                currency: currency.currency
            }).then(res => {
                if(res.code=='200000'){
                    this.setState({
                        depositAddress: res.data.address
                    })
                }
            })
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
    withDrawHandle = () => {
        const {type,depositAddress,count} = this.state
        const {currency,currentUser} = this.props
        let params = {
            currency: currency.currency,
            address: depositAddress,
            amount: count,
            isInner: type==1?true:false
        }
        currentUser.private_post_withdrawals(params)
    }
    render(){
        const {type,depositAddress,count} = this.state
        const {closeHandle,currency} = this.props
        return (
            <div className="modalWrapper">
                <div className="modalBox withdrawBox">
                    <div className="closeBtn" onClick={closeHandle}>
                        <img className='icon-close' src={`${process.env.PUBLIC_URL}/images/close.png`} alt=""/>
                    </div>
                    <div className="modal-title">账户提现</div>
                    <div className="modal-content">
                        <div className="row">
                            <span className='label'>{currency.currency}：</span>
                            <input className='ipt' type="text" placeholder={'请输入提现数额'} value={count} onChange={this.iptHandle}/> 
                        </div>
                        <div className="row" style={{paddingLeft:'90px'}}>
                            最大可提现额度：{currency.available}
                            <span className='all' onClick={()=>{this.seleectAll(currency.available)}}>全部提现</span>
                        </div>
                        <div className="row">
                            <span className="label">类型选择：</span>
                            <Select defaultValue="1" style={{ width: 260 }} onChange={this.selectTypeHandle}>
                                <Option value="1">提现至已有账户</Option>
                                <Option value="2">自定义地址输入</Option>
                            </Select>
                        </div>
                        <div className="row" style={{display:type==1?'flex':'none'}}>
                            <span className="label">账户选择：</span>
                            <Select
                                placeholder={'请选择账户'}
                                // defaultValue={accountController.account.length>0?accountController.account[0].id:undefined} 
                                style={{ width: 260 }} 
                                onChange={this.selectAccountHandle}
                            >
                                {
                                    accountController.account.map(v => {
                                        return <Option key={v.id} value={v.id}>{v.name}</Option>
                                    })
                                }
                            </Select>
                            <span className='all' onClick={this.getDepositAddresses}>获取地址</span>
                        </div>
                        <div className="row">
                            <span className='label'>提现地址：</span>
                            <input className='ipt' type="text" placeholder='输入提现地址' disabled={type==1?true:false} value={depositAddress}/>
                        </div>
                        <div className="common-btn" onClick={this.withDrawHandle}>确认提现</div>
                    </div>
                </div>
            </div>
        )
    }
}