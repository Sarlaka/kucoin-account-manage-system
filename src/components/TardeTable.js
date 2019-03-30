import React,{Component} from 'react'
import {Table} from 'antd'
import TransferModal from './TransferModal'

export default class TradeTable extends Component {
    constructor(props){
      super(props)
      this.state = {
        showModal: false,
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
    render(){
        const {showModal,currency} = this.state
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
              <span className='operate' onClick={()=>{this.showModalHandle(record)}}>内部划转</span>
            ),
        }]
        return (
            <div>
                <div className="title">交易账户详情</div>
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
                    type={'trade'}
                    currency={currency}
                    closeHandle={this.closeModalHandle}
                    currentUser={currentUser}
                    recData={recData}
                  />:''
                }
            </div>
        )
    }
}