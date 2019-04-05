import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
      super(props);
      this.state = {
        list:[
          // {
          //   title:'代办1',
          //   status:false
          // },
          // {
          //   title:'代办2',
          //   status:false
          // },
          // {
          //   title:'已办1',
          //   status:true
          // }
        ]
      };
  }

  // 添加任务
  addData=(e)=>{
    //回车
    if(e.keyCode == 13){

      var listData = this.state.list;
      listData.push({
        title:this.refs.title.value,
        status:false
      });
       //给list重新赋值
       this.renderData(listData);
      // this.setState({
      //   list:listData
      // })

      this.refs.title.value = "";

      // 缓存数据-localstorage
      sessionStorage.setItem('todoData',JSON.stringify(listData));

    }

      


   // alert(this.refs.title.value)
  }

  //删除任务
  deleteData=(id)=>{

    var deleteData = this.state.list;
    deleteData.splice(id,1)
   
    this.renderData(deleteData);
    // this.setState({
    //   list:deleteData
    // })

    // 缓存数据-localstorage
    sessionStorage.setItem('todoData',JSON.stringify(deleteData));

  }

  //改变任务状态
  editChecked=(id)=>{
    // console.log(id)
    //  console.log(this.state.list[id].status)
    this.state.list[id].status = !this.state.list[id].status

    this.renderData(this.state.list);
    // this.setState({
    //   list:this.state.list
    // })

    // 缓存数据-localstorage
    sessionStorage.setItem('todoData',JSON.stringify(this.state.list));

  }

  //渲染数据
   renderData=(value)=>{
    this.setState({
      list:value
    })
   }


  //加载触发，类似Vue里的mounted
  componentDidMount(){
    var data = JSON.parse(sessionStorage.getItem('todoData'));
    if(data){

      this.renderData(data);
      
      // this.setState({
      //   list:data
      // })
    }
  };


  render() {
    return (
      <div className="App">
      <div className="top">
        <h2 className="top-nav">React Todolist案例</h2>
      </div>
      <div className="content">

        <div className="add-nodel">
        <input ref="title" onKeyUp={this.addData}/> 
          {/* <button onClick={this.addData}>增加+</button> */}
          {/* <hr/> */}
        </div>
      

      <h2>待办事件</h2>
          <ul className="list">
            {
              this.state.list.map((value,key)=>{

                if(!value.status){
                  return(
                    // <li key={key}>{key}    -----<button onClick={this.deleteData.bind(key)}>删除-</button> </li>
                    <li key={key}> 
                      <input type='checkbox' defaultChecked={value.status} onChange={this.editChecked.bind(this,key)}/>
                      {value.title} -----
                      {/* <button className="del-btn" onClick={this.deleteData.bind(this,key)}>删除</button> */}
                      <img className="del-img" src={require('./images/del.jpg')} onClick={this.deleteData.bind(this,key)} title="删除"/>
                    </li>
                  )
                }
              })
            }
          </ul>

          <hr/>
          <h2>已完成事件</h2>
          <ul className="list over-list">
          {
              this.state.list.map((value,key)=>{

                if(value.status){
                  return(
                    // <li key={key}>{key}    -----<button onClick={this.deleteData.bind(key)}>删除-</button> </li>
                    <li key={key}> 
                      <input type='checkbox' defaultChecked={value.status}  onChange={this.editChecked.bind(this,key)} />
                      {value.title} -----
                      {/* <button className="del-btn" onClick={this.deleteData.bind(this,key)}>删除-</button> */}
                      <img className="del-img" src={require('./images/del.jpg')} onClick={this.deleteData.bind(this,key)} title="删除"/>
                    </li>
                  )
                }
              })
            }
          </ul>



      </div>
      
      </div>
    );
  }
}

export default App;
