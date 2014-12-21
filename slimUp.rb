require 'slim'

template = Slim::Template.new("buttonpress.slim")

File.open "buttonpress.html", "w" do |file|
      file.write template.render()
end
