// @TODO: YOUR CODE HERE!

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 50
};

var svgWidth = 960;
var svgHeight = 500;
var svg_Area = d3.select("scatter");


var width = svgWidth = margin.left - margin.right;
var height = svgHeight = margin.top - margin.bottom;

// wrapper

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("transform", 'translate(${margin.left}, ${margin.top})');

varchartGroup = svg.append("g")
    

d3.csv("/assets/data/data.csv", function (error, healthRisks){
    if(error) throw error;
    console.log(healthRisks)

    healthRisks.forEach(function(data){
        data.age = +data.age;
        data.smokes = +data.smokes;

    });

//scale functions
        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max (healthRisks, d=> d.smokes)])
            .range([height, 0]);

        var xLinearScale = d3.scaleLinear()
            .domain([0, d3.extent(healthRisks, d=> d.age)])
            .range([0, width]);

//axis functions
        var x_axis = d3.axisBottom(xLinearScale);
        var y_axis = d3.axisLeft(yLinearScale);

        //tooltip variable
        var tool_tip = d3
            .tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function(data){
                var state = data.state;
                var age= +data.age;
                var smokes = +data.smokes;
                return(state + '<br> Age: ' + age + '%<br> Smokes: ' + smokes + '%'
        );
    });

//call tooltip
        chart.call(tool_tip);

        chart.selectAll("circle")
        .data(healthRisks)
        .enter()
        .append("circle")
        .attr("cx", function(data, index) {
            return xLinearScale(data.age)
        })
        .attr("cy", function(data, index) {
            return yLinearScale(data.smokes)
        })
        .attr("r", "15")
        .attr("fill", "lightblue")

        // display tooltip on click
        .on("mouseenter", function(data) {
            toolTip.show(data);
        })
        // hide tooltip 
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });
    
        chartGroup
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(x_axis);
  
        chartGroup.append('g').call(y_axis);
  
        svg.selectAll(".dot")
        .data(healthRisks)
        .enter()
        .append("text")
        .text(function(data) { return data.abbr; })
        .attr('x', function(data) {
            return xLinearScale(data.age);
      })
        .attr('y', function(data) {
            return yLinearScale(data.smokes);
      })
        .attr("font-size", "10px")
        .attr("fill", "black")
        .style("text-anchor", "middle");
  
        chartGroup
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left + 40)
            .attr('x', 0 - height / 2)
            .attr('dy', '1em')
            .attr('class', 'axisText')
            .text('Smoking (%)');
  
        chartGroup
            .append('text')
            .attr(
                'transform',
                'translate(' + width / 2 + ' ,' + (height + margin.top + 40) + ')',
        )
            .attr('class', 'axisText')
            .text('Age (in years)');

})