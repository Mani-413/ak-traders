/* AK TRADERS — header & footer partials */
(function(){
  "use strict";

  var LEAF_MARK = '<svg viewBox="0 0 44 44" class="brand-mark" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="22" cy="22" r="21" fill="#2E7D32"/>' +
    '<path d="M13 29C13 18 22 13 31 13C31 22 26 29 17 29C15.5 29 14 28.7 13 29Z" fill="#C9A227"/>' +
    '<path d="M13 29C17 25 21 21 27 16" stroke="#123317" stroke-width="1.4" stroke-linecap="round"/>' +
    '</svg>';

  var NAV_ITEMS = [
    ["index.html","Home","nav.home"],
    ["about.html","About","nav.about"],
    ["products.html","Products","nav.products"],
    ["procurement.html","Sourcing","nav.sourcing"],
    ["distribution.html","Distribution","nav.distribution"],
    ["turnover.html","Growth","nav.growth"],
    ["roadmap.html","Roadmap","nav.roadmap"],
    ["contact.html","Contact","nav.contact"]
  ];

  function headerHTML(active){
    var links = NAV_ITEMS.map(function(item){
      var cls = item[0] === active ? ' class="active"' : '';
      var absUrl = 'https://ak-traders-roan.vercel.app/' + item[0];
      return '<a href="'+absUrl+'" data-i18n="'+item[2]+'"'+cls+'>'+item[1]+'</a>';
    }).join("");
    return (
    '<div class="loader"><svg class="loader-mark" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="22" cy="22" r="21" fill="#FAF7EE"/>' +
      '<path d="M13 29C13 18 22 13 31 13C31 22 26 29 17 29C15.5 29 14 28.7 13 29Z" fill="#C9A227"/>' +
    '</svg></div>' +
    '<header class="site-header">' +
      '<nav class="nav">' +
        '<a href="index.html" class="brand">' + LEAF_MARK +
          '<span class="brand-text">AK TRADERS<span data-i18n="brand.tagline">Growing Together</span></span>' +
        '</a>' +
        '<div class="nav-links">' + links + '</div>' +
        '<div style="display:flex;align-items:center;gap:12px;">' +
          '<div class="lang-switcher" aria-label="Language selector">' +
            '<button type="button" class="lang-btn" data-lang="en">EN</button>' +
            '<button type="button" class="lang-btn" data-lang="ta">தமிழ்</button>' +
          '</div>' +
          '<button class="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 12.6A9 9 0 1 1 11.4 3a7 7 0 0 0 9.6 9.6Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '</button>' +
          '<a href="contact.html" class="nav-cta" data-i18n="header.contact_cta">Get In Touch</a>' +
          '<button class="nav-toggle" aria-label="Menu"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</nav>' +
    '</header>'
    );
  }

  function footerHTML(){
    return (
    '<footer class="site-footer">' +
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<a href="index.html" class="brand">' + LEAF_MARK +
              '<span class="brand-text" style="color:#FAF7EE">AK TRADERS<span data-i18n="brand.tagline">Growing Together</span></span>' +
            '</a>' +
            '<p data-i18n="brand.description">Bridging Tamil Nadu\'s vegetable demand with India\'s finest producing states, since April 2025.</p>' +
            '<div class="social-row">' +
              '<a href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.6V3.3C15.9 3.2 14.9 3 13.7 3 11.2 3 9.5 4.5 9.5 7.4v2.4H7v3.2h2.5V21h4Z"/></svg></a>' +
              '<a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg></a>' +
              '<a href="#" aria-label="WhatsApp"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm0 1.8a7.2 7.2 0 1 1-3.9 13.3l-.3-.2-2.7.7.7-2.6-.2-.3A7.2 7.2 0 0 1 12 4.8Zm-2.4 3.4c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.8 2.1.8 2.5.7 3 .6.4-.1 1.3-.5 1.5-1 .2-.5.2-1 .1-1.1-.1-.1-.3-.2-.6-.3-.3-.2-1.5-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.6.9-.8 1-.1.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4Z"/></svg></a>' +
            '</div>' +
          '</div>' +
          '<div><h4 data-i18n="footer.quick_links">Quick Links</h4><ul>' +
            '<li><a href="index.html" data-i18n="footer.home">Home</a></li>' +
            '<li><a href="about.html" data-i18n="footer.about">About Us</a></li>' +
            '<li><a href="products.html" data-i18n="footer.products">Products</a></li>' +
            '<li><a href="roadmap.html" data-i18n="footer.roadmap">Roadmap</a></li>' +
            '<li><a href="contact.html" data-i18n="footer.contact">Contact</a></li>' +
          '</ul></div>' +
          '<div><h4 data-i18n="footer.services">Services</h4><ul>' +
            '<li><a href="distribution.html" data-i18n="footer.supply">Direct Daily Supply</a></li>' +
            '<li><a href="distribution.html" data-i18n="footer.hotel">Hotel &amp; Restaurant Supply</a></li>' +
            '<li><a href="distribution.html" data-i18n="footer.wholesale">Wholesale Market Supply</a></li>' +
            '<li><a href="distribution.html" data-i18n="footer.retail">Retail Supply</a></li>' +
          '</ul></div>' +
          '<div><h4 data-i18n="footer.address">Address</h4><ul>' +
            '<li>Mother Branch<br/>Veeraganur – 631116</li>' +
            '<li style="margin-top:10px;">Branch Office<br/>Perambalur – 621212</li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span data-i18n="footer.copy">© <span id="ak-year"></span> AK Traders. All rights reserved.</span>' +
          '<span data-i18n="footer.designed">Designed for AK Traders — Growing Together</span>' +
        '</div>' +
      '</div>' +
    '</footer>' +
    '<a class="float-whatsapp" href="https://wa.me/910000000000" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' +
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm0 1.8a7.2 7.2 0 1 1-3.9 13.3l-.3-.2-2.7.7.7-2.6-.2-.3A7.2 7.2 0 0 1 12 4.8Zm-2.4 3.4c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.8 2.1.8 2.5.7 3 .6.4-.1 1.3-.5 1.5-1 .2-.5.2-1 .1-1.1-.1-.1-.3-.2-.6-.3-.3-.2-1.5-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.6.9-.8 1-.1.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4Z"/></svg>' +
    '</a>'
    );
  }

  function pageTransitionHTML(){
    return '<div class="page-transition-overlay" aria-hidden="true"></div>';
  }

  function attachTransitionLinks(overlay){
    var links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="mailto:"]):not([href^="tel:"])');
    links.forEach(function(link){
      var href = link.getAttribute('href');
      if(!href || href.startsWith('#') || href.startsWith('javascript:')) return;
      var url;
      try { url = new URL(href, location.href); } catch (e) { return; }
      if(url.origin !== location.origin) return;
      if(url.pathname === location.pathname && url.hash) return;
      link.addEventListener('click', function(event){
        if(event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || link.download || link.target) return;
        event.preventDefault();
        overlay.classList.remove('exit');
        overlay.classList.add('active');
        setTimeout(function(){ location.href = url.href; }, 420);
      });
    });
  }

  function mountPageTransition(){
    if(document.querySelector('.page-transition-overlay')) return;
    document.body.insertAdjacentHTML('afterbegin', pageTransitionHTML());
    var overlay = document.querySelector('.page-transition-overlay');
    if(!overlay) return;
    requestAnimationFrame(function(){
      overlay.classList.add('active');
      setTimeout(function(){ overlay.classList.add('exit'); }, 120);
    });
    attachTransitionLinks(overlay);
  }

  window.AK = {
    mountHeader: function(active){
      document.body.insertAdjacentHTML("afterbegin", headerHTML(active));
      mountPageTransition();
      window.dispatchEvent(new CustomEvent('akHeaderMounted'));
    },
    mountFooter: function(){
      document.body.insertAdjacentHTML("beforeend", footerHTML());
      var y = document.getElementById("ak-year");
      if(y) y.textContent = new Date().getFullYear();
      window.dispatchEvent(new CustomEvent('akFooterMounted'));
    }
  };
})();
