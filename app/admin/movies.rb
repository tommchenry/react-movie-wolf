ActiveAdmin.register Movie do
  permit_params :title, :year, :is_owned
end
