var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: []
    },
    computed: {
        randomColor: function () {
            return function () {
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return "rgb(" + red + "," + green + "," + blue + ")";
            }
        },
        randomSize: function () {
            return function () {
                 return Math.random() * 14 + 12 + 'px';
            }
        },
    },
    created:function(){
        axios({
            method:"get",
            url:"/queryAllTag",
        }).then((resp)=>{
            var dataTags = resp.data.data
            var result = []
            for(var i=0;i<dataTags.length;i++){
                result.push({text:dataTags[i].tag,link:"/?tags="+dataTags[i].tag});
            }
            randomTags.tags = result;
        })
    }
})
var hotWord = new Vue({
    el: "#hot_words",
    data: {
        hotwordsList: [{
            title:"",
            link:""
        }]
    },
    computed:{
        
    },
    created:function(){
        axios({
            method:"get",
            url:"/queryHotBlog",
        }).then((resp)=>{
            var result = [];
            var dataContent = resp.data.data
            for(var i=0;i<dataContent.length;i++){
                var temp = {};
                temp.title = dataContent[i].title;
                temp.link = "/blog_detail.html?bid=" + dataContent[i].id;
                result.push(temp);
            }
            hotWord.hotwordsList = result;
        })
    }

});
var newComment = new Vue({
    el: "#new_comments",
    data: {
        newComment: [{
            userName: "这是用户名",
            time: "这里是时间",
            newContent: "抱歉由于种种原因，暂时无法显示",
        },
        ]
    },
    computed:{

    },
    created:function(){
        axios({
            method:"get",
            url:"/queryNewComments",
        }).then((resp)=>{
            var dataContent = resp.data.data;
            var result = [];
            for(var i=0;i<dataContent.length;i++){
                var temp = {};
                temp.userName = dataContent[i].user_name;
                temp.time = dataContent[i].ctime;
                temp.newContent = dataContent[i].comments;
                result.push(temp)
            }
            newComment.newComment = result;
        })
    }
})