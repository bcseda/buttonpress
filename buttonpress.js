function buttonViewModel() {
  self = this;
  self.text = ko.observable('Text');
  self.fonts = ko.observableArray([
    {optText: 'Arial', optVal: 'Arial'},
    {optText: 'Times New Roman', optVal: '"Times New Roman"'}
  ]);
  self.selectedFont = ko.observable('Arial')
  self.fontColor = ko.observable('#000')

  this.btnStyle = ko.computed(function(){
    var style = {
      fontFamily: self.selectedFont,
      color: self.fontColor()
    };
    return style;
  },this);
}

$(function(){
  ko.applyBindings(new buttonViewModel());
});
