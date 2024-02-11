import React, { Component} from 'react';
import './styleChart.css';

export default class ChartRace extends Component{
	constructor(props){
		
		super(props);
		this.state = {
			data: this.props.data.sort((a,b) => a.value - b.value),
			temp: this.props.data,
			maxValue: Math.max.apply(Math, this.props.data.map(item => item.value))
		};
	}

	static getDerivedStateFromProps(nextProps, prevState){
		let newProps = [...nextProps.data];
		return {
			data: nextProps.data,
			temp: newProps.sort((a,b) => a.value - b.value),
			maxValue: Math.max.apply(Math, nextProps.data.map(item => item.value))
		};
	}

	draw(item, index){
		let viewportWidth = window.outerWidth * this.props.width;
		const indis = this.state.temp.findIndex(temp => temp.id === item.id );
		const translateY = indis === 0 ? this.props.paddingy : ( this.props.paddingy + ( indis * this.props.itemHeight ) + ( indis * this.props.gap ) );
		return(
			<div key={index} className="raceItem" style={{ height: this.props.itemHeight, transform: 'translateY('+ translateY +'px) translateX('+ this.props.padding +'px)' }}>
				<b style={{ backgroundColor: item.color, width: item.value / this.state.maxValue * ( viewportWidth - ( 2 * this.props.paddingbar ) ) }}></b>
				<span>
					<em style={this.props.titleStyle}>{ item.title }</em>
					<i style={this.props.valueStyle}>{ "+" + item.value + " sec"}</i>
				</span>
			</div>
		);
	}

	render(){
		return(
			<div className="raceArea" style={{ backgroundColor: this.props.backgroundColor, paddingTop: this.props.padding, paddingBottom: this.props.padding, width: this.props.width, height: ( 2 * this.props.padding ) + ( this.state.temp.length * this.props.itemHeight ) + ( (this.state.temp.length - 1) * this.props.gap ) }}>
				{ this.state.data.map((item, index) => this.draw(item, index)) }
			</div>
		);
	}

}

ChartRace.defaultProps = {
	data: [],
	backgroundColor: '#f9f9f9',
	width: 680,
	padding: 20,
	paddingy: 20,
	paddingbar: 20,
	itemHeight: 38,
	gap: 4,
	titleStyle: { font: 'normal 400 9px Arial', color: '#212121' },
	valueStyle: { font: 'normal 400 7px Arial', color: '#777'}
};