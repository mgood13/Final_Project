var symptom_object
var symptoms


$(function(){
	$('.populate_symptoms').click(function(){
		$.ajax({
			url: `/get_symptoms`,
			data: 0,
			type: 'GET',
			success: function(response){

			    $('.tab-pane tbody tr').detach();
				response = JSON.parse(response);

				symptom_object = response

                var records = 0
                records = response.keys().length

                var count = 0;
                for (var i in response) {

                    count = count + 1;
                }
                for (i = 0; i < count; i++) {
                    var category = response[i]['Category']

                    var panel = d3.select("#" + category)
                    var tablebody = panel.select('tbody')
                    var row = tablebody.append('tr')
                    var cell = row.append('td')
                    cell.text(response[i]['Clean'])
                    var cell = row.append('td')
                    var div = cell.append('div')
                    var radioone = div.append('input')
                    radioone.attr('class',`form-check-input`)
                    .attr('type','checkbox')
                    .attr('name',"symptoms")
                    .attr('value',`${response[i]['colName']}`)

                }
                var checkboxes = document.querySelectorAll("input[type=checkbox][name=symptoms]");

                checkboxes.forEach(function(checkbox) {
                  checkbox.addEventListener('change', function() {
                    symptoms =
                      Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
                      .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
                      .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.

                    console.log(symptoms[0])

                    image = d3.select('.diagnosis_image')
                    image.attr('src',`../images/${symptoms[0]['Prognosis']}`)


                      })
                   });

			},
			error: function(error){
				console.log(error);
			}
		});

	});
});














$(function(){
	$('.diagnose').click(function(){

        var symptoms_json = JSON.stringify(symptoms);

		$.ajax({
			url: `/diagnose/symptoms=${symptoms_json}`,
			data: 0,
			type: 'POST',
			success: function(response){
				response = JSON.parse(response);
				console.log(response)


				console.log(response[0])

                    image = d3.select('.diagnosis_image')
                    image.attr('src',`/static/images/${response[0]['Prognosis']}.png`)
                    .attr('height', 500)
                    .attr('width',600)

                    $('.other_diseases thead tr').detach();
                    $('.other_diseases tbody tr').detach();

                    $('.jumbotron_placeholder div').detach();

                    var option_table = d3.select('.other_diseases')
                    var t_head = option_table.select('thead')
                    var optionrow = t_head.append('tr')
                    optionrow.append('th').text('Disease')
                    optionrow.append('th').text('Probability')

                    var t_body = option_table.select('tbody')
                    var outputs_row = t_body.append('tr')
                    outputs_row.append('td').text(`${response[0]['Prognosis']}`)
                    outputs_row.append('td').text(`${Math.round(response[0]['Probability'] * 10000) / 100}%`)


                    var outputs_row = t_body.append('tr')
                    outputs_row.append('td').text(`${response[1]['Prognosis']}`)
                    outputs_row.append('td').text(`${Math.round(response[1]['Probability'] * 10000) / 100}%`)
                    console.log(`${Math.round(response[1]['Probability'] * 10000) / 100}%`)

                    var outputs_row = t_body.append('tr')
                    outputs_row.append('td').text(`${response[2]['Prognosis']}`)
                    outputs_row.append('td').text(`${Math.round(response[2]['Probability'] * 10000) / 100}%`)


                    var make_card = d3.select('.jumbotron_placeholder')
                    var card_body = make_card.append('div').attr('class', 'jumbotron').style('border-radius','30px')
                    card_body.append('h2').attr('class','display-4').text('Most Likely Diagnosis').style('text-align','center')
                    card_body.append('p').attr('class','lead').text(`${response[0]['Prognosis']}`).style('text-align','center')
                    card_body.append('hr').attr('class', 'my-4')
                    card_body.append('p').attr('class','lead').text('For more information click Learn More').style('text-align','center')
                    var button = card_body.append('p').attr('class','lead').style('text-align','center')
                    button.append('a').attr('class','btn btn-primary btn-lg').attr('href','/GetData').attr('role','button').text('Learn More')

			},
			error: function(error){
				console.log(error);
			}
		});

	});
});




$(function(){
	$('.disease_index').click(function(){

        var symptoms_json = JSON.stringify(symptoms);

		$.ajax({
			url: `/diagnose/symptoms=${symptoms_json}`,
			data: 0,
			type: 'POST',
			success: function(response){
				response = JSON.parse(response);
				console.log(response)


				console.log(response[0])

                    image = d3.select('.diagnosis_image')
                    image.attr('src',`/static/images/${response[0]['Prognosis']}.png`)
                    .attr('height', 500)
                    .attr('width',500)


                    var make_card = d3.select('.jumbotron_placeholder')
                    console.log(make_card)
                    var card_body = make_card.append('div').attr('class', 'jumbotron')
                    card_body.append('h2').attr('class','display-4').text('Most Likely Diagnosis')
                    card_body.append('p').attr('class','lead').text(`${response[0]['Prognosis']}`)
                    card_body.append('hr').attr('class', 'my-4')
                    card_body.append('p').attr('class','lead').text('For more information click Learn More')
                    var button = card_body.append('p').attr('class','lead')
                    button.append('a').attr('class','btn btn-primary btn-lg').attr('href','/GetData').attr('role','button').text('Learn More')

			},
			error: function(error){
				console.log(error);
			}
		});

	});
});

