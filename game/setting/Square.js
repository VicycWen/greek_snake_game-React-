import React from 'react'

// 接收参数：1.方块宽sw、方块高sh
//          2.x坐标、y坐标、方块类型
class Square extends React.Component {

    createInnerStyle = () => {
        const innerStyle = {
            position: "absolute",
            width: this.props.sw + "px",
            height: this.props.sh + "px",
            left: this.props.x * this.props.sw + 'px',
            top: this.props.y * this.props.sh + 'px',
            transform: 'rotate(' + this.props.rotateDeg + 'deg)',
        }
        return innerStyle;
    }

    render() {
        return (

            <div className={this.props.class}
                style={this.createInnerStyle()}>
                
            </div>

        )
    }
}


export default Square


