var everyDay = new Vue({
    el: "#every_day",
    data: {
        content_english: "qwertyuio cvbn dfghjkl ertyuio dfghjk ghjkl",
        content_chinese: "每个重点都会伴随着另一个新的起点",
        content_edit: "------东野圭吾"
    },
    computed: {
        getContentEnglish: function () {
            return this.content_english;
        },
        getContentChinese: function () {
            return this.content_chinese;
        },
        getContentEdit: function () {
            return this.content_edit;
        }
    },
    created: function () {
        axios({
            method: "get",
            url: "/queryEveryDay",
        }).then(function (resp) {
            var response = resp.data.data[0].content.split(";");
            everyDay.content_english = response[0];
            everyDay.content_chinese = response[1];
            everyDay.content_edit = response[2];
        }).catch(function (err) {
            console.log("请求失败!")
        })
    }
});
var blogList = new Vue({
    el: "#blog_list",
    data: {
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        blog_list: []
    },
    computed: {
        jumpTo: function () {
            return function (clickNowPage) {
                this.getPage(clickNowPage, this.pageSize)
            }
        },
        getPage: function () {
            return function(page, pageSize) {
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1] : "";
                var tag = "";
                if(searchUrlParams != "") {
                   console.log(119);
                   if (searchUrlParams.split("=")[0] == "tags") {
                    console.log(123)
                    tag = searchUrlParams.split("=")[1];
                    console.log(tag)
                }
                    // for (var i = 0; i < searchUrlParams.length; i++) {
                    //     if (searchUrlParams[i].split("=")[0] == "tags") {
                    //         console.log(123)
                    //         tag = JSON.stringify(searchUrlParams[i].split("=")[1]);
                    //         console.log(tag)
                    //     }
                    // }
                    axios({
                        method: "get",
                        url: "/queryByTag?page=" + (page - 1) + "&pageSize=" + pageSize + "&tags=" + tag,
                    }).then((result) => {
                        console.log(result);
                        var list = [];
                        var content = result.data.data;
                        for (var i = 0; i < content.length; i++) {
                            var temp = {};
                            temp.title = content[i].title;
                            temp.content = content[i].content;
                            temp.views = content[i].views;
                            temp.tags = content[i].tags;
                            temp.date = content[i].ctime;
                            temp.id = content[i].id;
                            temp.link = "/blog_detail.html?bid=" + content[i].id;
                            list.push(temp);
                        }
                        blogList.blog_list = list;
                        blogList.page = page
                    }).catch((error) => {
                        console.log(error);
                        console.log("请求错误！");
                    })
                    axios({
                        method: "get",
                        url: "/queryByTagCount?tags=" + tag,
                    }).then((resp) => {
                        blogList.count = resp.data.data[0].count;
                        blogList.queryPageNumberList();
                    })
                }else{
                    console.log(456);
                    axios({
                        method: "get",
                        url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize,
                    }).then((result) => {
                        console.log(result)
                        var list = [];
                        var content = result.data.data;
                        for (var i = 0; i < content.length; i++) {
                            var temp = {};
                            temp.title = content[i].title;
                            temp.content = content[i].content;
                            temp.views = content[i].views;
                            temp.tags = content[i].tags;
                            temp.date = content[i].ctime;
                            temp.id = content[i].id;
                            temp.link = "/blog_detail.html?bid=" + content[i].id;
                            list.push(temp);
                        }
                        blogList.blog_list = list;
                        blogList.page = page

                    }).catch((error) => {
                        console.log(error);
                        console.log("请求错误！");
                    })
                    axios({
                        method: "get",
                        url: "/queryBlogCount",
                    }).then((resp) => {
                        blogList.count = resp.data.data[0].count;
                        blogList.queryPageNumberList();
                    })
                }

            }

        },
        queryPageNumberList: function(){
            return function () {
                var nowPage = this.page;
                var pageSize = this.pageSize;
                var countPage = this.count;
                var result = [];
                result.push({ text: "<<", nowPage: 0 })
                if (nowPage > 2) {
                    result.push({ text: nowPage - 2, nowPage: nowPage - 2 })
                }
                if (nowPage > 1) {
                    result.push({ text: nowPage - 1, nowPage: nowPage - 1 })
                }
                result.push({ text: nowPage, nowPage: nowPage })
                if ((nowPage + 1) <= (countPage + pageSize - 1) / pageSize) {
                    result.push({ text: nowPage + 1, nowPage: nowPage + 1 })
                }
                if ((nowPage + 2) <= (countPage + pageSize - 2) / pageSize) {
                    result.push({ text: nowPage + 2, nowPage: nowPage + 2 })
                }
                result.push({ text: ">>", nowPage: parseInt((countPage + pageSize - 1) / pageSize) })
                this.pageNumList = result;
            }
        }

    },
    created: function () {
        this.getPage(this.page, this.pageSize)
    }
});
