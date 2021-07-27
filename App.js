import React from 'react';
import './App.css';
import Score from './game/interface/Score';
import Snake from './game/Snake';
import Menu from './game/interface/Menu.js';
import Food from './game/Food';
import Help from './game/interface/Help'
import PauseWrap from './game/interface/PauseWrap'

// render只能渲染一层自定义组件
// App: game
class App extends React.Component {
  constructor(){
    super();
    this.sw = 20;
    this.sh = 20;
  }

  state = {
    score: 0,
    gameStatus: '', //init,start,playing,pause
    foodChangePos: false, 
    snakePos: [],
    foodPos: [],

    helpWrap: true,
  }

  // getScore = () => {
  //   this.setState(function(){
  //     return {
  //       score: this.state.score++,
  //     }
  //   })
  // }

  alertGameScore = () => {
    alert(`你的游戏得分为：${this.state.score}`);
    this.setState(function(){
      return {
        score: 0,
        // gameStatus: '', //init,start,playing,pause
        foodChangePos: false, 
        snakePos: [],
        foodPos: [],

        helpWrap: false,
      }
    })
  }

  changeGameStatus = status => {
    this.setState(function(){
      return {
        gameStatus: status,
      }
    })
  }

  gameInit = pos => {
    console.log('snakeInit pos: ',pos)
    this.setState(function(pos){
      // console.log('snakeInit1 pos: ',pos)
      return {
        score: 0,
        snakePos: pos,
        gameStatus: 'init',

        helpWrap: false,
      }
    })
    // console.log('snakeInit2 pos: ',pos)
  }

  eatFood = pos => {
    console.log('蛇吃食物',pos)
    this.setState(function(){
      return {
        snakePos: pos,
        foodChangePos: true,
        score: this.state.score + 1,
      }
    })
  }
  
  getSnakePos = pos => {
    this.setState(function(){
      return {
        snakePos: pos,
      }
    })
  }

  getFoodPos = pos => {
    // console.log('上报食物位置：',pos)
    this.setState(function(){
      return {
        foodPos: pos,
        foodChangePos: false,
      }
    })
  }

  foodCompenent = () => {
    if(this.state.gameStatus === '' || this.state.gameStatus === 'init'){
      return false;
    }
    // let food = false;
    // if(this.state.foodChangePos){
    //   food = (
    //     <Food foodChangePos={this.state.foodChangePos} 
    //             snakePos={this.state.snakePos} 
    //             getFoodPos={this.getFoodPos}
    //             sw={this.sw} sh={this.sh}></Food>
    //   )
      
    // }else{
    //   food = (
    //     <Food
    //       snakePos={this.state.snakePos} 
    //       getFoodPos={this.getFoodPos}
    //       sw={this.sw} sh={this.sh}></Food>
    //   )
    // }
    let food = <Food 
                  foodChangePos={this.state.foodChangePos}
                  snakePos={this.state.snakePos} 
                  getFoodPos={this.getFoodPos}
                  sw={this.sw} sh={this.sh}></Food>

    return food;
  }
  changeHelpWrap = () => {
    this.setState(function(){
      return {
        helpWrap: !this.state.helpWrap,
      }
    })
  }

  componentDidMount(){
    // console.log('游戏创建成功 this.state',this.state)
  }
  componentDidUpdate(){
    // console.log('游戏更新成功 this.state',this.state)
  }

  render() {
    // const snake = <Snake sw={this.sw} sh={this.sh}></Snake>;
    // console.log(snake)
    // for (let i=0;i<3;i++){
    //   snake.getNextPos();
    // }

    return (
        <div className="content">
          {
            this.state.helpWrap && (this.state.gameStatus === '' || this.state.gameStatus === 'init') && 
              <Help changeHelpWrap={this.changeHelpWrap}></Help>
          }
          {
            this.state.gameStatus === 'pause' && <PauseWrap></PauseWrap>
          }

          <Score score={this.state.score} getScore={this.getScore} />
          <Menu gameStatus={this.state.gameStatus}
            changeGameStatus={this.changeGameStatus}
            changeHelpWrap={this.changeHelpWrap}></Menu>

          <div id="snakeWrap">
            {this.state.gameStatus !== 'end' &&
            <Snake sw={this.sw} sh={this.sh} 
              gameStatus={this.state.gameStatus}
              changeGameStatus={this.changeGameStatus}
              gameInit={this.gameInit}
              foodPos={this.state.foodPos}
              getSnakePos={this.getSnakePos}
              eatFood={this.eatFood}
              alertGameScore={this.alertGameScore}></Snake>
            }
            {
              this.foodCompenent()
            }
          </div>
        </div>
    )
  }

}

export default App;
