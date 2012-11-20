exports.style = {
  row: {
    className: 'settingRow',
    height: 45,
    backgroundColor: '#ffffff',
    selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
  },
  tableview: {
    backgroundColor: 'transparent',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    // height: Ti.UI.SIZE,
    width: 'auto',
    style: Ti.UI.iPhone.TableViewStyle.GROUPED
  },
  label: {
    width: 'auto',
    height: 'auto',
    font: {
      fontSize: '14dp',
      fontWeight: 'bold'
    }
  }
};
