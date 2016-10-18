// 阻止输出log
// wangEditor.config.printLog = false;

var editor = new wangEditor('editor-box');

// 上传图片
// editor.config.uploadImgUrl = '/upload';
editor.config.uploadParams = {
    // token1: 'abcde',
    // token2: '12345'
};
editor.config.uploadHeaders = {
    // 'Accept' : 'text/x-json'
}
// editor.config.uploadImgFileName = 'myFileName';

// 隐藏网络图片
// editor.config.hideLinkImg = true;

// 表情显示项
editor.config.emotionsShow = 'value';
editor.config.emotions = {
    'default': {
        title: '默认',
        data: './emotions.data'
    },
    'weibo': {
        title: '微博表情',
        data: [
            {
                icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7a/shenshou_thumb.gif',
                value: '[草泥马]'
            },
            {
                icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/60/horse2_thumb.gif',
                value: '[神马]'
            },
            {
                icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/fuyun_thumb.gif',
                value: '[浮云]'
            },
            {
                icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c9/geili_thumb.gif',
                value: '[给力]'
            },
            {
                icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f2/wg_thumb.gif',
                value: '[围观]'
            },
            {
                icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/70/vw_thumb.gif',
                value: '[威武]'
            }
        ]
    }
};

// 插入代码时的默认语言
// editor.config.codeDefaultLang = 'html'

// 只粘贴纯文本
// editor.config.pasteText = true;

// 跨域上传
// editor.config.uploadImgUrl = 'http://localhost:8012/upload';

// 第三方上传
// editor.config.customUpload = true;

// 普通菜单配置
// editor.config.menus = [
//     'img',
//     'insertcode',
//     'eraser',
//     'fullscreen'
// ];
// 只排除某几个菜单（兼容IE低版本，不支持ES5的浏览器），支持ES5的浏览器可直接用 [].map 方法
// editor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
//     if (item === 'insertcode') {
//         return null;
//     }
//     if (item === 'fullscreen') {
//         return null;
//     }
//     return item;
// });

// onchange 事件
// editor.onchange = function () {
//     console.log(this.$txt.html());
// };

// 取消过滤js
// editor.config.jsFilter = false;

// 取消粘贴过来
// editor.config.pasteFilter = false;

// 设置 z-index
// editor.config.zindex = 20000;

// 语言
// editor.config.lang = wangEditor.langs['en'];

// 自定义菜单UI
// editor.UI.menus.bold = {
//     normal: '<button style="font-size:20px; margin-top:5px;">B</button>',
//     selected: '.selected'
// };
// editor.UI.menus.italic = {
//     normal: '<button style="font-size:20px; margin-top:5px;">I</button>',
//     selected: '<button style="font-size:20px; margin-top:5px;"><i>I</i></button>'
// };
// 配置 onchange 事件
editor.onchange = function () {
    // 编辑区域内容变化时，实时打印出当前内容
    $("#blogContent").val(this.$txt.html())
};

editor.create();


$('.ui.checkbox')
    .checkbox()
;
$('.dropdown')
    .dropdown()
;
