import React, { Component } from 'react';
import './Select.css';

const hotSearchData = [{menu:true,name:"热门搜索"},{
  securityId:12345,
  symbol:'第一名'
},{
  securityId:12345,
  symbol:'第二名'
},{
  securityId:12345,
  symbol:'第三名'
},{
  securityId:12345,
  symbol:'第四名'
},{
  securityId:12345,
  symbol:'第五名'
},{
  securityId:12345,
  symbol:'第六名'
}];
//const hotSearchData = [{menu:true,name:"热门搜索"}];
const recentSearchData = [{menu:true,name:"最近搜索",clearBtn:true},
  {
    securityId:12345,
    symbol:'哈哈哈啊哈'
  },{
    securityId:12345,
    symbol:'啦啦啦啦'
  },{
    securityId:12345,
    symbol:'嘿嘿嘿'
  },{
    securityId:12345,
    symbol:'呼呼呼呼呼'
  },{
    securityId:12345,
    symbol:'噜噜噜'
  },{
    securityId:12345,
    symbol:'嘎嘎嘎'
  }
];
//const recentSearchData =[{menu:true,name:"最近搜索"}];

const KeyCode = {
  upKeyCode:38,
  downKeyCode:40,
  enterKeyCode:13
};

class List extends Component{
  constructor(props){
    super(props);
    this.state ={ 
      activeIndex:0,
      continue:props.continue
    }
    this.delayIndex = props.delayIndex;
    this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
    this.handleChangeActiveIndex = this.handleChangeActiveIndex.bind(this);

  }
  componentDidMount(){
    document.addEventListener('keydown',this.onDocumentKeyDown);
  }


  handleChangeActiveIndex(index){
    this.setState({activeIndex:index});
  }

  onDocumentKeyDown(e){
    console.log("keydown");
    
    let { data , handleSetInputValue ,delayIndex} = this.props;
    let { activeIndex } = this.state;
    
    let dataLen = data.length;
    let itemHeight = 50;
    if(e === undefined){
      e = window.event
    }
    let _activeIndex = activeIndex;
    console.log(e.keyCode);
    let up_count = 0;
    let down_count = 0;
    let processFunc = (isUp)=>{
     let count = isUp?up_count:down_count;
      if( count === dataLen){
        _activeIndex = 0;
        return;
      }
      if(isUp){
        up_count++
        _activeIndex = _activeIndex - 1 < 0?(dataLen-1):(_activeIndex - 1);
      }else{
        down_count++
        _activeIndex = _activeIndex + 1 > dataLen-1?0:(_activeIndex + 1);
      }
      if(data[_activeIndex].menu){
        processFunc(isUp);
      }
      activeIndex = _activeIndex;
      this.list.scrollTop = activeIndex === 1 ?0:itemHeight*activeIndex;
      if(activeIndex === 0 && data[activeIndex].menu){
        handleSetInputValue("no data");
      }else{
        handleSetInputValue(data[activeIndex].symbol);
      }
      this.handleChangeActiveIndex(activeIndex);
    }

    switch(e.keyCode){
      case KeyCode.upKeyCode:
      processFunc(true);
      break;
      case KeyCode.downKeyCode:
      processFunc(false);
      
      break;
      case KeyCode.enterKeyCode:
      alert( " 股票id为 " + data[activeIndex].securityId + " " + data[activeIndex].symbol);
      break;

      default:
      break;
    }
    
  }
  render(){
    let { data  } = this.props;
    let { activeIndex } = this.state;
    return <ul ref={(ref)=>{this.list = ref}}>
        { 
          data && data.length > 0 ?data.map((item,i)=>{
              return <li key={i} 
              className={(activeIndex === i && !item.menu?"now":"") + (item.menu?' menu':'')}>
              {item.menu?item.clearBtn?<div><span>{item.name}</span><button onClick={()=>{alert("clear")}} style={{textAlign:"right",display:"inline-block"}}>清除</button></div>:<span>{item.name}</span>:<div onClick={()=>{alert('to symbol link')}}>{item.symbol}</div>}
              </li>
          }):"No data!"
          }
      </ul>
  }
}

const RecentSearchList = ({handleSetInputValue})=>{
  return <div>
    <List data={hotSearchData.concat(recentSearchData)} handleSetInputValue={handleSetInputValue}/>
  </div>
}

class Select extends Component {
    constructor(props){
        super(props);
        this.state = {
          data:[
           {securityId:12345,symbol:'股票1'},
           {securityId:13567,symbol:'股票2'},
           {securityId:22222,symbol:'股票3'},
           {securityId:3131231,symbol:'股票4'},
           {securityId:121212,symbol:'股票5'},
           {securityId:12345,symbol:'股票6'},
           {securityId:13567,symbol:'股票7'},
           {securityId:22222,symbol:'股票8'},
           {securityId:3131231,symbol:'股票9'},
           {securityId:121212,symbol:'股票10'}
          ],
          showRecent:false,
          showSearchingResults:false
        }
        this.handleSetInputValue = this.handleSetInputValue.bind(this);
        this.handleOnFocusInput = this.handleOnFocusInput.bind(this);
        this.handleOnBlurInput = this.handleOnBlurInput.bind(this);
        this.handleOnSearching = this.handleOnSearching.bind(this);
    }

    handleOnFocusInput(){
      //requst hot search data and recent search data,and show recentSearchList
      this.setState({showRecent:true});
    }

    handleOnBlurInput(){
     // this.setState({showRecent:false});
    }

    handleOnSearching(e){
      let value = e.target.value;
      
    }
    
    componentDidUpdate(prevProps,prevState ){
      if(prevState.activeIndex !== this.state.activeIndex){
        this.input.value = this.state.data[this.state.activeIndex].symbol;
      }
    }

    handleSetInputValue(value){
      this.input.value = value;
    }


    render() {
      let { data , showRecent } = this.state;
      return (
        <div className="select">
          <input type="text" 
          ref={(ref)=>{this.input = ref}}
        onFocus={this.handleOnFocusInput}
        onBlur={this.handleOnBlurInput} 
        defaultValue=""/>
      {showRecent?<RecentSearchList handleSetInputValue={this.handleSetInputValue}/>:null}  

        </div>
      );
    }
  }
  
  export default Select;