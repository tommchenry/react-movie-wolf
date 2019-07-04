class WishlistLink
  attr_reader :term

  BASE_URL = "https://www.amazon.com/"
  
  def initialize(term)
    @term = term
  end

  def generate
    search_string = term.downcase.split(" ").join("+")
    BASE_URL + "s?k=#{search_string}&i=movies-tv&ref=nb_sb_noss"
  end
end
