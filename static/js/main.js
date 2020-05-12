


var obs = riot.observable()

obs.on('loaded', function (e) {
  setTimeout(function () {
    document.querySelector('.js-loading').classList.add('is-loaded')
  }, 10)
})

var topNavProps = {
  triggerY: 0
}

obs.on('scroll', function (scrollY) {
  // console.log(`ターゲット: ${topNavProps.triggerY}\nスクロール: ${scrollY}`)
  var isHidden
  if (topNavProps.triggerY <= scrollY) {
    isHidden = false
  } else {
    isHidden = true
  }
  obs.trigger('setGnavHidden', isHidden)
})

riot.mount('*');

function setupAnchorLink() {
  if (!feature.touch) {
    $('a[href~="#"], .js-anchor-scroll').on('click', function (e) {
      e.preventDefault()
      var headerHeight = 60
      var $target = $(e.currentTarget.attributes.href.value)
      console.log($target)
      var targetOffset = $target.offset().top
      $('html,body').animate({
          scrollTop: targetOffset - headerHeight - 10
        },
        300
      )
    })
  }
}

window.addEventListener('load', function (e) {
  AOS.init();
})

var router = new Navigo('/', false)

router.on('news/page/:page', function (params) {
  // console.log(`ページ番号は ${params.page}`)
  obs.trigger('setNewsPage', params.page)
})
.resolve()

//# sourceMappingURL=main.js.map