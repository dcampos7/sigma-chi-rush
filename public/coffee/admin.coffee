

scrapeActives = (huid, password) ->

	#$.get('./scrape-actives')

	$.post('./scrape-students', {huid: huid, password: password})









$('.rush-info .button').click((e) ->
	e.preventDefault()
	scrapeActives($('.rush-info #huid').val(), $('.rush-info #password').val())
)