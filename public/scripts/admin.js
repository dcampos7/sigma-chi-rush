// Generated by CoffeeScript 1.7.1
(function() {
  var scrapeActives;

  scrapeActives = function(huid, password) {
    return $.post('./scrape-students', {
      huid: huid,
      password: password
    });
  };

  $('.rush-info .button').click(function(e) {
    e.preventDefault();
    return scrapeActives($('.rush-info #huid').val(), $('.rush-info #password').val());
  });

}).call(this);

//# sourceMappingURL=admin.map
