import React from 'react';

class Menu extends React.Component {

    state = {
        startBtnDisabled: false,
        pauseBtnDisabled: true,
        pauseBtnName: '暂停游戏',

        startBtnHover: '',
        pauseBtnHover: '',
        helpBtnHover: '',
    }
    
    handleClick = btnType => {
        if(btnType === 'start'){
            this.props.changeGameStatus('start');
            this.setState(function(){
                return {
                    startBtnDisabled: true,
                    pauseBtnDisabled: false,

                    startBtnHover: '',
                    helpBtnHover: '',
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

    // 处理各个按钮的悬停事件
    handleHover = (type) => {
        if(type === 'startBtn'){
            if(this.props.gameStatus === 'init' || !this.props.gameStatus){
                this.setState(function(){
                    return {
                        startBtnHover: 'btn-hover',
                    }
                })
                this.forceUpdate();
            }
        }else if(type === 'startBtn-leave'){
            this.setState(function(){
                return {
                    startBtnHover: '',
                }
            })
            this.forceUpdate();
        }else if(type === 'helpBtn'){
            if(this.props.gameStatus === 'init' || !this.props.gameStatus){
                this.setState(function(){
                    return {
                        helpBtnHover: 'btn-hover',
                    }
                })
                this.forceUpdate();
            }
        }else if(type === 'helpBtn-leave'){
            this.setState(function(){
                return {
                    helpBtnHover: '',
                }
            })
            this.forceUpdate();
        }else if(type === 'pauseBtn'){
            // if(this.props.gameStatus === 'playing'){
                this.setState(function(){
                    return {
                        pauseBtnHover: 'btn-hover',
                    }
                })
                this.forceUpdate();
            // }
        }else if(type === 'pauseBtn-leave'){
            this.setState(function(){
                return {
                    pauseBtnHover: '',
                }
            })
            this.forceUpdate();
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
                <div className="btn startBtn" >
                    <button className={this.state.startBtnHover} 
                       disabled={this.state.startBtnDisabled && this.props.gameStatus !== 'init'} 
                       onClick={() => this.handleClick('start')}
                       onMouseOver={() => this.handleHover('startBtn')}
                       onMouseLeave={() => this.handleHover('startBtn-leave')}>开始游戏</button>
                </div>
                <div className="btn pauseBtn">
                    <button className={this.state.pauseBtnHover} 
                      disabled={this.state.pauseBtnDisabled || this.props.gameStatus === 'init'} 
                      onClick={() => this.handleClick('pause')}
                      onMouseOver={() => this.handleHover('pauseBtn')}
                      onMouseLeave={() => this.handleHover('pauseBtn-leave')}>{this.state.pauseBtnName}</button>
                </div>
                <div className="btn helpBtn">
                    <button className={this.state.helpBtnHover} 
                      disabled={this.state.startBtnDisabled && this.props.gameStatus !== 'init'} 
                      onClick={() => this.handleClick('help')}
                      onMouseOver={() => this.handleHover('helpBtn')}
                      onMouseLeave={() => this.handleHover('helpBtn-leave')}>操作说明</button>
                </div>
            </div>
        )
    }
}

export default Menu;
