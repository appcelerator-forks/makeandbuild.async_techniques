var _ =  require('underscore-min');
exports.combine = function(source, destination) {
    var target = _.clone(destination);
	var result =  _.extend(source, target);
  Ti.API.info('combined to '+JSON.stringify(result));
	return result;
};