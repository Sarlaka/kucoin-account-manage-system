import React,{Component} from 'react'

export default class TransferModal extends Component {
    render(){
        const {closeHandle,currency,type} = this.props
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
                            <input className='ipt' type="text" placeholder={'请输入转账数额'}/> 
                        </div>
                        
                        <div className="row" style={{paddingLeft:'90px'}}>
                            可转额度：{currency.available}
                            <span className='all'>全部转账</span>
                        </div>
                        <div className="common-btn">确认转账</div>
                    </div>
                </div>
            </div>
        )
    }
}