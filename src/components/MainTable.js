import React,{Component} from 'react'
import {Table} from 'antd'
import TransferModal from './TransferModal'
import WithdrawModal from './WithdrawModal'

export default class MainTable extends Component {
    constructor(props){
      super(props)
      this.state = {
        showModal: false,
        showWithdrawModal: false,
        currency:{}
      }
    }
    showModalHandle = (currency) => {
      this.setState({
        currency,
        showModal: true
      })
    }
    closeModalHandle = () => {
      this.setState({
        showModal: false
      })
    }
    showWithdrawModalHandle = (currency) => {
      this.setState({
        currency,
        showWithdrawModal: true
      })
    }
    closeWithdrawModalHandle = () => {
      this.setState({
        showWithdrawModal: false 
      })
    }
    render(){
        const {showModal,showWithdrawModal,currency} = this.state
        const {data,loading,currentUser,recData} = this.props
        const columns = [{
            title: '币种',
            dataIndex: 'currency',
            key: 'currency'
          }, {
            title: '总额',
            dataIndex: 'balance',
            key: 'balance',
          }, {
            title: '可用',
            dataIndex: 'available',
            key: 'available',
          }, {
            title: '锁定',
            key: 'holds',
            dataIndex: 'holds'
          }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span className='operateBox'>
                    <span className='operate' onClick={()=>{this.showModalHandle(record)}}>内部划转</span>
                    <span className="line"></span>
                    <span className='operate' onClick={()=>{this.showWithdrawModalHandle(record)}}>提现</span>
                </span>
            ),
        }]
        return (
            <div>
                <div className="title">储蓄账户详情</div>
                <Table 
                    rowKey={record => record.currency}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    loading={loading}
                />
                {
                  showModal
                  ?<TransferModal 
                    type={'main'}
                    currency={currency}
                    closeHandle={this.closeModalHandle}
                    currentUser={currentUser}
                    recData={recData}
                  />:''
                }
                {
                  showWithdrawModal
                  ?<WithdrawModal
                    currency={currency}
                    closeHandle={this.closeWithdrawModalHandle}
                    currentUser={currentUser}
                  />
                  :''
                }
            </div>
        )
    }
}