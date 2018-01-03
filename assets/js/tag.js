var params = location.search.substring(1).split("&")[0].split("=");
if (params[0] == "tag"){
    var tag = decodeURI(params[1]);
    if (tag !== "") {
        $("#post-list li").hide();
        $("#post-list li."+tag).show();
        $("h3.tag-name").text("記事一覧: "+tag);
    }
}