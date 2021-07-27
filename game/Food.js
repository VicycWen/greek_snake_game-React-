import React from 'react'
import Square from './setting/Square';

// 输入：食物是否需要改变位置，蛇的位置，sw、sh
// 输出：食物的位置，JSX

class Food extends React.Component {
    constructor(props) {
        super(props);
        this.x = null;
        this.y = null;
    }
    createFood = () => {
        if(this.x !== null && this.y !== null){
            if(this.props.foodChangePos === undefined || this.props.snakePos === undefined || !this.props.foodChangePos){
                return null;
            }
        }
        // console.log('创建食物1 this.props',this.props)

        let inSnake = true;
        const td=30,tr=30;
        while (inSnake){
            this.x = Math.round(Math.random() * (td - 1));
            this.y = Math.round(Math.random() * (tr - 1));
            
            // console.log('创建食物2 this.props',this.props)
            inSnake = false;
            this.props.snakePos.forEach((value) => {
                // console.log('创建食物3 this.props',this)
                if(this.x === value[0] && this.y === value[1]){
                    inSnake = true;
                }                
            })
            // include = false;
        }
        
        
        this.props.getFoodPos([this.x,this.y]);
        // this.props.foodChangePos2False();
    }

    shouldComponentUpdate(nextProps){
        // 这一次跟下一次不一样就应该更新
        // console.log('食物是否应该更新，nextprops：',nextProps,'foodChangePos:',this.props.foodChangePos)
        // foodChangePos变为true渲染一次(未成功)，再置为false渲染一次
        return this.props.foodChangePos;
        // return this.props.foodChangePos && !nextProps.foodChangePos; // 未成功
        // return nextProps.foodChangePos; //食物位置未上报成功，以第二次渲染为准
    }

    render() {      
        this.createFood();
        const sw=this.props.sw, sh=this.props.sh;
        const key = this.x.toString() + this.y.toString();
        // console.log('食物render key: ',key)
        return (
            <Square x={this.x} y={this.y} sw={sw} sh={sh} class='food' key={key}></Square>
        )
    }
}

export default Food


