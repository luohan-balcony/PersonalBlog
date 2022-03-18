var DButil = require("./DButil");

function insertComments(blog_id,parent,parent_name,user_name,comments,email,ctime,utime,success){
    var insertSql = "insert into comments (`blog_id`,`parent`,`parent_name`,`user_name`,`comments`,`email`,`ctime`,`utime`) values (?,?,?,?,?,?,?,?);"
    var params = [blog_id,parent,parent_name,user_name,comments,email,ctime,utime];
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

function queryLeaveComments(blog_id,success){
    var querySql = "select * from comments where blog_id=?"
    var params = [blog_id];
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


function queryCommentscountByBlogId(blog_id,success){
    var querySql = "select count(1) as count from comments where blog_id=?"
    var params = [blog_id];
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
function queryNewComments(size,success){
    var querySql = "select * from comments order by id desc limit ?"
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
module.exports.insertComments = insertComments;
module.exports.queryLeaveComments = queryLeaveComments;
module.exports.queryCommentscountByBlogId = queryCommentscountByBlogId;
module.exports.queryNewComments = queryNewComments;


