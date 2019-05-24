ActiveAdmin.register Tag do
  permit_params :name
  
  filter :name
end
