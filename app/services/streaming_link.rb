class StreamingLink
  attr_reader :term
  BASE_URL = "https://www.justwatch.com"
  
  def initialize(term)
    @term = term
  end

  def generate
    search_string = term.downcase.split(" ").join("%20+")
    BASE_URL + "/us/search?q=#{search_string}"
  end
end
