var siteMap = new Vue({
    el:"#site_map",
    data:{
        linkList:[{
            title:"",
            link:""
        }]
    },
    computed:{

    },
    created:function(){
        axios({
            method:"get",
            url:"/queryAllBlog"
        }).then((resp)=>{
            var result = [];
            var data = resp.data.data
            for(var i=0;i<data.length;i++){
                var temp = {};
                temp.title = data[i].title;
                temp.link = "/blog_detail.html?bid=" + data[i].id;
                result.push(temp);
            }
            siteMap.linkList = result;
        })
    }
})