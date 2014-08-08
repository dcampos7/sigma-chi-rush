
class StudentModel extends Backbone.Model

	urlRoot: '/student/'


class StudentCollection extends Backbone.Collection

	model: StudentModel

	initalize: (attributes) ->
		super attributes

	url: () ->
		'/api/fetch-students/'


class StudentView extends TemplatedView

	events: {
		"click": "openPanel"
		"click .small.read.close-it": "closePanel"
	}

	tagName: "div"

	templateName: "panel-template"

	initalize: (options) ->
		super

	templateArgs: () ->
		{student: @model}

	render: () ->
		super

	openPanel: () ->
		student = @model
		if (!@$el.hasClass('expanded'))
			@closePanel()
			@$el.addClass('expanded').animate({
				width: '830px'
			}, 500, ->

			).find('.content').css({width: '830px'})
			@$el.find('.small.read').hide()
			@$el.find('.footer').hide()
			@$el.find('.content').append('<div class="more-info"></div>')
			more_info = new MoreInfoView({el: $('.more-info'), model: student})
			more_info.render()

	closePanel: () ->
		expanded = $('.expanded')
		expanded.removeClass('expanded').animate({
			width: '320px'
		}, 500, ->

		).find('.content').css({width: '320px'}).append('<div class="more-info></div>')
		expanded.find('.small.read').show()
		expanded.find('.footer').show()
		expanded.find('.more-info').remove()
			


class MoreInfoView extends TemplatedView

	tagName: 'div'

	templateName: 'more-info-template'

	initalize: () ->
		super

	render: () ->
		super


displayStudents = () ->
	$('.panels').children().remove()
	students.each((student) ->
		if (student.attributes.year == $('.year.selected').attr('id') and student.attributes.name.toLowerCase().indexOf(search.val().toLowerCase()) >= 0)
			name = student.get('name').replace(/\ /g, '-').replace("'", "-")
			$('.panels').append('<a id="'+name+'" class="panel navy" data-color="navy"></a>')
			panel = new StudentView({el: $('#'+name), model: student})
			panel.render()
	)

students = new StudentCollection()
students.fetch()
$('.year#Freshman').addClass('selected')
$('.year').click( ->
	$('.year').removeClass('selected')
	$(@).addClass('selected')
	if (search.val().length > 2)
		displayStudents()
)

search = $('.search input')
stoppedTyping = null
search.focus().keyup( ->
	if (search.val().length > 2)
		clearTimeout(stoppedTyping) if stoppedTyping
		stoppedTyping = setTimeout( ->
			displayStudents()
		, 750)
	else
		$('.panels').children().remove()
)


this.StudentModel = StudentModel
this.StudentCollection = StudentCollection
this.StudentView = StudentView
