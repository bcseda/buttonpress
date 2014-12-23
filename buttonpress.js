function buttonViewModel() {
  self = this;

  function px(val){
    if (val != 0)
      val = val + 'px'
    return val;
  }

  self.text = ko.observable('Text');
  self.className = ko.observable('classname');

  //Font
  self.fonts = ko.observableArray([
    {optText: 'Arial', optVal: 'Arial, sans-serif'},
    {optText: 'Times New Roman', optVal: '"Times New Roman", serif'}
  ]);
  self.selectedFont = ko.observable('Arial');
  self.fontSize = ko.observable(15);
  self.bold = ko.observable(false);
  self.italic = ko.observable(false);

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
      if (i != 0)
        radii += ' ';
      if (bools[i] == true)
        radii += self.borderRadiusVal() + 'px';
      else
        radii += 0;
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

  //Text Shadow
  self.textShadow = ko.observable(true);
  self.textShadowVerticalAlign = ko.observable(0);
  self.textShadowHorizontalAlign = ko.observable(0);
  self.textShadowBlurRadius = ko.observable(0);
  self.textShadowColor = ko.observable('#ffffff');
  self.appliedTextShadow = ko.computed(function(){
      var textShadow = ''
      if (self.textShadow() == true) {
        textShadow += px(self.textShadowHorizontalAlign())
          + ' ' + px(self.textShadowVerticalAlign())
          + ' ' + px(self.textShadowBlurRadius())
          + ' ' + self.textShadowColor();
      } else {
        textShadow = 'none';
      }
      return textShadow;
  });

  self.btnStyle = ko.computed(function(){
    var fontWeight = 'normal';
    var fontStyle = 'normal';

    if (self.bold() == true)
      fontWeight = 'bold'
    if (self.italic() == true)
      fontStyle = 'italic'

    var style = {
      //hard coded
      textAlign: 'center',
      //Text
      textIndent: self.appliedHorizAlign(),
      lineHeight: px(self.height()),
      color: self.fontColor(),
      //Size
      width: px(self.width()),
      height: px(self.height()) ,
      //Font
      fontFamily: self.selectedFont(),
      fontSize: px(self.fontSize()),
      //Border
      borderWidth: self.borderWidth()+'px',
      borderStyle: "solid",
      borderRadius: self.borderRadii(),
      borderColor: self.borderColor(),
      backgroundColor: self.baseColor(),
      fontWeight: fontWeight,
      fontStyle: fontStyle
    };

    if (self.appliedBoxShadow() != 'none')
      style.boxShadow = self.appliedBoxShadow();

    if (self.appliedTextShadow() != 'none')
      style.textShadow = self.appliedTextShadow();

    return style;
  },this);

  self.btnCode = ko.computed(function(){
    var output = "." + self.className()  + "{";
    var rules = {
      width: "123px",
      height: 'asdf'
    };
    rules = self.btnStyle();
    $.each(rules, function(key, val){
      key = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      output += "\n\t" + key + ": " + val + ";";
    })
    for (i=1; i < 2; i++) {
    }
    output += "\n}";
    return output
  });
}

function hideFieldsonClick(){
  //box shadow
  $('#iBoxShadow').on('change',function(){
    var sliders = $('#boxShadow .param')
    var cbs = $(this).siblings('input')
    if (this.checked == false) {
      sliders.hide()
      cbs.attr("disabled", true);
    }
    else {
      cbs.removeAttr("disabled");
      sliders.show()
    }
  });
  $('#iTextShadow').on('change',function(){
    var sliders = $('#textShadow .param')
    if (this.checked == false) {
      sliders.hide()
    }
    else {
      sliders.show()
    }
  });
}

$(function(){
  hideFieldsonClick();
  $('input[type="range"]').on('input',function(){
    $(this).change()
  });
  ko.applyBindings(new buttonViewModel());
});
