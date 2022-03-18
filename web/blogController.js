var BlogDao = require("../dao/BlogDao")
var TagDao = require("../dao/tagDao")
var TagBlogMappingDao = require("../dao/TagBlogMappingDao")
var timeUtil = require("../util/timeUtil")
var RespUtil = require("../util/RespUtil")
var url = require("url")
var path = new Map();


function editBlog(request,response){
    var params = url.parse(request.url,true).query;
    var tags = params.tags.replace(/ /g,"").replace("，",",");
    request.on("data",function(data){
            BlogDao.insertBlog(params.title,data.toString(),0,tags,timeUtil.getNow(),timeUtil.getNow(),function(result){
            response.writeHead(200);
            response.write(RespUtil.writeResult("success","请求成功",result));
            response.end()
            var blogId = result.insertId;
            var tagList = tags.split(",");
            for(var i = 0;i<tagList.length;i++){
                if(tagList[i] == ""){
                    continue
                }else{
                    queryTag(tagList[i],blogId)
                }
            }

        })
    })
}

path.set("/editBlog",editBlog);

function queryBlogByPage(request,response){
    var params = url.parse(request.url,true).query;
    console.log(parseInt(params.page),parseInt(params.pageSize))
    BlogDao.queryBlogByPage(parseInt(params.page),parseInt(params.pageSize),function(result){

        for(var i=0;i<result.length;i++){
            result[i].content = result[i].content.replace(/<img[\w\W]*">/,"");
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g,"");
            result[i].content = result[i].content.substring(0,200);
            var now = new Date(result[i].ctime *1000);
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate()
            result[i].ctime = year + "-" + month + "-" + day;
        }
        response.writeHead(200);
        response.write(RespUtil.writeResult("success","请求成功",result));
        response.end()
    })
}
path.set("/queryBlogByPage",queryBlogByPage);

function queryBlogCount(request,response){
    BlogDao.queryBlogCount(function(result){
        response.writeHead(200);
        response.write(RespUtil.writeResult("success","请求成功",result));
        response.end()
    })

}
path.set("/queryBlogCount",queryBlogCount);


function queryBlogById(request,response){
    var params = url.parse(request.url,true).query;
    BlogDao.queryBlogById(parseInt(params.bid),function(result){
        var now = new Date(result[0].ctime *1000);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate()
        result[0].ctime = year + "-" + month + "-" + day;
        response.writeHead(200);
        response.write(RespUtil.writeResult("success","请求成功",result));
        response.end()
        BlogDao.updateViews(parseInt(params.bid),function(){})
    })

}
path.set("/queryBlogById",queryBlogById);

function queryAllBlog(request,response){
    BlogDao.queryAllBlog(function(result){
        response.writeHead(200);
        response.write(RespUtil.writeResult("success","请求成功",result));
        response.end()
    })

}
path.set("/queryAllBlog",queryAllBlog);

function queryTag(tag,blogId){
    TagDao.queryTag(tag,function(result){
        if(result == null || result.length == 0){
            insertTag(tag,blogId)
        }else{
            TagBlogMappingDao.insertTagBlogMapping(result[0].id,blogId,timeUtil.getNow(),timeUtil.getNow(),function(result){})
        }

    })
}

function insertTag(tag,blogId){
    TagDao.insertTag(tag,timeUtil.getNow(),timeUtil.getNow(),function(result){
        insertTagBlogMapping(result.insertId,blogId)
    })
}

function insertTagBlogMapping(tagId,blogId){
    TagBlogMappingDao.insertTagBlogMapping(tagId,blogId,timeUtil.getNow(),timeUtil.getNow(),function(result){})
}
path.set("/queryTag",queryTag);

function queryHotBlog(request,response){
    BlogDao.queryHotBlog(5,function(result){
        response.writeHead(200);
        response.write(RespUtil.writeResult("success","请求成功",result));
        response.end()
    })
}

path.set("/queryHotBlog",queryHotBlog);
module.exports.path = path;