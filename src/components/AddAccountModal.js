import React,{Component} from 'react'
import accountController from '../funcStore/storage'
import {uuid} from '../funcStore/utils'

export default class AddAccountModal extends Component {
    constructor(props){
        super(props)
        this.state={
            name: '',
            api_key: '',
            secret_key:'',
            api_password: ''
        }
    }
    setParams=(k,v)=>{
        let newState = {}
        newState[k] = v
        this.setState(newState)
    }
    addHandle = () => {
        const {name,api_key,secret_key,api_password} = this.state
        const account = {}
        account.id = uuid()
        account.name = name
        account.api_key = api_key
        account.secret_key = secret_key
        account.api_password = api_password
        accountController.addAccount(account)
        this.props.closeHandle()
    }
    render(){
        const {name,api_key,secret_key,api_password} = this.state
        const {closeHandle} = this.props
        return (
            <div className="modalWrapper">
                <div className="modalBox addAccountBox">
                    <div className="closeBtn" onClick={closeHandle}>
                        <img className='icon-close' src={`${process.env.PUBLIC_URL}/images/close.png`} alt=""/>
                    </div>
                    <div className="modal-title">新增账户</div>
                    <div className="modal-content">
                        <div className="row">
                            <span className='label'>账户名称：</span>
                            <input className='ipt' type="text" placeholder={'请输入账户名'} value={name} onChange={(e)=>{this.setParams('name',e.target.value)}}/> 
                        </div>
                        <div className="row">
                            <span className='label'>API_KEY：</span>
                            <input className='ipt' type="text" placeholder={'请输入API_KEY'} value={api_key} onChange={(e)=>{this.setParams('api_key',e.target.value)}}/> 
                        </div>
                        <div className="row">
                            <span className='label'>SECRET_KEY：</span>
                            <input className='ipt' type="text" placeholder={'请输入SECRET_KEY'} value={secret_key} onChange={(e)=>{this.setParams('secret_key',e.target.value)}}/> 
                        </div>
                        <div className="row">
                            <span className='label'>API_PASSWORD：</span>
                            <input className='ipt' type="text" placeholder={'请输入API_PASSWORD'} value={api_password} onChange={(e)=>{this.setParams('api_password',e.target.value)}}/> 
                        </div>
                        <div className="common-btn" onClick={this.addHandle}>确认新增</div>
                    </div>
                </div>
            </div>
        )
    }
}