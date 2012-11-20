Titanium.UI.setBackgroundColor('#000');
var _combine = require('combine').combine;
var _style = require('style').style;

var data = [];
var myservice = require('myservice').myservice;

var createRow = function(title, value, callback) {
  var row = Ti.UI.createTableViewRow(_style.row, {
    hasCheck: value
  });
  row.add(Ti.UI.createLabel(_combine(_style.label, {
		left:15,
		text:title,
    width: 200
	})));
  row.addEventListener('click', function() {
    row.hasCheck = !row.hasCheck;
    callback(row.hasCheck);
  });
  return row;
};

data.push(createRow("subscribe to emails", myservice.get('subcribe_emails'), function(value) {
  myservice.save('subcribe_emails', value);
}));
data.push(createRow("subscribe to text", myservice.get('subcribe_text'), function(value) {
  myservice.save('subcribe_text', value);
}));
data.push(createRow("agree to terms", myservice.get('terms'), function(value) {
  myservice.save('terms', value);
}));


var win1 = Titanium.UI.createWindow({  
    title:'Configuration',
    backgroundColor:'#fff'
});

var tableview = Ti.UI.createTableView(_combine(_style.tableview, {
  data: data
}));
win1.add(tableview);

win1.open()