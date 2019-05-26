# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_26_171349) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "directors", force: :cascade do |t|
    t.string "name"
    t.integer "api_id"
  end

  create_table "directors_movies", force: :cascade do |t|
    t.bigint "director_id", null: false
    t.bigint "movie_id", null: false
    t.index ["director_id"], name: "index_directors_movies_on_director_id"
    t.index ["movie_id"], name: "index_directors_movies_on_movie_id"
  end

  create_table "movies", force: :cascade do |t|
    t.string "title"
    t.integer "year"
    t.boolean "is_owned"
    t.string "image_url"
    t.string "description"
    t.integer "movie_api_id"
  end

  create_table "movies_tags", force: :cascade do |t|
    t.bigint "movie_id", null: false
    t.bigint "tag_id", null: false
    t.index ["movie_id"], name: "index_movies_tags_on_movie_id"
    t.index ["tag_id"], name: "index_movies_tags_on_tag_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
  end

  add_foreign_key "movies_tags", "movies"
  add_foreign_key "movies_tags", "tags"
end
