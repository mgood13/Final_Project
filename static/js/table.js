var table_object = d3.select('.disease_index')
var head = table_object.select('thead')
var head_row = head.append('tr')
head_row.append('th').text('Condition').style('text-align','center').style('border','2px solid black')
head_row.append('th').text('Link').style('text-align','center').style('border','2px solid black')
head_row.append('th').text('Description').style('text-align','center').style('border','2px solid black')


var body = table_object.select('tbody')
d3.csv('/static/js/disease_detail.csv',function(data){
    var body_row = body.append('tr')
    var cell = body_row.append('td')
    .text(`${data['Condition']}`).style('text-align','center').style('border-top','1px solid black')
    var link_cell = body_row.append('td').style('border','1px solid black')
    link_cell.append('a').attr('href',`${data['Link']}`).text('Mayo Clinic').style('text-align','center')
    body_row.append('td').text(`${data['Description']}`).style('text-align','center').style('border-top','1px solid black')



});
