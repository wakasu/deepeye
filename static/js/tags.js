riot.tag2('app-footer', '<div class="c-footer-outer-2"> <div class="c-footer-outer"> <div class="c-footer-outer__bg"></div> <div class="c-footer"> <div class="c-footer__content"> <img src="/img/logo-3.svg" alt="コンピュータマインド ロゴ" class="c-footer__logo"> <div class="o-container c-footer-container"> <a href="#page-top" class="c-footer-page-top-link"> <img src="/img/go-top.svg" alt="Back to top"> </a> <div class="c-footer-nav"> <div each="{item in navList}" class="c-footer-nav__item"> <a href="{item.link}" class="c-footer-nav__link">{item.title}</a> <a each="{item in item.child}" href="{item.link}" class="c-footer-nav__link c-footer-nav__link--child">{item.title}</a> </div> </div> </div> </div> </div> </div> <div class="c-footer-bottom"> <div class="o-container"> <div class="o-flex"> <div> <div class="c-footer-bottom__nav"> <a each="{item in navList2}" href="{item.link}" class="c-footer-bottom__nav-list">{item.title}</a> </div> </div> <div class="o-fit o-width-fill"> <p class="c-footer-copyright">株式会社コンピュータマインド © {year} Computermind Corp.</p> </div> </div> </div> </div> </div>', '', '', function(opts) {
    var tag = this

    tag.year = new Date().getFullYear()

    tag.navList = [{
      title: '会社情報',
      link: '/about',
      child: [{
        title: '代表メッセージ',
        link: '/about/#message',
      }, {
        title: '会社概要',
        link: '/about/#summary'
      }, {
        title: '沿革',
        link: '/about/#history'
      }]
    }, {
      title: '事業内容',
      link: '/service',
      child: [{
        title: '企業理念',
        link: '/service/#philosophy'
      }, {
        title: '基本方針',
        link: '/service/#base'
      }, {
        title: '企業ビジョン',
        link: '/service/#vision'
      }, {
        title: '開発事例',
        link: '/service/#case'
      }]
    }, {
      title: '先端技術',
      link: '/technology',
      child: [{
        title: '技術ラインナップ',
        link: '/technology/#lineup',
      }]
    },{
      title: '製品情報',
      link: '/product'
    },{
      title: 'オフィス紹介',
      link: '/office',
      child: [{
        title: '本社',
        link: '/office/#yamanashi'
      }, {
        title: '東京本社',
        link: '/office/#tokyo'
      }, {
        title: '甲府テクニカルセンター',
        link: '/office/#kofu'
      }, {
        title: '沖縄事業所',
        link: '/office/#okinawa'
      }]
    }, {
      title: 'ニュース',
      link: '/news'
    }, {
      title: '採用情報',
      link: '/recruit',
      child: [{
        title: 'はじめに',
        link: '/recruit/#greeting'
      },{
        title: '募集要項',
        link: '/recruit/#requirement'
      },{
        title: '勤務場所',
        link: '/recruit/#locations'
      },{
        title: '勤務内容',
        link: '/recruit/#conditions'
      },{
        title: '福利厚生',
        link: '/recruit/#benefits'
      },{
        title: '採用までの流れ',
        link: '/recruit/#process'
      },{
        title: '弊社で働く',
        link: '/recruit/#interview'
      },{
        title: 'エントリー',
        link: '/recruit/#entry'
      }]
    }, {
      title: 'お問い合わせ',
      link: '/contact'
    }, {
      title: '関連会社',
      link: '',
      child: [{
        title: 'PATIC TRUST',
        link: 'https://patic-trust.com/'
      }]
    }]

    tag.navList2 = [{
      title: 'お問い合わせ',
      link: '/contact'
    }, {
      title: '情報セキュリティ方針',
      link: '/isms'
    }, {
      title: '派遣事業',
      link: '/files/hakenjigyo.pdf'
    }, {
      title: 'プライバシーポリシー',
      link: '/privacy'
    }]

    tag.on('mount', function (e) {
      obs.trigger('mountedFooter')
    })
});
riot.tag2('event-list', '<section> <h2 class="h-heading c-heading--line">展示会実績</h2> <table each="{item, i in list}" class="c-table c-table--news"> <tbody> <tr> <th colspan="2" class="heading">{item.event_year}</th> </tr> <tr each="{event, i2 in item.event_single}"> <th>{event.event_when}</th> <td><raw-html content="{event.event_info}"></raw-html></td> </tr> </tbody> </table> </section>', '', '', function(opts) {
    var tag = this

    axios.get('/wp-json/wp/v2/pages?slug=news').then(function(response){
      // console.log(response)
      tag.list = response.data[0].event_all
      // console.log(tag.list)
      tag.update()
    })
});
riot.tag2('facebook-timeline', '<div id="fb-root"></div> <div class="fb-page" data-href="https://www.facebook.com/&#x682a;&#x5f0f;&#x4f1a;&#x793e;&#x30b3;&#x30f3;&#x30d4;&#x30e5;&#x30fc;&#x30bf;&#x30de;&#x30a4;&#x30f3;&#x30c9;-172717792790151/" data-tabs="timeline" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true" data-height="{height}"> <blockquote cite="https://www.facebook.com/&#x682a;&#x5f0f;&#x4f1a;&#x793e;&#x30b3;&#x30f3;&#x30d4;&#x30e5;&#x30fc;&#x30bf;&#x30de;&#x30a4;&#x30f3;&#x30c9;-172717792790151/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/&#x682a;&#x5f0f;&#x4f1a;&#x793e;&#x30b3;&#x30f3;&#x30d4;&#x30e5;&#x30fc;&#x30bf;&#x30de;&#x30a4;&#x30f3;&#x30c9;-172717792790151/">株式会社コンピュータマインド</a></blockquote> </div>', '', '', function(opts) {
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s);
      js.id = id;
      js.src =
        'https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v3.2&appId=711872362528541&autoLogAppEvents=1';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    var tag = this

    tag.height = Math.ceil(window.innerHeight * .85)
});
riot.tag2('feature-box', '<section class="c-feature-box" riot-style="background-image: url({opts.photo});"> <div class="c-feature-box__icon" riot-style="background-image: url({opts.icon});"></div> <div class="c-feature-box__heading-block"> <h2 class="c-heading c-feature-box__heading">{opts.heading}</h2> <p class="c-heading-sub c-feature-box__heading-sub">{opts.sub}</p> </div> <div class="c-text c-feature-box__desc"> <yield from="desc"></yield> </div> </section>', 'feature-box { display: flex; width: 100%; }', '', function(opts) {
    var tag = this
});
riot.tag2('global-nav', '<div class="c-global-nav-background" aria-hidden="{isOpened ? \'false\' : \'true\'}" onclick="{close}"></div> <div class="c-global-header {c-global-header--fixed: mode == \'fixed\'}" aria-hidden="{hidden}"> <div class="o-container c-global-header__container"> <div class="o-flex o-flex--fill c-global-header-layout"> <div class="o-width-fixed c-global-logo-block"> <a href="/"> <img src="/img/logo-2.svg" alt="Computermind Inc." class="c-global-header__logo"> </a> </div> <div class="o-width-fill c-global-nav-block"> <div class="c-global-nav-toggler {c-global-nav-toggler--opened: isOpened}" onclick="{toggle}"></div> <div class="o-flex c-global-nav {c-global-nav--opened: isOpened}"> <a each="{navList}" href="{link}" class="c-global-nav__item" aria-selected="{currentState(slug)}">{title}</a> </div> </div> </div> </div> </div>', '', '', function(opts) {
    var tag = this

    tag.mode = opts.mode ? opts.mode : ''
    tag.hidden = opts.hidden ? opts.hidden : 'true'
    tag.isOpened = false
    tag.current = opts.current ? opts.current : ''

    tag.navList = [{
      title: '会社情報',
      slug: 'about',
      link: '/about'
    },{
      title: '事業内容',
      slug: 'service',
      link: '/service'
    },{
      title: '先端技術',
      slug: 'technology',
      link: '/technology'
    },{
      title: '製品情報',
      slug: 'product',
      link: '/product'
    },{
      title: 'オフィス紹介',
      slug: 'office',
      link: '/office'
    },{
      title: 'ニュース',
      slug: 'news',
      link: '/news'
    },{
      title: '採用情報',
      slug: 'recruit',
      link: '/recruit'
    },{
      title: 'お問い合わせ',
      slug: 'contact',
      link: '/contact'
    }]

    tag.currentState = function (s) {
      return (s == tag.current) ? 'true' : 'false'
    }

    if(tag.mode == 'top'){
      window.addEventListener('scroll', function (e) {
        obs.trigger('scroll', pageYOffset)
      })
    }

    tag.close = function (e) {
      tag.isOpened = false
    }

    tag.toggle = function (e) {
      if(tag.isOpened){
        tag.close()
      }else{
        tag.isOpened = true
      }
    }

    obs.on('setGnavHidden', function (isHidden) {
      tag.hidden = String(isHidden)
      tag.update()
    })
});
riot.tag2('header-visual', '<div class="c-header-visual c-header-visual--{name}"> <section class="c-header-visual__content"> <div class="o-container"> <div class="c-header-visual__heading"> <h2 class="c-heading c-header-visual__heading-text">{data[opts.name].title}</h2> <p class="c-heading-sub c-header-visual__heading-sub">{data[opts.name].sub}</p> </div> </div> </section> </div>', '', '', function(opts) {
    var tag = this

    tag.name = opts.name ? opts.name : ''

    tag.data = {
      technology: {
        title: '先端技術',
        sub: 'Advanced Technology'
      },
      service: {
        title: '事業内容',
        sub: 'Business'
      },
      about: {
        title: '会社情報',
        sub: 'Company'
      },
      office: {
        title: 'オフィス紹介',
        sub: 'Offices'
      },
      product: {
        title: '製品情報',
        sub: 'Product'
      },
      news: {
        title: 'ニュース',
        sub: 'news'
      },
      recruit: {
        title: '採用情報',
        sub: 'recruit'
      },
      contact: {
        title: 'お問い合わせ',
        sub: 'Contact'
      }
    }
});
riot.tag2('load-check', '<yield from="content"></yield>', '', '', function(opts) {
    var tag = this

    tag.on('mount', function (e) {
      obs.trigger('loaded')
    })
});
riot.tag2('logo-motion', '<div class="o-screen"></div>', '', '', function(opts) {
    var tag = this
});
riot.tag2('news-list', '<div if="{categories}" class="c-news-list"> <div each="{data, i in list}" if="{newsFilter(i)}" class="c-news-list__item {is-new: checkNew(data.date)}"> <div class="c-news-list__date">{formatHoursString(data.date)}</div> <div class="c-news-list__label"> <div class="c-label">{getCategoryNameById(data.categories[0])}</div> </div> <div class="c-news-list__title"> <a if="{data.news_link !== \'\'}" href="{data.news_link}" class="c-news-list__heading">{data.title.rendered}</a> <span if="{data.news_link === \'\'}" class="c-news-list__heading">{data.title.rendered}</span> <div if="{data.content.rendered}"> <raw-html content="{data.content.rendered}"></raw-html> </div> </div> </div> </div> <pagenation-nav if="{mode != \'top\'}" total="{totalPages}" current="{page}"></pagenation-nav>', '', '', function(opts) {
    var tag = this

    tag.mode = opts.mode ? opts.mode : ''
    tag.page = 1
    tag.totalPages = 1

    var fetchCategoriesApi = function () {
      axios.get('/wp-json/wp/v2/categories').then(function(response){
        // console.log(response)
        tag.categories = response.data
        fetchPostsApi(tag.page)
      })
    }

    var fetchPostsApi = function (page) {
      axios.get(("/wp-json/wp/v2/posts?page=" + (tag.page))).then(function(response){
        // console.log(response)
        tag.list = response.data
        tag.totalPages = response.headers['x-wp-totalpages']
        // console.log('totalPages = ' + tag.totalPages)
        tag.update()
      })
    }

    obs.on('setNewsPage', function (e) {
      tag.page = e
      fetchPostsApi(tag.page)
    })

    fetchCategoriesApi()

    moment.locale('ja')
    tag.now = moment()

    /**
     * 与えられた日付けが、現時点から指定日数以内の日付けかどうかをチェック
     * @param {string} date - 日付け
     */
    tag.checkNew = function (date) {
      dateHyphen = date.replace(/\./g, '/')
      dateMoment = moment(dateHyphen)
      diff = moment.duration(tag.now.diff(dateMoment))
      if (diff.as('day') <= 30) {
        return true
      } else {
        return false
      }
    }

    tag.formatHoursString = function (date) {
      var str = date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)[0]
      str = moment(str).format('L')
      return str
    }

    tag.getCategoryNameById = function (id) {
      var cat = tag.categories.filter(function(item, index){
        if(item.id === id) { return true }
      })
      return cat[0].name
    }

    /**
     * @param {string} i - ニュース項目の順番
     */
    tag.newsFilter = function (i) {
      if (tag.mode == 'top' && i > 3) {
        return false
      } else {
        return true
      }
    }
});

riot.tag2('pagenation-nav', '<ul class="c-pagenation-list"> <li each="{item, i in list}" class="c-pagenation-list__item"> <span if="{item == opts.current}" class="c-pagenation-item c-pagenation-item--current">{item}</span> <a if="{item != opts.current}" href="#news" class="c-pagenation-item" onclick="{click}">{item}</a> </li> </ul>', '', '', function(opts) {
    var tag = this

    tag.list = []

    tag.on('update', function (e) {
      tag.list = []
      for(var i = 0; i < tag.opts.total; i++){
        tag.list.push(i+1)
      }
      // console.log(tag.list)
    })

    tag.click = function (e) {
      router.navigate('/news/page/' + e.item.item, true)
    }

});
riot.tag2('raw-html', '<span></span>', '', '', function(opts) {
    this.root.innerHTML = opts.content
    this.on('update', function() {
      this.root.innerHTML = opts.content
    })
});
riot.tag2('recruit-interview-last', '<div class="o-container"> <div class="c-recruit-interview-entry" data-aos="zoom-out"> <p> <a class="c-button" href="https://job.mynavi.jp/20/pc/search/corp104086/outline.html">新卒エントリー（マイナビ）</a> </p> <p> <a class="c-button" href="/contact">中途エントリー（お問い合わせ）</a> </p> </div> <p class="o-separate"> <a href="/recruit/interview" class="c-link c-has-icon"> <img src="/img/arrow-left.svg" alt="" class="c-has-icon__icon"> 一覧に戻る </a> </p> </div>', '', '', function(opts) {
});
riot.tag2('recruit-nav', '<div class="c-2nd-nav"> <div each="{list}"> <a href="{link}" class="c-2nd-nav__link" aria-selected="{checkCurrent(slug)}">{title}</a> </div> </div>', '', '', function(opts) {
    var tag = this

    tag.list = [
      {
        title: 'はじめに',
        slug: 'greeting',
        link: '/recruit#greeting'
      },{
        title: '募集要項',
        slug: 'requirement',
        link: '/recruit#requirement'
      },{
        title: '勤務場所',
        slug: 'locations',
        link: '/recruit#locations'
      },{
        title: '勤務内容',
        slug: 'conditions',
        link: '/recruit#conditions'
      },{
        title: '福利厚生',
        slug: 'benefits',
        link: '/recruit#benefits'
      },{
        title: '採用までの流れ',
        slug: 'process',
        link: '/recruit#process'
      },{
        title: '弊社で働く',
        slug: 'interview',
        link: '/recruit/interview'
      },{
        title: 'エントリー',
        slug: 'entry',
        link: '/recruit/#entry'
      }
    ]

    tag.current = opts.current ? opts.current : ''

    tag.checkCurrent = function (slug) {
      if(slug == tag.current){
        return 'true'
      }else{
        return 'false'
      }
    }
});
riot.tag2('top-hero', '<div class="c-top-hero" ref="me"> <video autoplay muted loop id="hero-video" class="c-top-hero-video"> <source src="video/hero-bg.webm" type="video/webm"> <source src="video/hero-bg.mp4" type="video/mp4"> </video> <div class="c-top-hero-overlay"></div> <img src="img/logo-1.svg" class="c-top-hero-logo" alt="コンピュータマインドロゴ"> <div class="c-top-hero-slogan"> <span class="js-top-hero-text">Beyond Imagination</span> <div class="c-top-hero-slogan__sub js-top-hero-text">想像のその先へ</div> </div> <div class="o-container c-top-hero-nav-container"> <div class="c-top-hero-nav"> <a each="{navList}" href="{link}" class="c-top-hero-nav__item">{name}</a> </div> </div> <img src="img/arrow-down.svg" alt="" class="c-top-hero-scroll-sign"> </div>', 'top-hero .js-top-hero-text .letter { display: inline-block; }', '', function(opts) {
    var tag = this

    tag.navList = [{
      name: '会社情報',
      link: '/about'
    }, {
      name: '事業内容',
      link: '/service'
    }, {
      name: '先端技術',
      link: '/technology'
    }, {
      name: '製品情報',
      link: '/product'
    }, {
      name: 'オフィス紹介',
      link: '/office'
    }, {
      name: 'ニュース',
      link: '/news'
    }, {
      name: '採用情報',
      link: '/recruit'
    }, {
      name: 'お問い合わせ',
      link: '/contact'
    }]

    tag.on('mount', function () {

      $('.js-top-hero-text').each(function () {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
      });

      anime.timeline({
          loop: false
        })
        .add({
          targets: '.js-top-hero-text .letter',
          translateX: [50, 0],
          translateZ: 0,
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 1200,
          delay: function (el, i) {
            return 1500 + 40 * i;
          }
        })
    })

    window.addEventListener('load', function () {
      setHeight()
    })

    window.addEventListener('resize', function () {
      setHeight()
    })

    function setHeight() {
      topNavProps.triggerY = tag.refs.me.clientHeight
      obs.trigger('scroll', pageYOffset)
    }
});
riot.tag2('top-news', '<div class="c-section c-section--top-news"> <div class="c-section__content"> <section class="o-container"> <h2 class="c-heading c-heading--center">ニュース</h2> <p class="c-heading-sub c-heading-sub--center">NEWS</p> <news-list mode="top"></news-list> <div class="c-section-more-link" data-aos="zoom-out"> <a class="c-button" href="/news">詳細を見る</a> </div> </section> </div> </div>', '', '', function(opts) {
    var tag = this
});
riot.tag2('top-section-2', '<a class="c-top-section c-top-section--bg-clip c-top-section--skew c-top-section--bg-clip--{opts.name} c-top-section--small" href="{opts.link}"> <div class="c-top-section--bg-clip__bg"> <div class="c-top-section--bg-clip__photo"> <div class="o-container c-top-section--small__photo"> <img riot-src="img/{opts.name}-photo.png" alt=""> </div> </div> </div> <div class="o-container c-top-section__skew-content"> <div class="o-flex o-flex--fill-equal"> <div class="c-top-section--small-title"> <h2 class="c-heading">{opts.title}</h2> <p class="c-heading-sub">{opts.sub}</p> </div> </div> </div> </a>', '', '', function(opts) {
    var tag = this
});
riot.tag2('top-section', '<virtual if="{opts.content == \'service\'}"> <div class="c-top-section c-top-section--skew c-top-section--{opts.content}"> <div class="c-top-section__skew-content"> <section class="o-container o-fit"> <h2 class="c-heading">事業内容</h2> <p class="c-heading-sub">Business Info</p> <div class="c-top-section__photo"> <img src="img/service-photo.png" alt=""> </div> <section> <h2 class="c-heading">システムを通じてもっと豊かな社会を</h2> <div class="c-text"> <p>電子機器に欠かせない半導体の検査装置や電子顕微鏡、自動車のカーナビに代表される制御系システムや、多くの金融システムに関わりながら培ってきた金融業務知識と弊社の技術を融合させた金融制御系、Webアプリケーション、iOS／Androidアプリケーションなど多岐に渡るシステム開発を展開しています。</p> </div> </section> <div class="c-section-more-link" data-aos="zoom-out"> <a class="c-button" href="/service">詳細を見る</a> </div> </section> </div> </div> </virtual> <virtual if="{opts.content != \'service\'}"> <div class="c-top-section--skew c-top-section c-top-section--{opts.content}"> <section class="o-container o-fit c-top-section__skew-content"> <h2 class="c-heading"> <yield from="title"></yield> </h2> <p class="c-heading-sub"> <yield from="sub"></yield> </p> <div class="c-top-section__photo"> <yield from="photo"></yield> </div> <section> <h2 class="c-heading"> <yield from="title-2"></yield> </h2> <div class="c-text"> <yield from="text"></yield> </div> </section> <div class="c-section-more-link" data-aos="zoom-out"> <a href="{link}" class="c-button">詳細を見る</a> </div> </section> </div> </virtual>', '', '', function(opts) {
    var tag = this

    tag.link = opts.link ? opts.link : ''
});