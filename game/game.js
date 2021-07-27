
// 使用前需绑定snake对象
function game() {
    this.game = null;
}

game.gameStartOrContinue = function() {
    if(this.timer !== null){
        clearInterval(this.timer); // 清除掉重新渲染前的timer
    }
    this.timer = setInterval(() => {
        this.getNextPos();
        this.forceUpdate();
    }, 100); //200
    // console.log('gameStartOrContinue exec:',this.timer)
    //添加监听事件

    document.addEventListener('keydown',this.keydownFn);
    document.addEventListener('click',this.clickFn);
    document.addEventListener('dblclick',this.doubleClickPauseFn);
    // document.addEventListener('keydown',event => operationMode.keyboardMode.call(this,event))
    // document.addEventListener('keydown',function(){console.log('keydown')})
}

game.gamePause = function() {
    clearInterval(this.timer);
    // console.log('gamePause exec:',this.timer)
    document.removeEventListener('keydown',this.keydownFn);
    document.removeEventListener('click',this.clickFn);
    // document.removeEventListener('keydown',event => operationMode.keyboardMode.call(this,event));
    // document.removeEventListener('keydown',function(){console.log('keydown')})
}

game.gameEnd = function() {
    clearInterval(this.timer);
    this.linkList = [];
    this.props.changeGameStatus('init');
    // this.initialize();
    // this.props.gameInit(this.pos);

    // 移除监听事件
    document.removeEventListener('keydown',this.keydownFn);
    document.removeEventListener('click',this.clickFn)
    document.removeEventListener('dblclick',this.doubleClickPauseFn);
    this.props.alertGameScore();

}

export default game;
