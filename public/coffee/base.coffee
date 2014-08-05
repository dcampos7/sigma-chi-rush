
# Base class for views
class BaseView extends Backbone.View
    closed: false
    subviews: null

    initialize: () ->
        @subviews = []

    onClose: () ->

    clearSubviews: () ->
        for subview in @subviews
            subview.close()

        @subviews = []

    addSubview: (view) ->
        @subviews.push(view)
        view.render()

    close: () ->
        @clearSubviews()
        @remove()
        @unbind()
        @onClose()
        @closed = true


# Represents a view backed by a statically assigned underscore.js template
class TemplatedView extends BaseView
    templateArgs: () ->
        {}

    render: () ->
        @$el.html(renderTemplate(@templateName, @templateArgs()))

templateCache = {}


# Returns a template rendered with the given arguments. Uses a cache so that
# templates are only compiled once.
renderTemplate = (name, args) ->
    template = templateCache[name]

    if template == undefined
        templateCache[name] = template = _.template($("#" + name).html())

    template(args)


# add url parameters
addUrlParameters = (url, params) ->
    params = params or {}
    
    if _.isEmpty(params)
        return url

    paramStrings = for key, value of params when value != undefined
        "#{encodeURIComponent(key)}=#{encodeURIComponent(value)}"

    paramString = paramStrings.join("&")
    index = url.indexOf("?")

    if index < 0
        return url + "?" + paramString
    else if index == url.length - 1
        return url + paramString
    else
        return url + "&" + paramString


# export
this.BaseView = BaseView
this.TemplatedView = TemplatedView
this.renderTemplate = renderTemplate
this.addUrlParameters = addUrlParameters