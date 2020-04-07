var bb_data = "samples.json"
// get data using d3 and save to a variable

d3.json(bb_data).then(function(data){
    
// append select options using d3 
d3.select("#selDataset")
.selectAll("option")
.data(data.metadata)
.enter()
.append("option")
.text(function(d){
    return d.id;
})
.attr("value", function(d){
    return d.id;
});
// Set default horizontal bar chart ID 940
var y_array = []
for (var i=0; i< 10; i++){
    y_array.push('OTU-'+ data.samples[0].otu_ids[i].toString())
}
var x_array = data.samples[0].sample_values.slice(0,10);
var hbar_data = [{
    type: 'bar',
    x: x_array,
    y: y_array,
    orientation: 'h'
}];
var layout = {
    yaxis: {autorange: 'reversed'}
}
Plotly.newPlot("bar",hbar_data, layout);
// Set default bubble 
var x2_array = []
for (var y=0;y< data.samples[0].otu_ids.length; y++) {
    x2_array.push(data.samples[0].otu_ids[y].toString())
}
var y2_array = data.samples[0].sample_values;
var trace1 = {
    x: x2_array,
    y: y2_array,
    text: data.samples[0].otu_labels,
    mode: 'markers',
    marker: {
        color: x2_array,
        size: y2_array
    }
};
var data_bubble = [trace1];
Plotly.newPlot('bubble',data_bubble)

// Set default Gauge Chart 
var data_gauge = [
{
    domain: { x: [0, 1], y: [0, 1] },
    value: data.metadata[0].wfreq,
    title: { text: "Wash Frequency" },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
    axis: { range: [0,9] },
    steps: [
        { range: [0, 1], color: "lightgray" },
        { range: [1, 2], color: "gray" },
        { range: [2, 3], color: "dark gray" },
        { range: [3,4], color: "lightgray" },
        { range: [4,5], color: "gray" },
        { range: [5,6], color: "dark gray" },
        { range: [7,8], color: "lightgray" },
        { range: [8,9], color: "grey" }
    ],
    }
}
];
    Plotly.newPlot('gauge',data_gauge)


// Set default demographic information ID 940
var f_sample = data.metadata[0]
d3.select("#sample-metadata")
.append("body")
.html(
    `<b>id </b>${f_sample.id}<br><b>ethnicity </b>${f_sample.ethnicity}
    <br><b>gender </b>${f_sample.gender}
    <br><b>age </b>${f_sample.age}
    <br><b>location </b>${f_sample.location}
    <br><b>bbtype </b>${f_sample.bbtype}
    <br><b>wfreq </b>${f_sample.wfreq}`
)
});
// ----------------------------------

function optionChanged(value){
    // remove d3 data 
    d3.selectAll("#sample-metadata")
    .select("body")
    .remove();
    //-----------
    d3.json(bb_data).then(function(data){
    var metadata = data.metadata;
    for (var i=0; i < metadata.length; i++){
        if (value === metadata[i].id.toString()) {
        var myObject = metadata[i]
        // Add object data into html
        d3.selectAll("#sample-metadata")
        .append("body")
        .html(
            `<b>id </b>${myObject.id}<br><b>ethnicity </b>${myObject.ethnicity}
                    <br><b>gender </b>${myObject.gender}
                    <br><b>age </b>${myObject.age}
                    <br><b>location </b>${myObject.location}
                    <br><b>bbtype </b>${myObject.bbtype}
                    <br><b>wfreq </b>${myObject.wfreq}`
                )
        
        };
        // - Update Bar Chart for id
        var samples_d = data.samples
       
        if (value === samples_d[i].id.toString()){
            //console.log(samples_d[i].id.toString())
            var x_array = samples_d[i].sample_values.slice(0,10);
            var y_array = [];
            for (var x=0; x< samples_d[i].otu_ids.length; x++){
                y_array.push('OTU-'+ samples_d[i].otu_ids[x].toString())
            };
            var hbar_data = [{
                type: 'bar',
                x: x_array,
                y: y_array.slice(0,10),
                orientation: 'h'
            }];
            var layout = {
                yaxis: {autorange: 'reversed'}
            };
            Plotly.newPlot("bar",hbar_data, layout);
            // Bubble Chart 
            var x2_array = []
            for (var y=0;y< samples_d[i].otu_ids.length; y++) {
                x2_array.push(samples_d[i].otu_ids[y].toString())
            }
            var y2_array = samples_d[i].sample_values;
            var trace1 = {
                x: x2_array,
                y: y2_array,
                text: samples_d[i].otu_labels,
                mode: 'markers',
                marker: {
                    color: x2_array,
                    size: y2_array
                }
            };
            var data_bubble = [trace1];
            Plotly.newPlot('bubble',data_bubble)
            //----------

        }

        // - Gauge 
        if (value === metadata[i].id.toString()){
            var data_gauge = [
                {
                  domain: { x: [0, 1], y: [0, 1] },
                  value: metadata[i].wfreq,
                  title: { text: "Wash Frequency" },
                  type: "indicator",
                  mode: "gauge+number",
                  //text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
                  //textposition: 'inside',
                  gauge: {
                    axis: { range: [0,9] },
                    steps: [
                      { range: [0, 1], color: "lightgray" },
                      { range: [1, 2], color: "gray" },
                      { range: [2, 3], color: "dark gray" },
                      { range: [3,4], color: "lightgray" },
                      { range: [4,5], color: "gray" },
                      { range: [5,6], color: "dark gray" },
                      { range: [7,8], color: "lightgray" },
                      { range: [8,9], color: "grey" }
                    ],
                  }
                }
              ];
            Plotly.newPlot('gauge',data_gauge)
        }
        
             
        };

   
    
    });




};

    


// console.log(samples[0].sample_values.slice(0,10))











