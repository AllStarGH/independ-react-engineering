import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { is, fromJS } from 'immutable'; // 保证数据的不可变
import './header.less';

/**
 * This class describes a mine header.
 *
 * @class      MineHeader (name)
 */
export default class MineHeader extends Component {
    constructor(props) {
        super(props);
        console.log(this);
    }

    componentDidMount() {
        console.log('MineHeader Component DID MOUNT!')
        console.log(this);
    }

    /**
     * 如果 shouldComponentUpdate 返回 false,则 render() 将不会执行,直到下一次 state 改变.（另外,componentWillUpdate 和 componentDidUpdate 也不会被调用.）
     *
     * @param      {<type>}  nextProps  The next properties
     * @param      {<type>}  nextState  The next state
     * @return     {<type>}  { description_of_the_return_value }
     */
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.info(nextProps);
    //     console.info(nextState);
    //     // 判断是否要更新render,true=更新;false=不更新
    //     return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    // }

    // componentWillReceiveProps(newProps) {
    //     console.log('MineHeader Component WILL RECEIVE PROPS!');
    //     console.dir(newProps);
    // }

    // \\\\\\\\\\\\\\\\\\\\\\\

    static propTypes = {
        targetUrlName: PropTypes.string.isRequired,
        targetUrl: PropTypes.string.isRequired,
    }

    // \\\\\\\\\\\\\\\\\\\\\\\
    render() {
        return (
            <header className="public_header" ref="own_header">
        <div className="line_div_super name_div">
            <em className="developer_name"> AllStarGH </em>
        </div>
        <div className="line_div_super" id="side_link_container">
            <div className="side_link line_div">

                <Link to={this.props.targetUrl} className='address_jump'> {this.props.targetUrlName} </Link>

            </div>
            <div className="side_link line_div">

                <Link to="/" className='address_jump'> 返回首页 </Link>

            </div>
            <div className="side_link line_div">

                <Link to="#" className='address_jump'> 本站简介 </Link>
            </div>
        </div>
    </header>
        );
    }
}