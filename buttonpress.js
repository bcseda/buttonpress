function buttonViewModel() {
  self = this;

  function px(val){
    return val + 'px';
  }

  self.text = ko.observable('Text');

  //Font
  self.fonts = ko.observableArray([
    {optText: 'Arial', optVal: 'Arial, sans-serif'},
    {optText: 'Times New Roman', optVal: '"Times New Roman", serif'}
  ]);
  self.selectedFont = ko.observable('Arial');
  self.fontSize = ko.observable(15);

  //Sizing
  self.width = ko.observable(100);
  self.height = ko.observable(20);

  //Horizontal Alignment
  self.horizAlign = ko.observable(0);
  self.appliedHorizAlign = ko.computed(function(){
    return px(self.width() * self.horizAlign() / 100);
  })

  //Border
  self.borderWidth = ko.observable(1);
  self.borderRadiusVal = ko.observable(6);
  self.borderRadiusTL = ko.observable(true);
  self.borderRadiusTR = ko.observable(true);
  self.borderRadiusBL = ko.observable(true);
  self.borderRadiusBR = ko.observable(true);
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

  //Colors
  self.fontColor = ko.observable('#000000');
  self.baseColor = ko.observable('#cccccc');
  self.borderColor = ko.observable('#333333');
  self.gradientColor = ko.observable('#cccccc');

  //Box Shadow
  self.boxShadow = ko.observable(true);
  self.boxShadowInset = ko.observable(true);
  self.boxShadowVerticalAlign = ko.observable(0);
  self.boxShadowHorizontalAlign = ko.observable(0);
  self.boxShadowBlurRadius = ko.observable(0);
  self.boxShadowSpreadRadius = ko.observable(0);
  self.boxShadowColor = ko.observable('#ffffff');
  self.appliedBoxShadow = ko.computed(function(){
      var boxShadow = ''
      if (self.boxShadow() == true) {
        if (self.boxShadowInset())
          boxShadow += 'inset '
        boxShadow += px(self.boxShadowHorizontalAlign())
          + ' ' + px(self.boxShadowVerticalAlign())
          + ' ' + px(self.boxShadowBlurRadius())
          + ' ' + px(self.boxShadowSpreadRadius())
          + ' ' + self.boxShadowColor();
      } else {
        boxShadow = 'none';
      }
      return boxShadow;
  });

  self.btnStyle = ko.computed(function(){

    var style = {
      //hard coded
      textAlign: 'center',
      //Text
      textIndent: self.appliedHorizAlign,
      lineHeight: px(self.height()),
      color: self.fontColor,
      //Size
      width: px(self.width()),
      height: px(self.height()) ,
      //Font
      fontFamily: self.selectedFont,
      fontSize: px(self.fontSize()),
      //Border
      borderWidth: self.borderWidth()+'px',
      borderStyle: "solid",
      borderRadius: self.borderRadii(),
      borderColor: self.borderColor,
      backgroundColor: self.baseColor,

      boxShadow: self.appliedBoxShadow
    };


    return style;
  },this);
}

$(function(){
  ko.applyBindings(new buttonViewModel());
});
