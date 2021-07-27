import React from 'react'

export default class Help extends React.Component {
    // handleClose = function() {
    //     console.log('点击close')
    //     this.parentNode.parentNode.classList.add('hide');

    // }
    handleClose = () => {
        console.log('点击close')
        this.props.changeHelpWrap();
    }

    render() {
        return (
            <div display='none' className='helpWrap'>
                <div className='help'>
                    <span className="close" onClick={this.handleClose}>X</span>
                    <p>操作说明：</p>
                    <p>（鼠标/触屏）点击“开始游戏”按钮开始游戏,单击控制蛇头转向，双击暂停/继续游戏</p>
                    <p>（按键）W-S-A-D：上-下-左-右，Q：暂停/开始</p>
                </div>
            </div>
        )
    }
}

