
$(function(){
	$('.populate_symptoms').click(function(){
		$.ajax({
			url: `/get_symptoms`,
			data: 0,
			type: 'GET',
			success: function(response){
				response = JSON.parse(response);
				console.log(response)

                var records = 0
                records = response.keys.length

                for (i = 0; i < records; i++) {
                    console.log(i)
                }


			},
			error: function(error){
				console.log(error);
			}
		});

	});
});





$(function(){
	$('.submit').click(function(){
		$.ajax({
			url: `/get_data/symptoms=${symptoms}`,
			data: filters,
			type: 'POST',
			success: function(response){
				response = JSON.parse(response);

			},
			error: function(error){
				console.log(error);
			}
		});

	});
});

