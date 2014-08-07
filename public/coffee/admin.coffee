

scrapeActives = (huid, password) ->

	#$.get('./scrapers/actives')

	$.post('./scrapers/students', {huid: huid, password: password})









$('.rush-info .button').click((e) ->
	e.preventDefault()
	scrapeActives($('.rush-info #huid').val(), $('.rush-info #password').val())
)