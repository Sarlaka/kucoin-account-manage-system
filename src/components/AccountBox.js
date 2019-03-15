import React,{Component} from 'react'
import { Select } from 'antd'
import AddAccountModal from './AddAccountModal'
import DeleteAccountModal from './DeleteAccountModal'
import accountController from '../funcStore/storage'

const Option = Select.Option
export default class AccountBox extends Component {
    constructor(props){
        super(props)
        this.state={
            addModalShow: false,
            deleteModalShow: false
        }
    }
    componentDidMount(){
        if(accountController.account.length>0){
            // let kucoin2 = new ccxt.kucoin2 ({
            //     apiKey: '5c724468134ab731768b7a37',
            //     secret: '3e1c4386-2068-4e86-b985-2d31f7bb8b08',
            //     password: 'by199232'
            //   })
            this.props.initAccountHandle(accountController.account[0])
        }else{
            this.props.loadHandle()
        }
    }
    handleChange=(id)=>{
        const selectAccount = accountController.account.find(v => v.id == id)
        console.log(selectAccount)
        this.props.initAccountHandle(selectAccount)
    }
    addModalShowHandle = () => {
        this.setState({
            addModalShow: !this.state.addModalShow
        })
    }
    deleteModalShowHandle = () => {
        this.setState({
            deleteModalShow: !this.state.deleteModalShow
        })
    }

    render(){
        const {addModalShow,deleteModalShow} = this.state
        return (
            <div className='accountBox'>
                <span className="label">当前账户：</span>
                <Select 
                    placeholder={'请选择账户'}
                    defaultValue={accountController.account.length>0?accountController.account[0].id:undefined} 
                    style={{ width: 260 }} 
                    onChange={this.handleChange}
                >
                    {
                        accountController.account.map(v => {
                            return <Option key={v.id} value={v.id}>{v.name}</Option>
                        })
                    }
                </Select>
                <span className="add" onClick={this.addModalShowHandle}>新增账户</span>
                <span className="delete" onClick={this.deleteModalShowHandle}>管理账户</span>
                {
                    addModalShow
                    ?<AddAccountModal 
                        closeHandle = {this.addModalShowHandle}
                    />
                    :''
                }
                {
                    deleteModalShow
                    ?<DeleteAccountModal 
                        closeHandle = {this.deleteModalShowHandle}
                    />
                    :''
                }
            </div>
        )
    }
}