function buttonViewModel() {
  self = this;
  self.text = ko.observable('Text');
  self.fonts = ko.observableArray([
  {optText: 'Arial', optVal: 'Arial, sans-serif'},
{optText: 'Times New Roman', optVal: '"Times New Roman", serif'}
]);
self.selectedFont = ko.observable('Arial');

//Sizing
self.width = ko.observable(100);
self.height = ko.observable(20);

//Border
self.borderWidth = ko.observable(1);
self.borderRadiusVal = ko.observable(6);
self.borderRadiusTL = ko.observable(true);
self.borderRadiusTR = ko.observable(true);
self.borderRadiusBL = ko.observable(true);
self.borderRadiusBR = ko.observable(true);

//Colors
self.fontColor = ko.observable('#000000');
self.baseColor = ko.observable('#cccccc');
self.borderColor = ko.observable('#333333');
self.gradientColor = ko.observable('#cccccc');

function px(val){
  return val + 'px';
}

self.borderRadii = ko.computed( function() {
  var radii = '';
  var bools = [self.borderRadiusTL(),
    self.borderRadiusTR(),
    self.borderRadiusBR(),
    self.borderRadiusBL()];
  for (i=0; i < bools.length; i++) {
    if (bools[i] == true)
      radii += self.borderRadiusVal() + 'px';
    else
      radii += 0;
    if (i != bools.length)
      radii += ' ';
  }
  return radii;
});


self.btnStyle = ko.computed(function(){

  var style = {
    //hard coded
    textAlign: 'center',

    width: px(self.width()),
    height: px(self.height()) ,
    lineHeight: px(self.height()),
    fontFamily: self.selectedFont,
    borderWidth: self.borderWidth()+'px',
    borderStyle: "solid",
    borderRadius: self.borderRadii(),
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
