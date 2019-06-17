ActiveAdmin.register Director do
  permit_params :name

  index do
    column :id
    column :name
    column :biography
    column "Image" do |director|
      link_to image_tag(director.image_url, height: 100), admin_director_path(director) if director.image_url
    end
    actions
  end
end
