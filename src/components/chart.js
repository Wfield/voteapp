import React, { Component } from 'react'
import * as d3 from 'd3'

class Chart extends Component{
	componentDidMount(){
		let options= this.props.options.slice(0);
		let colors= d3.scaleOrdinal(d3.schemeCategory10);
		let pie= d3.pie().value(function(d){
			return d.vote;
		})(options);
		let svg= d3.select('div#graph').append('svg')
					.attr('width', 300)
					.attr('height', 600);
		let arc= d3.arc()
					.innerRadius(0)
					.outerRadius(150);
		let bodyG= svg.append('g')
						.attr("transform", "translate("+150+","+150+")");
		bodyG.selectAll('path')
						.data(pie)
						.enter()
						.append('path')
						.attr("d", function(d){
							return arc(d);
						})
						.attr('fill', function(d, i){
							return colors(i);
						});
		bodyG.selectAll("text")
			.data(pie)
			.enter()
			.append('text')
			.transition()
			.attr('transform', function(d){
				return "translate("+arc.centroid(d)+")";
			})
			.text(function(d){
				return d.value;
			});
		let tagG= svg.append('g')
					.attr('transform', "translate("+0+","+320+")");
		tagG.selectAll('rect')
				.data(options)
				.enter()
				.append('rect')
				.attr('x', function(d, i){
					return ((100*(i%3)) +50) +'px';
				})
				.attr('y', function(d, i){
					return Math.floor(i/3)*70+ 20+'px';
				})
				.attr('width', 30)
				.attr('height', 30)
				.attr('fill', function(d, i){
					return colors(i);
				});
		tagG.selectAll('text')
			.data(options)
			.enter()
			.append('text')
			.attr('transform', function(d, i){
				return "translate("+((i%3)*100)+", "+(Math.floor(i/3)*70+ 20)+")";
			})
			.text(function(d){
				return d.value;
			});
	}

	render(){

		return (
			<div id='graph'>
			</div>
		)
	}
}
export default Chart