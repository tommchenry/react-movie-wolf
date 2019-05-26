ActiveAdmin.register Movie do
  config.create_another = true
  permit_params :title, 
                :year, 
                :is_owned,
                :image_url,
                :description,
                :movie_api_id,
                tag_ids: []

  index do |movie|
      column :title
      column :year
      column "Director" do |movie|
        movie.directors
      end
      column "Image" do |movie|
        link_to image_tag(movie.image_url, height: 100), admin_movie_path(movie)
      end
      column :is_owned
      column "Tags" do |movie|
        movie.tags
      end
      actions
  end

  form do |f| 
    f.inputs 'Required' do
      f.input :title, required: true, hint: "Please enter a title"
      f.input :year, required: true, hint: "Please enter the year of release (e.g. 2000)"
      f.input :is_owned, label: "in our collection"
    end

    f.inputs 'API Generated' do
      f.input :image_url, :hint => f.object.image_url.present? \
            ? image_tag(f.object.image_url, height: 200)
            : content_tag(:span, "No cover yet")
      f.input :description
      f.input :movie_api_id
    end

    f.inputs 'Tags' do
      f.input :tag_ids, as: :check_boxes, collection: Tag.order(:name).all
    end

    f.actions
  end
end
