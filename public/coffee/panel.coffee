
class StudentModel extends Backbone.Model

	urlRoot: '/student/'


class StudentCollection extends Backbone.Collection

	model: StudentModel

	initalize: (attributes) ->
		super attributes

	url: () ->
		'/api/fetch-students/'


class StudentView extends TemplatedView

	tagName: "div"

	templateName: "panel-template"

	initalize: (options) ->
		super

	templateArgs: () ->
		{student: @model}

	render: () ->
		super


students = new StudentCollection()
students.fetch()

search = $('.search input')
stoppedTyping = null
search.focus().keyup( ->
	if (search.val().length > 2)
		clearTimeout(stoppedTyping) if stoppedTyping
		stoppedTyping = setTimeout( ->
			$('.panels').children().remove()
			students.each((student) ->
				if (student.attributes.name.toLowerCase().indexOf(search.val().toLowerCase()) >= 0)
					name = student.get('name').replace(/\ /g, '-').replace("'", "-")
					$('.panels').append('<a id="'+name+'" href="/'+name+'/" class="panel navy" data-color="navy"></a>')
					panel = new StudentView({el: $('#'+name), model: student})
					panel.render()
			)
		, 500)
)


this.StudentModel = StudentModel
this.StudentCollection = StudentCollection
this.StudentView = StudentView
