var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader")
var app = new express;
app.use(express.static("./page/"));
app.post("/editEveryDay",loader.get("/editEveryDay"));
app.get("/queryEveryDay",loader.get("/queryEveryDay"));
app.post("/editBlog",loader.get("/editBlog"));
app.get("/queryBlogByPage",loader.get("/queryBlogByPage"));
app.get("/queryBlogCount",loader.get("/queryBlogCount"));
app.get("/queryBlogById",loader.get("/queryBlogById"));
app.post("/insertComments",loader.get("/insertComments"));
app.get("/getCommentsCode",loader.get("/getCommentsCode"));
app.get("/queryLeaveComments",loader.get("/queryLeaveComments"));
app.get("/queryCommentscountByBlogId",loader.get("/queryCommentscountByBlogId"));
app.get("/queryAllBlog",loader.get("/queryAllBlog"));
app.get("/queryAllTag",loader.get("/queryAllTag"));
app.get("/queryHotBlog",loader.get("/queryHotBlog"));
app.get("/queryNewComments",loader.get("/queryNewComments"));

app.get("/queryByTag",loader.get("/queryByTag"));

app.get("/queryByTagCount",loader.get("/queryByTagCount"));


app.listen(globalConfig.port,function(){
    console.log("服务器已启动!");
});