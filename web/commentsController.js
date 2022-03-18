var CommentsDao = require("../dao/CommentsDao")
var timeUtil = require("../util/timeUtil")
var RespUtil = require("../util/RespUtil")
var captcha = require("svg-captcha")
var url = require("url")
var path = new Map();

function insertComments(request, response) {
    var params = url.parse(request.url, true).query;
    CommentsDao.insertComments(parseInt(params.bid), parseInt(params.parent), params.parent_name, params.name, params.content, params.email, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(RespUtil.writeResult("success", "评论成功", null));
        response.end()
    })

}

function getCommentsCode(request, response) {
    var img = captcha.create({ fontSize: 50, width: 100, height: 34 });
    response.writeHead(200);
    response.write(RespUtil.writeResult("success", "评论成功", img));
    response.end()
}

function queryLeaveComments(request, response) {
    var params = url.parse(request.url, true).query;
    CommentsDao.queryLeaveComments(params.bid, function (result) {
        response.writeHead(200);
        response.write(RespUtil.writeResult("success", "评论成功", result));
        response.end()
    })
}

function queryCommentscountByBlogId(request, response) {
    var params = url.parse(request.url, true).query;
    CommentsDao.queryCommentscountByBlogId(params.bid, function (result) {
        response.writeHead(200);
        response.write(RespUtil.writeResult("success", "评论成功", result));
        response.end()
    })
}
function queryNewComments(request, response) {
    CommentsDao.queryNewComments(4, function (result) {
        for (var i = 0; i < result.length; i++) {
            var now = new Date(result[i].ctime * 1000);
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate()
            result[i].ctime = year + "-" + month + "-" + day;
        }
        response.writeHead(200);
        response.write(RespUtil.writeResult("success", "评论成功", result));
        response.end()
    })
}
path.set("/queryNewComments", queryNewComments);
path.set("/getCommentsCode", getCommentsCode);
path.set("/insertComments", insertComments);
path.set("/queryLeaveComments", queryLeaveComments);
path.set("/queryCommentscountByBlogId", queryCommentscountByBlogId);

module.exports.path = path;