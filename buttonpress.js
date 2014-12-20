function buttonViewModel() {
  self = this;
  self.text = ko.observable('Text');
  self.fonts = ko.observableArray([
    {optText: 'Arial', optVal: 'Arial, sans-serif'},
    {optText: 'Times New Roman', optVal: '"Times New Roman", serif'}
  ]);
  self.selectedFont = ko.observable('Arial')

  //Border
  self.borderWidth = ko.observable(1);

  //Colors
  self.fontColor = ko.observable('#000000')
  self.baseColor = ko.observable('#cccccc')
  self.borderColor = ko.observable('#333333')
  self.gradientColor = ko.observable('#cccccc')

  self.btnStyle = ko.computed(function(){
    var style = {
      fontFamily: self.selectedFont,
      borderWidth: self.borderWidth()+'px',
      borderStyle: "solid",
      color: self.fontColor,
      backgroundColor: self.baseColor,
      borderColor: self.borderColor
    };
    return style;
  },this);
}

$(function(){
  ko.applyBindings(new buttonViewModel());
});
