function operationMode(){
    this.clickMode = null;
    this.keyboardMode = null;
    this.pauseClick = null;
}

// 可以加个在移动间隔时间内只能改变一次方向
operationMode.keyboardMode = function(ev){
    // alert(ev.code); // 显示键盘字符串
    if (ev.key == 'd' && this.direction != this.directionNum.left){
        this.direction = this.directionNum.right;
    } else if (ev.key == 's' && this.direction != this.directionNum.up){
        this.direction = this.directionNum.down;
    } else if (ev.key == 'a' && this.direction != this.directionNum.right){
        this.direction = this.directionNum.left;
    } else if (ev.key == 'w' && this.direction != this.directionNum.down){
            this.direction = this.directionNum.up;
    } else if (ev.key == 'q'){
        //pauseBtn.onclick();
    }
//     console.log('keyboardMode this:',this); //这里的this是指snake，它在运行的时候需要绑定
}


operationMode.clickMode = function(event) {
    var e = event;
    // console.log(e);
    const x1 = e.pageX;
    const y1 = e.pageY;

    var snakeHead = document.getElementsByClassName('snakeHead')[0];
    if (snakeHead){

        const snakeHeadPos = getElementPagePosition(snakeHead);
        const x0 = snakeHeadPos.x;
        const y0 = snakeHeadPos.y;
        const newDirection = calculateDirection(x0,y0,x1,y1);
        // console.log(newDirection);

        if (newDirection == 'right' && this.direction != this.directionNum.left){
            this.direction = this.directionNum.right;
        } else if (newDirection == 'down' && this.direction != this.directionNum.up){
            this.direction = this.directionNum.down;
        } else if (newDirection == 'left' && this.direction != this.directionNum.right){
            this.direction = this.directionNum.left;
        } else if (newDirection == 'up' && this.direction != this.directionNum.down){
            this.direction = this.directionNum.up;
        }
    }
    
    return {'x':e.pageX,'y':e.pageY};
}

function getElementPagePosition(element){
    //计算x坐标
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null){
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }
    //计算y坐标
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null){
      actualTop += (current.offsetTop+current.clientTop);
      current = current.offsetParent;
    }
    //返回结果
    return {x: actualLeft, y: actualTop}
  }


function calculateDirection(x0,y0,x1,y1){
    if (x0 == x1){
        if (y1 >= y0){
            return 'down';
        } else{
            return 'up';
        }
    } else{
        const dx = x1-x0;
        const dy = y1-y0;
        const k = dy/dx;
        let angle = Math.atan(k) * 180 / Math.PI;
        if (dx > 0 && dy < 0){
            angle += 360;
        } else if((dx < 0 && dy < 0) || (dx < 0 && dy >= 0)){
            angle += 180;
        }
        // console.log(angle);

        if (angle >= 315 || angle < 45){
            return 'right';
        } else if(angle < 315 && angle >= 225){
            return 'up';
        } else if(angle < 225 && angle >= 135){
            return 'left';
        } else{
            return 'down';
        }
    }
}

operationMode.doubleClickPause = function(ev){
    const status = this.props.gameStatus;
    if (status === 'pause') {
        this.props.changeGameStatus('playing');  // 会刷新一次Snake组件的渲染
    }else if (status === 'playing') {
        this.props.changeGameStatus('pause');
    }
}

export default operationMode
