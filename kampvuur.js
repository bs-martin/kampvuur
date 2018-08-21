(function () {
    var comments = document.querySelectorAll("article.chat-line .chat-line__body")

    var sourceLang = 'nl'
    var targetLang = 'en'
    var re = /TRANSLATED_TEXT='(.*?)'/i

    function fetch_text(url) {
        return fetch(url).then((response) => (response.text()))
    }

    var commentBubbleOnClick = function (e) {
        let comment = e.target
        var txt = comment.innerText
        var url = "http://translate.google.com/?hl=en&sl=nl&tl=en&text=" + encodeURIComponent(txt)

        fetch_text(url).then((html) => {
            var translation = html.match(re)[1].replace("\\x26", "&")
            console.log(translation)
            let translationPanel = document.createElement("div")
            translationPanel.className = "translation_panel"
            translationPanel.style.cssText = "margin-top: 0.5em; margin-left: 1em; border-left: padding-left: 10px; border-left: 2px solid #GGG;" 
            translationPanel.innerHTML = translation
            comment.parentElement.appendChild(translationPanel)
            // To prevent double encoding...
            comment.removeEventListener("click", commentBubbleOnClick)
            comment.style.cursor = ""
        }).catch((error) => {
            console.warn(error)
        })

        e.preventDefault()
    }

    comments.forEach(function (comment) {
        comment.style.cursor = "pointer"
        comment.addEventListener("click", commentBubbleOnClick)
    })
})()

