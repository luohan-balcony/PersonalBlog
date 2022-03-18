var comments = new Vue({
    el:"#comment_detail",
    data:{
        code:"",
        codeRight:""
    },
    computed:{
        changeCode:function(){
            return function(){
                   axios({
                method:"get",
                url:"/getCommentsCode"
            }).then((resp)=>{
                comments.code = resp.data.data.data;
                comments.codeRight = resp.data.data.text;
            }) 
            }
        },
        submitComments:function(){
            return function(){
                var codeInput = document.getElementById("comment_code").value;
            if(codeInput != this.codeRight){
                alert("验证码有误！");
                return;
            }
        var bid = -1;
        var reply = document.getElementById("comment_reply").value;
        var replyName = document.getElementById("comment_reply_name").value;
        var name = document.getElementById("comment_username").value;
        var email = document.getElementById("comment_email").value;
        var content = document.getElementById("comment_content").value;

        axios({
            method:"post",
            url:"/insertComments?bid="+bid+"&name="+name+"&email="+email+"&content="+content+"&parent="+reply+"&parent_name="+replyName,
        }).then((resp)=>{
            alert(resp.data.msg)
        })
        }
            }
            
    },
    created:function(){
        this.changeCode();
    }
})

var leaveMessage = new Vue({
    el:"#leave_Message",
    data:{
        count:"214",
        comments:[{
            blog_id:"11",
            user_name:"hertha",
            ctime:"20181128",
            comments:"牛骨汤粉广泛认同广东发货件骨干会",
            parent: -1,
            parent_name: "0",
            utime: 1647403550,
            email: "9873248239@qq.com"
        }]
    },
    computed:{
        reply:function(){
            return function(commentId,user_name){
                console.log(commentId,user_name)
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = user_name;
                location.href = "#comment_detail";
            }
        }
    },
    created:function(){
       
        var bid = -1;
        axios({
            method:"get",
            url:"/queryLeaveComments?bid="+bid,
        }).then((resp)=>{
            leaveMessage.comments = resp.data.data;
            for(var i=0;i<leaveMessage.comments.length;i++){
                if(leaveMessage.comments[i].parent > -1){
                    leaveMessage.comments[i].options = "回复@" + leaveMessage.comments[i].parent_name;
                }
            }
        })
        axios({
            method:"get",
            url:"/queryCommentsCountByBlogId?bid="+bid,
        }).then((resp)=>{
            leaveMessage.count = resp.data.data[0].count;
        })
    }
})