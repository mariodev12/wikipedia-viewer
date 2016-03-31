function showWikiresults(response){
  if(response){
    var res = response.query.pages;
    var html = '';
    $.each(res, function(i, v){
      html += "<div class='item result-"+i+"'>";
      html += "<a target='_blank' href='http://en.wikipedia.org/?curid="+v['pageid']+"'>"+v['title']+"</a>";
      html += "<p>"+v['extract']+"</p>";
      html += "</div>"
    })
    $(".wiki-results").html(html);
  }
};

function requestWikipedia(search){
  $.ajax( {
    url: "https://en.wikipedia.org/w/api.php?pilimit=max&exintro&explaintext&exsentences=1&exlimit=max",
    jsonp: "callback", 
    dataType: 'jsonp', 
    data: { 
        action: "query",  
        prop:"pageimages|extracts",
        generator:"search",
        rvprop:"content",
        format: "json",
        gsrsearch: search
    },
    xhrFields: { withCredentials: true },
    success: showWikiresults
  });
}
  $("#search-box").keypress(function(e){
    if(e.which == 13){
      var value = $("#search-box").val();
      $("#search-box").submit();
      requestWikipedia(value); 
    }
  });