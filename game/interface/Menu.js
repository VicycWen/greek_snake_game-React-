import React from 'react';

class Menu extends React.Component {

    state = {
        startBtnDisabled: false,
        pauseBtnDisabled: true,
        pauseBtnName: '暂停游戏',
    }
    
    handleClick = btnType => {
        if(btnType === 'start'){
            this.props.changeGameStatus('start');
            this.setState(function(){
                return {
                    startBtnDisabled: true,
                    pauseBtnDisabled: false,
                }
            })
        }else if(btnType === 'pause'){
            if(this.props.gameStatus === 'pause'){
                this.props.changeGameStatus('playing');
                this.setState(function(){
                    return {
                        pauseBtnName: '暂停游戏',
                    }
                })
            } else {
                this.props.changeGameStatus('pause');
                this.setState(function(){
                    return {
                        pauseBtnName: '继续游戏',
                    }
                })
            }
            
        }else if(btnType === 'help'){
            this.props.changeHelpWrap()
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        if(nextProps.gameStatus === this.props.gameStatus){
            return false;
        }
        // console.log('nextProps:',nextProps,this.props)
        return true;
    }

    render() {
        // console.log('菜单render',this.props);

        return (
            <div>
                <div className="btn startBtn">
                    <button disabled={this.state.startBtnDisabled && this.props.gameStatus !== 'init'} onClick={() => this.handleClick('start')}>开始游戏</button>
                </div>
                <div className="btn pauseBtn">
                    <button disabled={this.state.pauseBtnDisabled || this.props.gameStatus === 'init'} onClick={() => this.handleClick('pause')}>{this.state.pauseBtnName}</button>
                </div>
                <div className="btn helpBtn">
                    <button disabled={this.state.startBtnDisabled && this.props.gameStatus !== 'init'} onClick={() => this.handleClick('help')}>操作说明</button>
                </div>
            </div>
        )
    }
}

export default Menu;
