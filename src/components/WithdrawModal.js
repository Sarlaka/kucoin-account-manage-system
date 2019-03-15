import React,{Component} from 'react'
import { Select } from 'antd'
import 'antd/lib/select/style/css'

const Option = Select.Option;

export default class TransferModal extends Component {
    handleChange = (value)=> {
        console.log(`selected ${value}`)
    }
      
    render(){
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
                            <input className='ipt' type="text" placeholder={'请输入提现数额'}/> 
                        </div>
                        <div className="row" style={{paddingLeft:'90px'}}>
                            最大可提现额度：{currency.available}
                            <span className='all'>全部提现</span>
                        </div>
                        <div className="row">
                            <span className="label">类型选择：</span>
                            <Select defaultValue="1" style={{ width: 260 }} onChange={this.handleChange}>
                                <Option value="1">提现至已有账户</Option>
                                <Option value="2" disabled>自定义地址输入</Option>
                            </Select>
                        </div>
                        <div className="row">
                            <span className="label">账户选择：</span>
                            <Select defaultValue="1" style={{ width: 260 }} onChange={this.handleChange}>
                                <Option value="1">账户1</Option>
                                <Option value="2">账户2</Option>
                            </Select>
                            <span className='all'>获取地址</span>
                        </div>
                        <div className="row">
                            <span className='label'>提现地址：</span>
                            <input className='ipt' type="text" disabled placeholder='输入提现地址'/>
                        </div>
                        <div className="common-btn">确认提现</div>
                    </div>
                </div>
            </div>
        )
    }
}