const { size } = require("../loader");
var DButil = require("./DButil");

function insertBlog(title,content,views,tags,ctime,utime,success){
    var insertSql = "insert into blog (`title`,`content`,`views`,`tags`,`ctime`,`utime`) values (?,?,?,?,?,?)"   ;
    var params = [title,content,views,tags,ctime,utime];
    var connection = DButil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function(error,result){
        if(error == null){
            success(result)
        }else{
            console.log(error);
        }
    })
    connection.end()

}

function queryBlogByPage(page,pageSize,success){
    var insertSql = "select * from blog order by id desc limit ?,?;";
    var params = [page*pageSize,pageSize];
    var connection = DButil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error); 
        }
    })
    connection.end()

}

function queryBlogCount(success){
    var querySql = "select count(1) as count from blog";
    var params = [];
    var connection = DButil.createConnection();
    connection.connect();
    connection.query(querySql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error); 
        }
    })
    connection.end()

}

function queryBlogById(id,success){
    var querySql = "select * from blog where id = ?";
    var params = [id];
    var connection = DButil.createConnection();
    connection.connect();
    connection.query(querySql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error); 
        }
    })
    connection.end()

}

function queryAllBlog(success){
    var querySql = "select * from blog order by id desc";
    var params = [];
    var connection = DButil.createConnection();
    connection.connect();
    connection.query(querySql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error); 
        }
    })
    connection.end()

}


function updateViews(id,success){
    var querySql = "update blog set views = views + 1 where id = ?";
    var params = [id];
    var connection = DButil.createConnection();
    connection.connect();
    connection.query(querySql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error); 
        }
    })
    connection.end()

}

function queryHotBlog(size,success){
    var querySql = "select * from blog order by views desc limit ?;";
    var params = [size];
    var connection = DButil.createConnection();
    connection.connect();
    connection.query(querySql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error); 
        }
    })
    connection.end()

}
module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.updateViews = updateViews;
module.exports.queryHotBlog = queryHotBlog;





