
class StudentModel extends Backbone.Model

	urlRoot: '/student/'


class StudentCollection extends Backbone.Collection

	model: StudentModel


class StudentView extends TemplatedView

	tagName: "div"

	templateName: "panel-template"

	initalize: (options) ->
		super

	render: () ->
		super
		$('#name').html(@model.get('name'))
		$('#email').html('Email: '+@model.get('email'))
		$('#phone').html('Phone: '+@model.get('phone'))
		$('#house').html('House: '+@model.get('house'))
		$('#room').html('Room: '+@model.get('room'))
		$('#year').html('Year: '+@model.get('year'))


Students = new StudentCollection()
$.get('/fetch-students', (res) ->
	Students.add(res)
	Students.forEach((Student) ->
		name = Student.get('name').replace(' ', '-')
		$('.panels').append('<a id="'+name+'" href="/'+name+'/" class="panel navy" data-color="navy"></a>')
		panel = new StudentView({el: $('#'+name), model: Student})
		panel.render()
	)
)


this.StudentModel = StudentModel
this.StudentCollection = StudentCollection
this.StudentView = StudentView
this.Student = Student