import React from 'react'
import ReactDOM from 'react-dom'
import Square from './setting/Square';
import operationMode from './setting/setting';
import game from './game'
// console.log('operationMode:',operationMode.keyboardMode)
// console.log('game:',game.gameEnd)

// 输入：食物位置，游戏状态,方块宽sw、方块高sh
// 输出：蛇位置，游戏状态，吃食物
class Snake extends React.Component {
    constructor(props){
        super(props);
        // this.head = null;
        // this.tail = null;
        this.pos = [];

        this.linkList = []; // 尾 ->身体 -> 头
        this.timer = null;
        this.keydownFn = event => operationMode.keyboardMode.call(this,event); //提前绑定this，使监听事件能有效移除
        this.clickFn = event => operationMode.clickMode.call(this, event);
        this.doubleClickPauseFn = event => operationMode.doubleClickPause.call(this,event);

        this.directionNum = {
            left:{
                x:-1,
                y:0,
                rotate:180,
            },
            right:{
                x:1,
                y:0,
                rotate:0,
            },
            up:{
                x:0,
                y:-1,
                rotate:-90,
            },
            down:{
                x:0,
                y:1,
                rotate:90,
            }
           
        
        }
        this.direction = this.directionNum.right;
    }

    createSquare = (x,y,className) => {
        const sw=this.props.sw, sh=this.props.sh;
        const key = x.toString() + y.toString();
        const deg = className === "snakeHead"
                  ? this.direction.rotate
                  : 0;
        return (
            <Square x={x} y={y} class={className} 
            sw={sw} sh={sh} key={key}
            rotateDeg={deg}></Square>
        )
    }

    initialize = () => {
        this.pos = [];
        this.direction = this.directionNum.right;

        let snakeHead = this.createSquare(2,0,'snakeHead');
        // this.head = snakeHead;
        this.pos.push([2,0]);

        let snakeBody1 = this.createSquare(1,0,'snakeBody');
        this.pos.push([1,0]);

        let snakeBody2 = this.createSquare(0,0,'snakeBody');
        // this.tail = snakeBody2;
        this.pos.push([0,0]);

        this.linkList = [snakeBody2,snakeBody1,snakeHead];

        // console.log('snakeHead:',snakeHead.props)
        

        return this.linkList;

    }

    getNextPos = () => {
        const len = this.linkList.length;
        const td = 30,tr = 30;
        let nextPos = [
            this.linkList[len-1].props.x + this.direction.x,
            this.linkList[len-1].props.y + this.direction.y,
        ];

        //下个点是食物
        // console.log('蛇感知食物位置getNextPos ',this.props.foodPos,nextPos)
        if(this.props.foodPos[0] === nextPos[0] && this.props.foodPos[1] === nextPos[1]){
            foodDisappear(); //提前把食物吃掉，保持动画合理性
            this.props.eatFood(this.pos);
            this.strategies.eat();           
            return null;
        }
        
        
        //下个点是自己
        let dieBySelf = false;
        this.pos.forEach(value => {           
            if(value[0] == nextPos[0] && value[1] === nextPos[1]){
                console.log("撞到自己了")
                this.strategies.die();
                dieBySelf = true;
            }
        })
        if(dieBySelf){return null;}

        //下个点是墙
        if (nextPos[0] < 0 || nextPos[1] < 0 || nextPos[0] > td - 1 || nextPos[1] > tr - 1){
            console.log("撞到墙上了")
            this.strategies.die();
            return null;
        }



        this.strategies.move();
        this.props.getSnakePos(this.pos);
        return null;

    }

    strategies = {
        // format表示是否保留蛇尾
        move: (format=false) => {
            const len = this.linkList.length;
            // props只能读取，不能修改
            // this.linkList[len-1].props.class = "snakeBody"
            const x = this.linkList[len-1].props.x,
                  y = this.linkList[len-1].props.y,
                  nextX = x + this.direction.x,
                  nextY = y + this.direction.y;
            
            const newBody = this.createSquare(x,y,"snakeBody");
            const newHead = this.createSquare(
                nextX,
                nextY,
                "snakeHead",
            )
            // console.log('this.direction.x:',this.direction.x,' x:',x)

            this.linkList.pop();
            this.linkList.push(newBody);
            this.linkList.push(newHead);
            this.pos.push([nextX,nextY]);

            if(!format){
                this.linkList.shift();
                this.pos.shift();
            }
        },
        eat: () => {
            this.strategies.move(true)
            return null;
        },
        die: () =>{
            // this.gameEnd();
            game.gameEnd.call(this);
            
            return ''
        }
    }

    // gameStartOrContinue = () => {
    //     if(this.timer !== null){
    //         clearInterval(this.timer); // 清除掉重新渲染前的timer
    //     }
    //     this.timer = setInterval(() => {
    //         this.getNextPos();
    //         this.forceUpdate();
    //     }, 100); //200
    //     console.log('gameStartOrContinue exec:',this.timer)
    //     //添加监听事件

    //     document.addEventListener('keydown',this.keydownFn);
    //     // document.addEventListener('keydown',function(){console.log('keydown')})
    // }
    // gamePause = () => {
    //     clearInterval(this.timer);
    //     // console.log('gamePause exec:',this.timer)
    //     document.removeEventListener('keydown',this.keydownFn);
    //     // document.removeEventListener('keydown',event => operationMode.keyboardMode.call(this,event));
    //     // document.removeEventListener('keydown',event => operationMode.keyboardMode.call(this,event));
    //     // document.removeEventListener('keydown',function(){console.log('keydown')})
    // }
    // gameEnd = () => {
    //     clearInterval(this.timer);
    //     this.linkList = [];
    //     this.props.changeGameStatus('');

    //     // 移除监听事件
    //     document.removeEventListener('keydown',event => operationMode.keyboardMode.call(this,event));

    //     this.props.alertGameScore();

    // }

    componentDidMount() {
        this.initialize();
        this.props.getSnakePos(this.pos);
        // this.props.changeGameStatus('init');
        // const snakePos = [...this.pos];
        // this.props.snakeInit(this.pos);

        // console.log('蛇创建成功 this.props:',this.props)
        // console.log('蛇创建成功 this.pos:',this.pos)           
    }

    componentDidUpdate() {
        const status = this.props.gameStatus;
        if(status === null || status === undefined || status === 'init'){
            this.initialize();
            // this.props.snakeInit(this.pos);
        }else if (status === 'start') {
            this.props.changeGameStatus('playing');  // 会刷新一次Snake组件的渲染
            // this.gameStartOrContinue(); 
            // game.gameStartOrContinue.call(this);
            // console.log('status === start or continue, gameStatus: ',this.props.gameStatus)          
        }else if(status === 'playing'){
            game.gameStartOrContinue.call(this);
        }
        else if (status === 'pause') {
            // console.log("snake will pause")
            // this.gamePause();
            game.gamePause.call(this);
        }
        // else if (status === 'end') {
        //     // this.gameEnd();
        //     // game.gameEnd.call(this);
        //     this.initialize();
        // }
        // console.log('蛇更新成功 this.props:',this.pos,this.props) 
    }

    componentWillUnmount(){
        if(this.timer !== null){
            clearInterval(this.timer); // 清除掉重新渲染前的timer
        }
    }

    // handleGameStatus = () => {
    //     const status = this.props.gameStatus;
    //     if(status === null || status === undefined || status === ''){
    //         this.initialize();
    //         this.props.changeGameStatus('init');
    //     }else if (status === 'start') {
    //         this.props.changeGameStatus('playing');  // 会刷新一次Snake组件的渲染
    //         this.gameStartOrContinue();           
    //     }else if (status === 'pause') {
    //         // console.log("snake will pause")
    //         this.gamePause();
    //     }else if (status === 'end') {
    //         this.gameEnd();
    //     }   
    // }

    render() {       
        // this.handleGameStatus();
       
        // console.log("Snake render status:",status)
        // console.log('蛇感知食物位置render ',this.props.foodPos) //没问题
        return (
                this.linkList
            )
    }
}

function foodDisappear(){
    const food = document.getElementsByClassName('food')[0];
    food.style.display = 'none';
}

export default Snake


