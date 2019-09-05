document.addEventListener('DOMContentLoaded', function () {
    let mod = modal();
    mod.show()
        .setTitle("Привет")
        .showTop()
        .hideTop()
        .showTop()
        .setTitle('Привет, привет!')
        .injectBottom("<ul><li>1</li><li>2</li><li>3</li></ul>")
        .injectBottom('text')
        .injectBottom('<h2>Заголовок</h2>')
        .showBottom()
        .hide()
        .show()
        .injectContent('<h1>hkjlkj</h1>')
        .injectContent(
            document.createDocumentFragment('div')
                .appendChild(document.createTextNode("ntcn")
                ))
    ;

});