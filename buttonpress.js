function buttonViewModel() {
  self = this;

  var defaults = {
    text:         'Text',
    className:    'classname',
    selectedFont: 'Arial',
    fontSize:     15,
    bold:         false,
    italic:       false,
    width:        100,
    height:       20,
    horizAlign:   0,
    fontColor:    '#000000',
    baseColor:    '#cccccc',
    borderColor:  '#999999',
    gradientColor:'#cccccc',
    boxShadowColor:  '#666666',
    textShadowColor: '#ffffff',
    borderWidth:  1,
    borderRadiusVal: 6,
    borderRadiusBool: true,
    boxShadow: true,
    boxShadowInset: true,
    boxShadowVerticalAlign: 0,
    boxShadowHorizontalAlign: 0,
    boxShadowBlurRadius: 0,
    boxShadowSpreadRadius: 0,
    textShadow: true,
    textShadowVerticalAlign: 0,
    textShadowHorizontalAlign: 0,
    textShadowBlurRadius: 0,
    textShadowSpreadRadius: 0,
  }

  var corners = ['TL','TR','BL','BR'];

  function px(val){
    if (val != 0)
      val = val + 'px'
    return val;
  }

  function parseId(str){
    return str.charAt(1).toLowerCase() + str.slice(2)
  }

  self.revert = function(t,e){
    var target = parseId(e.target.id);
    t[target](defaults[target]);
  }

  //observable
  for(var key in defaults){
    if (key.indexOf('Bool') > -1) {
      $.each(corners, function(i,corner){
        boolKey = key.replace('Bool',corners[i])
        self[boolKey] = ko.observable(defaults[key]);
      })
    }
    else
      self[key] = ko.observable(defaults[key])
  }

  self.fonts = ko.observableArray([
    {optText: 'Arial', optVal: 'Arial, Helvetica, sans-serif'},
    {optText: 'Courier', optVal: '"Courier New", Courier, monospace'},
    {optText: 'Georgia', optVal: 'Georgia, serif'},
    {optText: 'Times New Roman',
        optVal: '"Times New Roman", Times, serif'}
  ]);

  //computed
  self.appliedHorizAlign = ko.computed(function(){
    return px(self.width() * self.horizAlign() / 100);
  })

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
      borderStyle: "solid",

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
      borderWidth: px(self.borderWidth()),
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
    var rules = self.btnStyle();
    $.each(rules, function(key, val){
      key = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      output += "\n\t" + key + ": " + val + ";";
    })
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
  ko.applyBindings(new buttonViewModel);
});
