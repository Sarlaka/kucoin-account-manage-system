import React,{Component} from 'react'
import {Table, Input, InputNumber, Popconfirm, Form} from 'antd';
import accountController from '../funcStore/storage'

const FormItem = Form.Item;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
      if (this.props.inputType === 'number') {
        return <InputNumber />;
      }
      return <Input />;
    };
  
    render() {
      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        ...restProps
      } = this.props;
      return (
        <EditableContext.Consumer>
          {(form) => {
            const { getFieldDecorator } = form;
            return (
              <td {...restProps}>
                {editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `Please Input ${title}!`,
                      }],
                      initialValue: record[dataIndex],
                    })(this.getInput())}
                  </FormItem>
                ) : restProps.children}
              </td>
            );
          }}
        </EditableContext.Consumer>
      );
    }
  }

class EditableTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = { data:accountController.account, editingKey: '' };
      this.columns = [
        {
          title: 'name',
          dataIndex: 'name',
          width: '15%',
          editable: true,
        },
        {
          title: 'api_key',
          dataIndex: 'api_key',
          width: '20%',
          editable: true,
        },
        {
          title: 'secret_key',
          dataIndex: 'secret_key',
          width: '35%',
          editable: true,
        },
        {
            title: 'api_password',
            dataIndex: 'api_password',
            width: '15%',
            editable: true,
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          render: (text, record) => {
            const editable = this.isEditing(record);
            return (
              <div>
                {editable ? (
                  <span>
                    <EditableContext.Consumer>
                      {form => (
                        <a
                          href="javascript:;"
                          onClick={() => this.save(form, record.id)}
                          style={{ marginRight: 8 }}
                        >
                          保存
                        </a>
                      )}
                    </EditableContext.Consumer>
                    <Popconfirm
                      title="确定取消?"
                      onConfirm={() => this.cancel(record.id)}
                    >
                      <a>取消</a>
                    </Popconfirm>
                  </span>
                ) : (
                    <span>
                        <a onClick={() => this.edit(record.id)} style={{ marginRight: 8 }}>编辑</a>
                        <Popconfirm
                            title="确定删除?"
                            onConfirm={() => this.delete(record.id)}
                        >
                        <a style={{color:'#F75A5A',textDecoration:'underline'}}>删除</a>
                        </Popconfirm>
                    </span>
                )}
              </div>
            );
          },
        },
      ];
    }
    isEditing = record => record.id === this.state.editingKey;

    cancel = () => {
      this.setState({ editingKey: '' });
    };
  
    save(form, key) {
      form.validateFields((error, row) => {
        if (error) {
          return;
        }
        const newData = [...this.state.data];
        const index = newData.findIndex(item => key === item.id);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          accountController.updateAccount(newData)
          this.setState({ data: newData, editingKey: '' });
        } else {
          newData.push(row);
          accountController.updateAccount(newData)
          this.setState({ data: newData, editingKey: '' });
        }
      });
    }
  
    edit(key) {
      this.setState({ editingKey: key });
    }
    delete(id){
        console.log(id)
        const newData = this.state.data.filter(v => v.id!=id)
        accountController.updateAccount(newData)
        this.setState({ data: newData})
    }
    render() {
      const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell,
        },
      };
  
      const columns = this.columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
        };
      });
  
      return (
        <Table
            rowKey={record => record.id}
            components={components}
            bordered
            dataSource={this.state.data}
            columns={columns}
            rowClassName="editable-row"
        //   pagination={{
        //     onChange: this.cancel,
        //   }}
            pagination={false}
        />
      );
    }
}
  

export default class DeleteAccountModal extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        const {closeHandle} = this.props
        return (
            <div className="modalWrapper">
                <div className="modalBox deleteAccountBox">
                    <div className="closeBtn" onClick={closeHandle}>
                        <img className='icon-close' src={`${process.env.PUBLIC_URL}/images/close.png`} alt=""/>
                    </div>
                    <div className="modal-title">管理账户</div>
                    <div className="modal-content">
                        <EditableTable />
                    </div>
                </div>
            </div>
        )
    }
}