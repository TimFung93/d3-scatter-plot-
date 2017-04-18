let data;




const margin = {
	top: 20,
	bottom: 50,
	left: 70,
	right: 40
}

const width = 940 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;



d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json', function(err, json) {
	if(err) {
		console.log("there has been an err" + err)
	}
	else {
		data = json
		data.forEach(function(d) {
			d.Doping = d.Doping
			d.Name = d.Name
			d.Nationality = d.Nationality
			d.Place = d.Place
			d.Seconds = d.Seconds
			d.Time = d.Time
			d.Url = d.Url
			d.Year = d.Year

		});

		console.log(data)


		let yValue = function(d) {
			return d.Place
		}
		 	


		const xScale = d3.scaleOrdinal().range([width , 0])
		xScale.domain(data.map(function(d) { return d.Time; }));



	


		const yScale = d3.scaleLinear().range([0, height])
		yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);
		

		const xAxis = d3.axisBottom(xScale)
						.tickFormat(function(d) {
							return d
						})
						.ticks(5);
		const yAxis = d3.axisLeft(yScale);




		const toolTip = d3.select('body').append('div')
			.attr('class', 'tooltip')
			.style('opacity', 0)

		const svg = d3.select('body').append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
		.append('g')
			.attr('transform', 'translate(' + margin.left + ',' +margin.top + ')');
		

		svg.append('g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + height + ')')
			.call(xAxis)
		svg.append('text')
			.attr('transform', 
				  'translate(' + (width / 2) + ',' + (height + margin.top + 20) + ')')
			.style('text-anchor', 'middle')
			.style('font-size', 20)
			.text('Minutes Behind Fastest time');

		svg.append('g')
			.attr('class', 'y axis')
			.call(yAxis)
		svg.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('y', 0 - margin.left)
			.attr('x' ,0 - (height / 2))
			.attr('dy', '0.73em')
			.style('text-anchor', 'middle')
			.style('font-size', 20)
			.text('Ranking');
	
	}
})


