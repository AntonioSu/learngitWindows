/**
 * Created by Administrator on 2016/1/18.
 */
/***
 * jquery local chat
 * @version v2.0
 * @createDate -- 2012-5-28
 * @author hoojo
 * @email hoojo_@126.com
 * @requires jQuery v1.2.3 or later, send.message.editor-1.0.js
 * Copyright (c) 2012 M. hoo
 **/

(function ($) {
    var _im = $.WeIMsssad = {};//空对象


    var faceTimed, count = 0;//

    _im.defaultOptions = {

        sendMessageIFrame: function (receiverId) {
            return $("iframe[name='sendMessage" + receiverId + "']").get(0).contentWindow;
        },
        receiveMessageDoc: function (receiverId) {
            receiverId = receiverId || "";
            var docs = [];
            $.each($("iframe[name^='receiveMessage" + receiverId + "']"), function () {
                docs.push($(this.contentWindow.document));
            });
            return docs;
            //return $($("iframe[name^='receiveMessage" + receiverId + "']").get(0).contentWindow.document);
        },

        // 接收消息iframe样式
        receiveStyle: [
            '<html>',
            '<head><style type="text/css">',
            'body{border:10;margin:0;padding:3px;height:98%;cursor:text;background-color:white;font-size:12px;font-family:Courier,serif,monospace;}',
            '.msg{margin-left: 1em;}p{margin:0;padding:0;}.me{color: blue;}.you{color:green;}',
            '</style></head>',
            '<body></body>',
            '</html>'
        ].join(" "),
        writeReceiveStyle: function (receiverId) {
            this.receiveMessageDoc(receiverId)[0].get(0).write(this.receiveStyle);
        },

        /***
         * 发送消息的格式模板
         * flag = true 表示当前user是自己，否则就是对方
         **/
        receiveMessageTpl: function (userName, styleTpl, content, flag) {
            var userCls = flag ? "me" : "you";
            // 设置当前发送日前
            var date = new Date();
            var datetime = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
            datetime = " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            if (styleTpl && flag) {
                content = ["<span style='", styleTpl, "'>", content, "</span>"].join("");
            }
            return [
                '<p class="', userCls, '">', datetime, '  ', userName, ':</p>',
                '<p class="msg">', content, '</p>'
            ].join("");
        },

        /**工具类按钮触发事件返回html模板*/
        sendMessageStyle: {

            setStyle: function (style, val) {

            },
            getStyleTpl: function () {

            }
        },
        // 向接收消息iframe区域写消息
        writeReceiveMessage: function (receiverId, userName, content, flag) {
            if (content) {
                // 发送消息的样式
                var styleTpl = _im.defaultOptions.sendMessageStyle.getStyleTpl();
                var receiveMessageDoc = _im.defaultOptions.receiveMessageDoc(receiverId);
                $.each(receiveMessageDoc, function () {
                    var $body = this.find("body");
                    // 向接收信息区域写入发送的数据
                    //
                    $body.append(_im.defaultOptions.receiveMessageTpl(userName, styleTpl, content, flag));
                    // 滚动条滚到底部
                    this.scrollTop(this.height());
                });
            }
        },
        // 发送消息
        sendHandler: function ($chatMain) {
            var doc = $chatMain.find("iframe[name^='sendMessage']").get(0).contentWindow.document;

            var content = doc.body.innerHTML;
            //content = $.trim(content);//除去开始结束的空格
            // content = content.replace(new RegExp("<br>", "gm"), "");//除去中间的换行
            // 获取即将发送的内容
            if (content) {
                var sender = $chatMain.attr("sender");
                var receiverId = $chatMain.attr("id");
                // 接收区域写消息
                _im.defaultOptions.writeReceiveMessage(receiverId, sender, content, true);

                //############# XXX
                var receiver = $chatMain.find("#to").val();
                //var receiver = $chatMain.attr("receiver");
                // 判断是否是手机端会话，如果是就发送纯text，否则就发送html代码
                var flag = _im.defaultOptions.isMobileClient(receiver);
                if (flag) {
                    var text = $(doc.body).text();
                    text = $.trim(text);
                    if (text) {
                        // 远程发送消息
                        //remote.jsjac.chat.sendMessage(text, receiver);
                    }
                } else { // 非手机端通信 可以发送html代码
                    var styleTpl = _im.defaultOptions.sendMessageStyle.getStyleTpl();
                    content = ["<span style='", styleTpl, "'>", content, "</span>"].join("");
                    //remote.jsjac.chat.sendMessage(content, receiver);
                }

                // 清空发送区域
                $(doc).find("body").html("");
            }
        },

        chatLayoutTemplate: function (userJID, sender, receiver, product, flag) {
            var display = "";
            return [
                '<div class="chat-main" id="', userJID,
                '" sender="', sender, '" receiver="', receiver, '">',

                '<div id="chat"><div class="radius">',
                '<table>',
                '<iframe name="receiveMessage', userJID, '" frameborder="0" width="300px" height="300px"></iframe>',

                '<tr class="tool-bar">',
                '<td>',
                'one',
                '</td>',
                '</tr>',
                '<tr class="send-message">',
                '<td>',
                '<iframe name="sendMessage', userJID, '" width="300px" height="100px" frameborder="0"></iframe>',
                '</td>',
                '</tr>',

                '<tr class="bottom-bar">',
                '<td>',
                '<input type="button" value="关闭" id="close"/>&nbsp;',
                '<input type="button" value="发送(Enter)" id="send"/> ' ,
                '</td>',
                '</tr>',
                '</table></div>',
                '</div>',
                '</div>'
            ].join("");

        },

        initWebIM: function (userJID, receiver) {
            var product = {};
            var chatEl = $(_im.defaultOptions.chatLayoutTemplate(userJID, _im.defaultOptions.sender, receiver, product));
            $("body").append(chatEl);

            // 拖拽
            //$("#" + userJID).easydrag();
            // 初始化suwenyuan相关信息
            suwenyuan.iframe = this.sendMessageIFrame(userJID);
            suwenyuan.init(userJID);

            //this.setTitle(chatEl);
            this.writeReceiveStyle(userJID);

            // 工具类绑定事件 settings.toolBarHandler

            chatEl.find("#send").click(function () {
                var $chatMain = $(this).parents(".chat-main");
                _im.defaultOptions.sendHandler($chatMain);
                document.write(chatEl.find("#send").value);
            });

            chatEl.find("#close").click(function () {
                var $chatMain = $(this).parents(".chat-main");
                $chatMain.hide(500);
            });

            $(this.sendMessageIFrame(userJID).document).keyup(function (event) {
                var e = event || window.event;
                var keyCode = e.which || e.keyCode;
                if (keyCode == 13) {
                    var $chatMain = $("#" + $(this).find("body").attr("jid"));
                    _im.defaultOptions.sendHandler($chatMain);
                }
            });
        }

    };
    $.extend({
        WebIM_steve: function (opts) {
            opts = opts || {};
            // 覆盖默认配置
            // _im.defaultOptions = $.extend(_im.defaultOptions, _im.defaultOptions, opts);
            _im.defaultOptions = $.extend( _im.defaultOptions, opts);
            _im.defaultOptions.sender;
            // var settings = $.extend({}, _im.defaultOptions, opts);
            var settings = $.extend( _im.defaultOptions, opts);
            settings.initWebIM("su", settings.receiver);
        }
    });
})(jQuery);
