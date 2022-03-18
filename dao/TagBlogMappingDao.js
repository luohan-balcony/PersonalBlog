var DButil = require("./DButil");

function insertTagBlogMapping(tag_id,blog_id,ctime,utime,success){
    var insertSql = "insert into tag_blog_mapping (`tag_id`,`blog_id`,`ctime`,`utime`) values (?,?,?,?)";
    var params = [tag_id,blog_id,ctime,utime];
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

function queryByTagId(tag_id,page,pageSize,success){
    var querySql = "select * from tag_blog_mapping where tag_id = ? limit ?,?";
    var params = [tag_id,page*pageSize,pageSize];
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


function queryByTagCount(tag_id,success){
    var querySql = "select count(1) as count from tag_blog_mapping where tag_id = ?";
    var params = [tag_id];
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
module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryByTagId = queryByTagId;
module.exports.queryByTagCount = queryByTagCount;

