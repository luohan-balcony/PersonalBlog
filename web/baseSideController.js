var TagDao = require("../dao/tagDao")
var BlogDao = require("../dao/BlogDao")
var TagBlogMappingDao = require("../dao/TagBlogMappingDao")
var RespUtil = require("../util/RespUtil")
var url = require("url")
var path = new Map();

function queryAllTag(request,response){
    TagDao.queryAllTag(function(result){
        result.sort(function(){
            return Math.random() > 0.5 ? true : false
        })
        response.writeHead(200);
        response.write(RespUtil.writeResult("success","请求成功",result));
        response.end()
    })
}

path.set("/queryAllTag",queryAllTag);

function queryByTag(request,response){
    var params = url.parse(request.url,true).query;
    TagDao.queryTag(params.tags,function(result){
        console.log("第一步查询的tagid返回")
        console.log(result)
        console.log(result[0].id);
        // if(result == null || result.length == 0){
        //     response.writeHead(200);
        //     response.write(RespUtil.writeResult("success","请求成功",result));
        //     response.end()
        // }else{
            TagBlogMappingDao.queryByTagId(result[0].id,parseInt(params.page),parseInt(params.pageSize),function(result){
                console.log("第二步查询的blogid返回")
                console.log(result);
                var blogList = [];
                for(var i=0;i<result.length;i++){
                    BlogDao.queryBlogById(result[i].blog_id,function(result){
                        console.log("第三步查询的blogid返回")
                        console.log(result);
                        blogList.push(result);
                        console.log(blogList.length,result.length)
                    if(blogList.length == result.length){
                        getResult(blogList,response);
                    }
                    })  
                }
                    
        })
        }
        
    )
}

function getResult(blogList,response){
    // if(blogList.length < len){
    //     setTimeout(function(){
    //         getResult(blogList,len)
    //     },10);
    // }else{
        console.log("============")
        console.log(blogList);
        for(var i=0;i<blogList[0].length;i++){
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/,"");
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/g,"");
            blogList[i].content = blogList[i].content.substring(0,200);
        }
        response.writeHead(200);
        response.write(RespUtil.writeResult("success","请求成功",blogList[0]));
        response.end()
    }
// }
path.set("/queryByTag",queryByTag);

function queryByTagCount(request,response){
    var params = url.parse(request.url,true).query;
    TagDao.queryTag(params.tags,function(result){
        TagBlogMappingDao.queryByTagCount(result.id,function(result){
        response.writeHead(200);
        response.write(RespUtil.writeResult("success","请求成功",result));
        response.end()
    })
    })
}
path.set("/queryByTagCount",queryByTagCount);

module.exports.path = path;