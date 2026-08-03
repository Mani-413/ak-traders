/* AK TRADERS — shared site behaviour */
(function(){
  "use strict";

  window.AK_API_BASE = window.AK_API_BASE || "/api";

  document.addEventListener("DOMContentLoaded", function(){
    initLoader();
    initNav();
    initReveal();
    initFAQ();
    initDarkMode();
    initContactForm();
    initNewsletter();
    initLanguage();
    initActiveLink();
    initCounters();
  });
  window.addEventListener('akHeaderMounted', function(){ initLanguage(); initActiveLink(); });
  window.addEventListener('akFooterMounted', initLanguage);

  function initLoader(){
    var loader = document.querySelector(".loader");
    if(!loader) return;
    window.addEventListener("load", function(){
      setTimeout(function(){ loader.classList.add("hide"); }, 250);
    });
  }

  function initNav(){
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if(!toggle || !links) return;
    toggle.addEventListener("click", function(){
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){ links.classList.remove("open"); });
    });
  }

  function initActiveLink(){
    var path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(function(a){
      var href = a.getAttribute("href");
      if(href === path){ a.classList.add("active"); }
    });
  }

  function initReveal(){
    var els = document.querySelectorAll(".reveal");
    if(!els.length) return;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15});
    els.forEach(function(el){ io.observe(el); });
  }

  function initFAQ(){
    document.querySelectorAll(".faq-item").forEach(function(item){
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      if(!q || !a) return;
      q.addEventListener("click", function(){
        var isOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item.open").forEach(function(o){
          o.classList.remove("open");
          o.querySelector(".faq-a").style.maxHeight = null;
        });
        if(!isOpen){
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });
  }

  function initDarkMode(){
    var toggle = document.querySelector(".theme-toggle");
    if(!toggle) return;
    var saved = null;
    try{ saved = window.__akTheme || null; }catch(e){}
    if(saved === "dark"){ document.body.classList.add("dark"); }
    toggle.addEventListener("click", function(){
      document.body.classList.toggle("dark");
      window.__akTheme = document.body.classList.contains("dark") ? "dark" : "light";
    });
  }

  var TRANSLATIONS = {
    en: {
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.products': 'Products',
      'nav.sourcing': 'Sourcing',
      'nav.distribution': 'Distribution',
      'nav.growth': 'Growth',
      'nav.roadmap': 'Roadmap',
      'nav.contact': 'Contact',
      'header.contact_cta': 'Get In Touch',
      'brand.tagline': 'Growing Together',
      'footer.quick_links': 'Quick Links',
      'footer.services': 'Services',
      'footer.address': 'Address',
      'footer.copy': '© {year} AK Traders. All rights reserved.',
      'footer.designed': 'Designed for AK Traders — Growing Together',
      'footer.home': 'Home',
      'footer.about': 'About Us',
      'footer.products': 'Products',
      'footer.roadmap': 'Roadmap',
      'footer.contact': 'Contact',
      'footer.supply': 'Direct Daily Supply',
      'footer.hotel': 'Hotel & Restaurant Supply',
      'footer.wholesale': 'Wholesale Market Supply',
      'footer.retail': 'Retail Supply',
      'contact.call': 'Call Us',
      'contact.whatsapp': 'WhatsApp',
      'contact.email': 'Email',
      'contact.name': 'Full Name',
      'contact.phone': 'Phone Number',
      'contact.email_address': 'Email Address',
      'contact.message': 'Message',
      'contact.send': 'Send Message',
      'contact.thanks': 'Thank you! Your message has been received. Our team will contact you shortly.',
      'contact.fail': 'Could not reach the server. Please call us directly or try again shortly.',
      'contact.validation': 'Please fill in your name, phone and message.',
      'newsletter.stay': 'Stay close to the harvest',
      'newsletter.text': 'Seasonal price updates and new-route announcements, straight to your inbox.',
      'newsletter.subscribed': 'Subscribed — welcome to the AK Traders circle.',
      'search.placeholder': 'Search products — e.g. onion, ginger…',
      'newsletter.email_placeholder': 'Enter your email',
      'newsletter.subscribe': 'Subscribe',
      'no_results': 'No products match your search.',
      'brand.description': 'Bridging Tamil Nadu\'s vegetable demand with India\'s finest producing states, since April 2025.',
      'skip.to.content': 'Skip to content',
      'about.branch.mother': 'Mother Branch',
      'about.branch.office': 'Branch Office',
      'procurement.state.andhra': 'Andhra Pradesh',
      'procurement.state.karnataka': 'Karnataka',
      'procurement.state.madhya': 'Madhya Pradesh',
      'procurement.state.tamilnadu': 'Tamil Nadu',
      'procurement.state.kerala': 'Kerala',
      'procurement.tag.onions': 'Onions',
      'procurement.tag.tomatoes': 'Tomatoes',
      'procurement.tag.chillies': 'Chillies',
      'procurement.tag.garlic': 'Garlic',
      'procurement.tag.potatoes': 'Potatoes',
      'procurement.tag.local': 'Local Produce',
      'procurement.tag.ginger': 'Ginger',
      'procurement.tag.spices': 'Spices',
      'distribution.card.1.title': 'Direct Daily Supply',
      'distribution.card.1.desc': 'Door-to-door delivery using three-wheelers, reaching households and shops along fixed daily routes in Veeraganur and Perambalur.',
      'distribution.card.2.title': 'Hotel & Restaurant Supply',
      'distribution.card.2.desc': 'Scheduled bulk vegetable supply for hotel and restaurant kitchens, sized and timed around their service hours.',
      'distribution.card.3.title': 'Wholesale Market Supply',
      'distribution.card.3.desc': 'Large-volume delivery into local vegetable wholesale markets, keeping traders stocked ahead of peak trading hours.',
      'distribution.card.4.title': 'Retail Supply',
      'distribution.card.4.desc': 'Consistent retail-shop supply into high-demand neighbourhood areas, matched to local buying patterns.',
      'roadmap.hero.eyebrow': 'Future Roadmap',
      'roadmap.hero.title': 'Where AK Traders<br>is headed next.',
      'roadmap.hero.lead': 'Three stages of growth — from direct cultivation to international trade to agriculture retail stores across Tamil Nadu.',
      'roadmap.stage.1': 'Stage One',
      'roadmap.stage.1.title': 'Own Agricultural Manufacturing',
      'roadmap.stage.1.desc': 'Move upstream into direct cultivation and production, reducing dependence on external procurement and improving quality control from the ground up.',
      'roadmap.stage.2': 'Stage Two',
      'roadmap.stage.2.title': 'Import & Export',
      'roadmap.stage.2.desc': 'Expand beyond domestic trade into international import and export, connecting Tamil Nadu\'s demand and India\'s produce to global markets.',
      'roadmap.stage.3': 'Stage Three',
      'roadmap.stage.3.title': 'Agriculture Retail MART',
      'roadmap.stage.3.desc': 'Open dedicated agriculture retail stores across Tamil Nadu, bringing AK Traders\' direct-sourced produce straight to everyday consumers.',
      'turnover.goal.eyebrow': 'Ultimate goal',
      'turnover.goal.title': 'Crossing into national-scale distribution',
      'turnover.goal.revenue': '₹2 Crore Revenue',
      'index.hero.eyebrow': 'Est. 14 April 2025 · Veeraganur, Tamil Nadu',
      'index.hero.title': 'AK TRADERS<br><em>Growing Together.</em>',
      'index.hero.lead': 'We bridge India\'s high-yield farmlands with Tamil Nadu\'s growing demand — sourcing fresh vegetables directly from producers and delivering them efficiently, every single day.',
      'index.hero.about_cta': 'About Us',
      'index.hero.products_cta': 'Our Products',
      'index.hero.contact_cta': 'Contact Us',
      'index.hero.quote_text': 'Thirukkural 619 — Effort, however wearying to the body, always yields its reward.',
      'index.stats.eyebrow': 'By the numbers',
      'index.stats.title': 'A young company, moving fast',
      'index.choice.eyebrow': 'Why AK Traders',
      'index.choice.title': 'Built on trust, run on freshness',
      'index.choice.body': 'Every crate we move carries our name — so we treat quality, speed and fairness as non-negotiable.',
      'index.card.fresh.title': 'Fresh Quality Products',
      'index.card.fresh.body': 'Produce moves from farm to buyer within days, graded and handled to stay market-fresh.',
      'index.card.trusted.title': 'Trusted Supplier',
      'index.card.trusted.body': 'A social-welfare mission behind every deal — consistent supply Tamil Nadu can rely on.',
      'index.card.direct.title': 'Direct Procurement',
      'index.card.direct.body': 'We buy straight from producing states — no unnecessary middlemen, no quality guesswork.',
      'index.card.prices.title': 'Competitive Prices',
      'index.card.prices.body': 'Cutting out excess handling keeps costs down — and passes real savings to our buyers.',
      'index.card.fast.title': 'Fast Distribution',
      'index.card.fast.body': 'Door-to-door delivery and same-day dispatch keep vegetables moving without delay.',
      'index.card.service.title': 'Professional Service',
      'index.card.service.body': 'A dedicated executive team manages sourcing, field relationships and buyer communication.',
      'index.mission.eyebrow': 'Our mission',
      'index.mission.title': 'Ensuring Tamil Nadu never runs short',
      'index.mission.body': 'As farming activity declines while demand keeps rising, AK Traders was built to close that gap — sourcing quality vegetables directly from producers in high-yield states and delivering them efficiently to where they\'re needed most.',
      'index.mission.cta': 'Read Our Story',
      'index.testimonials.eyebrow': 'What buyers say',
      'index.testimonials.title': 'Relationships, not just transactions',
      'index.testimonials.quote1': '"AK Traders never delays a delivery — our restaurant kitchen has never run short of onions or tomatoes."',
      'index.testimonials.who1.name': 'Hotel Manager',
      'index.testimonials.who1.place': 'Perambalur',
      'index.testimonials.quote2': '"Direct-from-farm pricing and honest grading. Exactly what a wholesale buyer needs."',
      'index.testimonials.who2.name': 'Wholesale Trader',
      'index.testimonials.who2.place': 'Veeraganur',
      'index.testimonials.quote3': '"Their three-wheeler delivery reaches our shop before the morning rush every single time."',
      'index.testimonials.who3.name': 'Retail Shop Owner',
      'index.testimonials.who3.place': 'Perambalur',
      'about.company.title': 'Who we are',
      'about.company.lead': 'AK Traders is an agricultural produce procurement and distribution company based in Veeraganur, Tamil Nadu. We source vegetables directly from farmers in high-yield producing states and move them efficiently into high-demand consumption areas — from wholesale markets to hotel kitchens to neighbourhood retail shops.',
      'about.company.body': 'Since our founding on 14 April 2025 under Mr. Prabakaran Kowsalya, we have grown from a single mother branch into a two-location operation, with a dedicated executive team handling sourcing, field relationships and day-to-day distribution.',
      'about.mission.eyebrow': 'Our mission',
      'about.mission.title': 'Why we exist',
      'about.mission.body': 'AK Traders was established with a strong social welfare objective — to ensure Tamil Nadu has continuous access to essential agricultural produce. As farming activity continues to decline while demand keeps rising, AK Traders bridges that gap: sourcing quality vegetables directly from producers and delivering them efficiently to where people need them.',
      'about.leadership.eyebrow': 'Leadership',
      'about.leadership.title': 'The people behind AK Traders',
      'about.faq.eyebrow': 'Frequently asked',
      'about.faq.title': 'Common questions',
      'about.faq.q1': 'How does AK Traders source its produce?',
      'about.faq.a1': 'We procure directly from farmers and local markets in Andhra Pradesh, Karnataka, Madhya Pradesh, Tamil Nadu and Kerala, cutting out unnecessary middlemen.',
      'about.faq.q2': 'Who can buy from AK Traders?',
      'about.faq.a2': 'Hotels, restaurants, wholesale markets, retail shops, and households across our delivery routes in Veeraganur and Perambalur.',
      'about.faq.q3': 'How fresh is the produce on delivery?',
      'about.faq.a3': 'Produce typically reaches buyers within a few days of harvest, thanks to direct daily supply routes and fast dispatch.',
      'about.faq.q4': 'Does AK Traders offer bulk supply?',
      'about.faq.a4': 'Yes — we run dedicated bulk supply for hotels, restaurants and wholesale markets alongside our retail routes.',
      'contact.hero.eyebrow': 'Contact Us',
      'contact.hero.title': 'Let\'s talk<br>about supply.',
      'contact.hero.lead': 'Whether you\'re a hotel, a wholesale market, or a household — reach out and we\'ll route you to the right channel.',
      'contact.branches.mother': 'Mother Branch',
      'contact.branches.office': 'Branch Office',
      'contact.branches.location': 'Tamil Nadu, India',
      'contact.form.heading': 'Send a message',
      'contact.form.subheading': 'We\'ll get back to you shortly',
      'contact.form.name': 'Full Name',
      'contact.form.phone': 'Phone Number',
      'contact.form.email': 'Email Address',
      'contact.form.message': 'Message',
      'contact.sending': 'Sending…',
      'products.hero.eyebrow': 'Our Products',
      'products.hero.title': 'Five staples,<br>sourced without compromise.',
      'products.hero.lead': 'Every crate is graded before it leaves the sourcing state — so what arrives at your door is what we promised.',
      'products.card.fresh': 'Fresh Quality',
      'products.card.available': 'Available',
      'products.card.bulk': 'Bulk & Retail',
      'products.card.seasonal': 'Seasonal',
      'products.card.seasonal_label': 'Seasonal',
      'products.item.onion.title': 'Onion',
      'products.item.onion.desc': 'Firm, well-cured bulbs sourced from Andhra Pradesh, Karnataka and Madhya Pradesh for consistent size and shelf life.',
      'products.item.potato.title': 'Potato',
      'products.item.potato.desc': 'Clean, uniform-grade potatoes procured from Madhya Pradesh\'s high-yield belt, ideal for kitchens and markets alike.',
      'products.item.tomato.title': 'Tomato',
      'products.item.tomato.desc': 'Vine-ripened tomatoes from Andhra Pradesh and Karnataka, moved fast to preserve colour, firmness and flavour.',
      'products.item.garlic.title': 'Garlic',
      'products.item.garlic.desc': 'Aromatic, tight-skinned garlic sourced from Karnataka and Madhya Pradesh, graded for size and moisture content.',
      'products.item.ginger.title': 'Ginger',
      'products.item.ginger.desc': 'Fibre-light, high-oil ginger sourced from Kerala\'s spice belt, delivered fresh for both retail and food-service use.',
      'products.item.local.title': 'Local Tamil Nadu Produce',
      'products.item.local.desc': 'Seasonal greens and vegetables sourced locally within Tamil Nadu to shorten supply routes even further.',
      'procurement.hero.eyebrow': 'Procurement Network',
      'procurement.hero.title': 'Five states,<br>one direct supply line.',
      'procurement.hero.lead': 'We buy where each crop grows best — then move it straight to Tamil Nadu, without unnecessary stops.',
      'distribution.hero.eyebrow': 'Distribution',
      'distribution.hero.title': 'Four routes,<br>one promise of freshness.',
      'distribution.hero.lead': 'From door-to-door three-wheeler delivery to bulk hotel supply — we move produce the way each buyer needs it.',
      'turnover.hero.eyebrow': 'Growth Targets',
      'turnover.hero.title': 'From ₹42 Lakhs<br>toward ₹2 Crore.',
      'turnover.hero.lead': 'A steady, year-on-year revenue plan — built on wider procurement and deeper distribution reach.',
    },
    ta: {
      'nav.home': 'முகப்பு',
      'nav.about': 'எங்களை பற்றி',
      'nav.products': 'தயாரிப்புகள்',
      'nav.sourcing': 'வழங்குதல்',
      'nav.distribution': 'பெருமுழக்கம்',
      'nav.growth': 'வளர்ச்சி',
      'nav.roadmap': 'டைபிளான்',
      'nav.contact': 'தொடர்பு',
      'header.contact_cta': 'தொடர்பு கொள்ளுங்கள்',
      'brand.tagline': 'ஒற்றுமையாக வளர்ச்சி',
      'footer.quick_links': 'விரைவான இணைப்புகள்',
      'footer.services': 'சேவைகள்',
      'footer.address': 'முகவரி',
      'footer.copy': '© {year} AK டிரேடர்ஸ். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
      'footer.designed': 'AK டிரேடர்ஸ் க்காக வடிவமைக்கப்பட்டது — ஒன்றிணைந்து வளர்போம்.',
      'footer.home': 'முகப்பு',
      'footer.about': 'எங்களை பற்றி',
      'footer.products': 'தயாரிப்புகள்',
      'footer.roadmap': 'டைபிளான்',
      'footer.contact': 'தொடர்பு',
      'footer.supply': 'பெரிய அளவிலான வழங்கல்',
      'footer.hotel': 'ஹோட்டல் மற்றும் உணவக வழங்கல்',
      'footer.wholesale': 'மொத்த சந்தை வழங்கல்',
      'footer.retail': 'சில்லறை வழங்கல்',
      'contact.call': 'அழைக்கவும்',
      'contact.whatsapp': 'வாட்ஸ்அப்',
      'contact.email': 'மின்னஞ்சல்',
      'contact.name': 'முழு பெயர்',
      'contact.phone': 'தொலைபேசி எண்',
      'contact.email_address': 'மின்னஞ்சல் முகவரி',
      'contact.message': 'செய்தி',
      'contact.send': 'செய்தியை அனுப்பு',
      'contact.thanks': 'நன்றி! உங்கள் செய்தி பெறப்பட்டுள்ளது. எங்கள் குழுவினர் விரைவில் தொடர்பு கொள்வார்கள்.',
      'contact.fail': 'சேவையை அணுக முடியவில்லை. நேரடியாக அழைக்கவும் அல்லது பின்னர் முயற்சிக்கவும்.',
      'newsletter.stay': 'வருவாயை நெருங்கியதாக வைத்திருங்கள்',
      'newsletter.text': 'பசுமை நிலைப்பாடு மற்றும் புதிய பாதை அறிவிப்புகள், உங்கள் இடுகையிலேயே.',
      'newsletter.subscribed': 'சப்ஸ்கிரைப் செய்துவிட்டீர்கள் — AK டிரேடர்ஸ் வரவேற்கிறது.',
      'search.placeholder': 'தயாரிப்புகளை தேடவும் — உதாரணமாக வெங்காயம், இஞ்சி…',
      'no_results': 'உங்கள் தேடலுக்கு பொருந்தும் தயாரிப்புகள் இல்லை.',
      'newsletter.email_placeholder': 'உங்கள் மின்னஞ்சலை உள்ளிடவும்',
      'newsletter.subscribe': 'சப்ஸ்கிரைப் செய்யவும்',
      'brand.description': 'அப்ரில் 2025 முதல் தமிழ்நாட்டின் காய்கறி தேவையை இந்தியாவின் சிறந்த உற்பத்தி மாநிலங்களுடன் இணைக்கும்.',
      'skip.to.content': 'உள்ளடக்கத்திற்கு தாவு',
      'about.branch.mother': 'தாய் கிளை',
      'about.branch.office': 'கிளை அலுவலகம்',
      'procurement.state.andhra': 'ஆந்திரா பிரதேசம்',
      'procurement.state.karnataka': 'கர்நாடகா',
      'procurement.state.madhya': 'மத்திய பிரதேசம்',
      'procurement.state.tamilnadu': 'தமிழ் நாடு',
      'procurement.state.kerala': 'கேரளம்',
      'procurement.tag.onions': 'வெங்காயம்',
      'procurement.tag.tomatoes': 'தக்காளி',
      'procurement.tag.chillies': 'மிளகாய்',
      'procurement.tag.garlic': 'வேள்ளு',
      'procurement.tag.potatoes': 'உருளைக்கிழங்கு',
      'procurement.tag.local': 'உள்ளூர் விளைச்சல்',
      'procurement.tag.ginger': 'இஞ்சி',
      'procurement.tag.spices': 'மசாலா',
      'distribution.card.1.title': 'நேரடி தினசரி வழங்கல்',
      'distribution.card.1.desc': 'மூன்று சக்கர வாகனங்கள் மூலம் வீடுகளுக்கும் கடைகளுக்கும் கொள்கலனான தினசரி வழிகள்.',
      'distribution.card.2.title': 'ஹோட்டல் மற்றும் உணவக வழங்கல்',
      'distribution.card.2.desc': 'ஹோட்டல்கள் மற்றும் உணவக சமையலறைகளுக்கு நகர்த்தப்பட்ட பெரிய அளவிலான காய்கறிகள்.',
      'distribution.card.3.title': 'மொத்த சந்தை வழங்கல்',
      'distribution.card.3.desc': 'உயர்ந்த அளவிலான மொத்த சந்தை வழங்கல்கள், வர்த்தகிகள் தேவைக்கு முன் பூர்த்தி செய்யப்பட்டு கிடைக்கும்.',
      'distribution.card.4.title': 'சில்லறை வழங்கல்',
      'distribution.card.4.desc': 'அதிக தேவை உள்ள பகுதிகளில் தொடர்ச்சியான சில்லறை கடை வழங்கலை உறுதி செய்கிறது.',
      'roadmap.hero.eyebrow': 'எதிர்கால திட்டம்',
      'roadmap.hero.title': 'AK டிரேடர்ஸ் அடுத்தது எங்கே.',
      'roadmap.hero.lead': 'நேரடி சாகுபடி முதல் உலக வர்த்தகம் மற்றும் சில்லறை கடைகள் வரை மூன்று வளர்ச்சி கட்டங்கள்.',
      'roadmap.stage.1': 'முதல் கட்டம்',
      'roadmap.stage.1.title': 'சாகுபடி உற்பத்தி',
      'roadmap.stage.1.desc': 'வெளிப்புற கொள்முதல் சார்பில் இருந்து விலகி நேரடி விவசாய உற்பத்திக்கு முன்னேறுவது.',
      'roadmap.stage.2': 'இரண்டாம் கட்டம்',
      'roadmap.stage.2.title': 'இறக்குமதி மற்றும் ஏற்றுமதி',
      'roadmap.stage.2.desc': 'தமிழ்நாட்டின் தேவையை இந்தியாவின் உற்பத்தியை உலக சந்தைகளுடன் இணைக்கும்.',
      'roadmap.stage.3': 'மூன்றாம் கட்டம்',
      'roadmap.stage.3.title': 'அக்ரிக்கல்சர் ரீட்டெயில் மார்ட்',
      'roadmap.stage.3.desc': 'தமிழ்நாட்டில் நேரடி மூலப்பொருள் கடைகளைத் திறக்கும்.',
      'turnover.goal.eyebrow': 'முக்கிய இலக்கு',
      'turnover.goal.title': 'தேசிய அளவிலான விநியோகத்திற்காக முன்னேறுதல்',
      'turnover.goal.revenue': '₹2 கோடி வருமானம்',
      'index.hero.eyebrow': 'ஸ்தாபிக்கப்பட்டது 14 ஏப்ரல் 2025 · வீரகனூர், தமிழ்நாடு',
      'index.hero.title': 'AK TRADERS<br><em>ஒற்றுமையாக வளர்ந்தேறுவோம்.</em>',
      'index.hero.lead': 'நாங்கள் இந்தியாவின் அதிக உற்பத்தி நிலங்களை தமிழ்நாட்டின் வளர்ந்த தேவையை இணைக்கிறோம் — நேரடியாக உற்பத்தியாளர்களிடமிருந்து காய்கறிகளை வாங்கி விரைவாக வழங்குகிறோம்.',
      'index.hero.about_cta': 'எங்களை பற்றி',
      'index.hero.products_cta': 'எங்கள் தயாரிப்புகள்',
      'index.hero.contact_cta': 'தொடர்பு கொள்ள',
      'index.hero.quote_text': 'திருக்குறள் 619 — முயற்சி உடலை சிறிது வீணாக்கினாலும், அது நன்மையை தரும்.',
      'index.stats.eyebrow': 'எண்களில்',
      'index.stats.title': 'இளம் நிறுவனம், அதிவேகத்தில் நகர்கிறது',
      'index.choice.eyebrow': 'ஏன் AK டிரேடர்ஸ்',
      'index.choice.title': 'நம்பிக்கையில் உருவானது, تازமையில் இயங்குகிறது',
      'index.choice.body': 'நாம் நகர்த்தும் ஒவ்வொரு பெட்டியும் எங்கள் பெயரை எடுத்துச் செல்லும் — அதனால் தரம், வேகம் மற்றும் நீதியை மறக்க மாட்டோம்.',
      'index.card.fresh.title': 'புதிய தரம்',
      'index.card.fresh.body': 'விவசாயத்திலிருந்து வாங்கிய உடனே பொருட்கள் பாதுகாக்கப்பட்டு சந்தைக்கு அனுப்பப்படுகிறது.',
      'index.card.trusted.title': 'நம்பகமான வழங்குநர்',
      'index.card.trusted.body': 'ஒவ்வொரு ஒப்பந்தத்திலும் சமூக நலத்தின் நோக்கம் உள்ளது — தமிழ்நாடு நம்பும் வழங்கல்.',
      'index.card.direct.title': 'நேரடி கொள்முதல்',
      'index.card.direct.body': 'உற்பத்தியாளர்களிடமிருந்து நேரடியாக வாங்குகிறோம் — தேவையற்ற நடுத்தரங்களை தவிர்க்கிறோம்.',
      'index.card.prices.title': 'மோசமான விலைகள்',
      'index.card.prices.body': 'மீதமுள்ள கையகத்தை குறைத்து உண்மையான சேமிப்பை வாங்குபவர்களுக்கு வழங்குகிறோம்.',
      'index.card.fast.title': 'விரைவு விநியோகம்',
      'index.card.fast.body': 'வீடு முதல் விரைவான அனுப்புதல் வரை காய்கறிகள் சீராக நகர்கின்றன.',
      'index.card.service.title': 'தொழில்முறை சேவை',
      'index.card.service.body': 'வாங்குதல், துறைப் உறவுகள் மற்றும் தொடர்பு முகாமை நிபுணர் குழு கையாள்கிறது.',
      'index.mission.eyebrow': 'எங்கள் குறிக்கோள்',
      'index.mission.title': 'தமிழ்நாடு ஆதாரமில்லாத நிலைக்கு செல்லாது',
      'index.mission.body': 'விவசாயம் குறையும் போது தேவைகள் உயரும் போது, AK டிரேடர்ஸ் உயர் உற்பத்தி மாநிலங்களில் இருந்து நேரடியாக காய்கறிகளை கொண்டு வருகிறது.',
      'index.mission.cta': 'எங்களின் கதையை படியுங்கள்',
      'index.testimonials.eyebrow': 'வாங்குபவர்கள் கூறுகிறார்கள்',
      'index.testimonials.title': 'பரிவர்த்தனைகள் அல்ல, உறவுகள்',
      'index.testimonials.quote1': '"AK டிரேடர்ஸ் ஒருமுறையும் டெலிவரியை தாமதப்படுத்தவில்லை — எங்கள் உணவக சமையலறை வெங்காயம் அல்லது தக்காளி குறையவில்லை."',
      'index.testimonials.who1.name': 'ஹோட்டல் மேலாளர்',
      'index.testimonials.who1.place': 'பெரம்பலூர்',
      'index.testimonials.quote2': '"நேரடி பண்ணை விலை மற்றும் ஒழுங்கான தரம். ஒரு மொத்த வாங்குபவருக்கு இது சரியானதுதான்."',
      'index.testimonials.who2.name': 'மொத்த வணிகர்',
      'index.testimonials.who2.place': 'வீரகனூர்',
      'index.testimonials.quote3': '"அவர்கள் மூன்று சக்கர விநியோகத்தை ஒவ்வொரு காலையிலும் எங்கள் கடைக்கு முன் கொண்டு வருகிறார்கள்."',
      'index.testimonials.who3.name': 'சில்லறை கடை உரிமையாளர்',
      'index.testimonials.who3.place': 'பெரம்பலூர்',
      'about.hero.eyebrow': 'AK டிரேடர்ஸ் பற்றி',
      'about.hero.title': 'ஒரு சமூக நலத் திட்டம்,<br>வணிகமாக இயங்குகிறது.',
      'about.hero.lead': '14 ஏப்ரல் 2025 அன்று வீரகனூரில் நிறுவப்பட்ட AK டிரேடர்ஸ், தமிழ்நாட்டுக்கு தரமான காய்கறிகளை உறுதி செய்து வழங்குகின்றது.',
      'about.company.eyebrow': 'நிறுவன அறிமுகம்',
      'about.company.title': 'நாம் யார்',
      'about.company.lead': 'AK டிரேடர்ஸ் வீரகனூரில் அமைந்துள்ள ஒரு காய்கறி கொள்முதல் மற்றும் விநியோக நிறுவனம். எங்கள் உயர்ந்த உற்பத்தி மாநிலங்களில் இருந்து நேரடியாக காய்கறிகளை வாங்கி, wholesale மற்றும் retail சந்தைகளுக்கு தள்ளுகிறோம்.',
      'about.company.body': 'திரு. பிரபாகரன் கவஸல்யா தலைமையில் 14 ஏப்ரில் 2025 அன்று நிறுவப்பட்டபின், நாம் ஒரு தாய் கிளையிலிருந்து இரண்டு இடங்களுக்கு விரிவடைந்தோம். நாளாந்த வாங்குதல், புலம் உறவுகள் மற்றும் நிகழ்ந்த பகுதி விநியோகத்தை எங்கள் குழு கையாள்கிறது.',
      'about.mission.eyebrow': 'எங்கள் நோக்கம்',
      'about.mission.title': 'நாங்கள் ஏன் இருக்கிறோம்',
      'about.mission.body': 'AK டிரேடர்ஸ் தமிழ்நாட்டிற்கு தொடர்ந்து அடையாள பயிர்களை வழங்க சமூக நல நோக்கத்துடன் உருவானது. விவசாயம் குறையும் போது, தேவைகள் உயருவது என்ற நிலையிலேயே, நாங்கள் நேரடியாக உற்பத்தியாளர்களிலிருந்து பொருட்களை கொண்டு வருகிறோம்.',
      'about.leadership.eyebrow': 'தலைமையினர்',
      'about.leadership.title': 'AK டிரேடர்ஸின் பின்னணியில் உள்ளோர்',
      'about.faq.eyebrow': 'அடிக்கடி கேட்கப்படும்',
      'about.faq.title': 'பொதுவான கேள்விகள்',
      'about.faq.q1': 'AK டிரேடர்ஸ் தன் பொருட்களை எவ்வாறு பெறுகிறது?',
      'about.faq.a1': 'நாம் ஆந்திரா, கர்நாடகா, மத்திய பிரதேசம், தமிழ்நாடு மற்றும் கேரளாவின் விவசாய் மற்றும் உள்ளூர் சந்தைகளிலிருந்து நேரடியாகப் பொருட்களை கொள்முதல் செய்கிறோம்.',
      'about.faq.q2': 'யார் AK டிரேடர்ஸிடமிருந்து வாங்கக் கூடியவர்கள்?',
      'about.faq.a2': 'ஹோட்டல்கள், உணவகங்கள், மொத்த சந்தைகள், சில்லறை கடைகள் மற்றும் குடும்பங்கள் எங்கள் விநியோக மார்க்கெட்டின் பகுதியாகும்.',
      'about.faq.q3': 'விநியோகத்தில் பொருட்களின் تازமை எப்படி இருக்கும்?',
      'about.faq.a3': 'நேரடி தினசரி விநியோக வழிகளால், பெரும்பாலான பொருட்கள் அறுவடைச் செய்த பிறகு சில நாட்களில் வாங்குபவர்களிடம் சேர்கின்றன.',
      'about.faq.q4': 'AK டிரேடர்ஸ் பெரிய அளவிலான விநியோகத்தையும் வழங்குமா?',
      'about.faq.a4': 'ஆம் — ஹோட்டல்கள், உணவகங்கள் மற்றும் மொத்த சந்தைகளுக்கு தனியாக பெரிய அளவிலான விநியோகங்களுடன், சில்லறை வழித்தடங்களும் ஒருங்கிணைக்கப்படுகின்றன.',
      'contact.hero.eyebrow': 'எங்களை தொடர்பு கொள்ளுங்கள்',
      'contact.hero.title': 'விநியோகத்தைப் பற்றி பேசலாம்.',
      'contact.hero.lead': 'நீங்கள் ஹோட்டல், மொத்த சந்தை அல்லது குடும்பம் என்றால் — சரியான சேவையை எங்களுக்கு தெரிவிக்கவும்.',
      'contact.branches.location': 'தமிழ்நாடு, இந்தியா',
      'contact.form.heading': 'ஒரு செய்தி அனுப்பவும்',
      'contact.form.subheading': 'நாங்கள் விரைவில் உங்களை தொடர்பு கொள்வோம்',
      'contact.form.email': 'மின்னஞ்சல் முகவரி',
      'contact.sending': 'அனுப்பப்படுகிறது…',
      'products.hero.eyebrow': 'எங்கள் தயாரிப்புகள்',
      'products.hero.title': 'ஐந்து முக்கிய பொருட்கள்,<br>தவறாமல் sourced.',
      'products.hero.lead': 'ஒவ்வொரு பெட்டியும் source மாநிலத்தில் நிர்வாகப்படுத்தப்பட்டு, தரம் பரிசோதிக்கப்பட்டு கிடைக்கிறது.',
      'products.item.onion.title': 'வெங்காயம்',
      'products.item.onion.desc': 'ஆந்திரா, கர்நாடகா மற்றும் மத்திய பிரதேசத்திலிருந்து நிலையான அளவு மற்றும் ஆயுள் கொண்ட வெங்காயங்களை நாம் பெற்றுக்கொள்கிறோம்.',
      'products.item.potato.title': 'உருளைக்கிழங்கு',
      'products.item.potato.desc': 'மத்திய பிரதேசத்தின் உயர்தர பட்டியில் இருந்து சுத்தமான, ஒரே மாதிரியாகப் பட்டியலிடப்பட்ட உருளைக்கிழங்குகளை கொள்முதல் செய்கிறோம்.',
      'products.item.tomato.title': 'தக்காளி',
      'products.item.tomato.desc': 'ஆந்திரா மற்றும் கர்நாடகா இருந்து விரைவில் நகர்த்தப்பட்ட, நிறமும் உறுதியும் நிரம்பிய தக்காளிகள்.',
      'products.item.garlic.title': 'வேள்ளு',
      'products.item.garlic.desc': 'கர்நாடகா மற்றும் மத்திய பிரதேசத்தின் வாசனைமிக்க, இறுக்கமான தோல் கொண்ட வேள்ளு.',
      'products.item.ginger.title': 'இஞ்சி',
      'products.item.ginger.desc': 'கேரளாவின் மசாலைப் புலத்தில் இருந்து எடை குறைந்த, எண்ணெய் நிறைந்த இஞ்சி, புதியதாகவும் அனுப்பப்படுகிறது.',
      'products.item.local.title': 'உள்ளூர் தமிழ்நாடு பொருட்கள்',
      'products.item.local.desc': 'தமிழ்நாட்டில் உள்ள சீசனல் பச்சைப்பயிர்கள் மற்றும் காய்கறிகள், நெருங்கிய சப்ளை பாதையை உறுதி செய்யும்.',
      'procurement.hero.eyebrow': 'கொள்முதல் நெடுவரிசை',
      'procurement.hero.title': 'ஐந்து மாநிலங்கள்,<br>ஒரே நேரடி வழங்கல் நெடுவரிசை.',
      'procurement.hero.lead': 'ஒவ்வொரு பயிருக்கும் சிறந்த இடத்தில் வாங்கி தமிழ்நாட்டிற்கே நேரடியாக அனுப்புகிறோம்.',
      'distribution.hero.eyebrow': 'விநியோகம்',
      'distribution.hero.title': 'நான்கு பாதைகள்,<br>ஒரே تازமை உறுதி.',
      'distribution.hero.lead': 'மூன்று சக்கர வீதி விநியோகத்திலிருந்து பெரிய ஹோட்டல் விநியோக வரை — ஒவ்வொரு வாங்குபவருக்கும் சரியான முறையில்.',
      'turnover.hero.eyebrow': 'வளர்ச்சி இலக்குகள்',
      'turnover.hero.title': '₹42 லட்சத்திலிருந்து<br>₹2 கோடைக்கு.',
      'turnover.hero.lead': 'பெரிய கொள்முதல் மற்றும் ஆழமான விநியோகம் சார்ந்த எங்கள் ஆண்டு வளர்ச்சி திட்டம்.',
      'contact.validation': 'உங்கள் பெயர், தொலைபேசி மற்றும் செய்திகள் அனைத்தும் நிரப்பவும்.',
    },
  };

  function applyTranslations(lang){
    var strings = TRANSLATIONS[lang] || TRANSLATIONS.en;
    document.documentElement.lang = lang;
    document.body.dataset.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var key = el.getAttribute('data-i18n');
      if(!key) return;
      var value = strings[key];
      if(value !== undefined){ el.textContent = value; }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function(el){
      var key = el.getAttribute('data-i18n-html');
      if(!key) return;
      var value = strings[key];
      if(value !== undefined){ el.innerHTML = value; }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){
      var key = el.getAttribute('data-i18n-placeholder');
      if(!key) return;
      var value = strings[key];
      if(value !== undefined){ el.setAttribute('placeholder', value); }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(function(el){
      var key = el.getAttribute('data-i18n-title');
      if(!key) return;
      var value = strings[key];
      if(value !== undefined){ el.setAttribute('title', value); }
    });

    document.querySelectorAll('[data-lang]').forEach(function(btn){
      if(btn.getAttribute('data-lang') === lang){
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    var copy = strings['footer.copy'];
    if(copy){
      document.querySelectorAll('[data-i18n="footer.copy"]').forEach(function(el){
        el.textContent = copy.replace('{year}', new Date().getFullYear());
      });
    }
  }

  function setLanguage(lang){
    if(!TRANSLATIONS[lang]) lang = 'en';
    localStorage.setItem('ak_lang', lang);
    applyTranslations(lang);
  }

  function initLanguage(){
    var saved = localStorage.getItem('ak_lang');
    var preferred = saved || (navigator.language && navigator.language.startsWith('ta') ? 'ta' : 'en');
    setLanguage(preferred);
    document.querySelectorAll('.lang-btn').forEach(function(btn){
      if(btn.dataset.langListenerAttached) return;
      btn.addEventListener('click', function(){
        var requested = btn.getAttribute('data-lang');
        if(requested){ setLanguage(requested); }
      });
      btn.dataset.langListenerAttached = '1';
    });
  }

  function initCounters(){
    document.querySelectorAll("[data-count]").forEach(function(el){
      var target = parseFloat(el.getAttribute("data-count"));
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(!entry.isIntersecting) return;
          io.unobserve(el);
          var start = 0, duration = 1200, startTime = null;
          function step(ts){
            if(!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var val = start + (target - start) * eased;
            el.textContent = (target % 1 === 0) ? Math.floor(val) : val.toFixed(1);
            if(progress < 1){ requestAnimationFrame(step); } else { el.textContent = target; }
          }
          requestAnimationFrame(step);
        });
      }, {threshold:.4});
      io.observe(el);
    });
  }

  function initContactForm(){
    var form = document.querySelector("#contact-form");
    if(!form) return;
    var status = document.querySelector("#contact-status");
    form.addEventListener("submit", async function(e){
      e.preventDefault();
      var payload = {
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim()
      };
      if(!payload.name || !payload.phone || !payload.message){
        showStatus(status, getTranslation('contact.validation'), false);
        return;
      }
      var btn = form.querySelector("button[type=submit]");
      var original = btn.textContent;
      btn.textContent = "Sending…";
      btn.disabled = true;
      try{
        var res = await fetch(window.AK_API_BASE + "/contact/", {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify(payload)
        });
        if(!res.ok) throw new Error("Request failed");
        showStatus(status, getTranslation('contact.thanks'), true);
        form.reset();
      }catch(err){
        showStatus(status, getTranslation('contact.fail'), false);
      }finally{
        btn.textContent = original;
        btn.disabled = false;
      }
    });
  }

  function showStatus(el, text, ok){
    if(!el) return;
    el.textContent = text;
    el.style.color = ok ? "#2E7D32" : "#B3401C";
    el.style.display = "block";
  }

  function getTranslation(key){
    var lang = document.documentElement.lang || 'en';
    var strings = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return strings[key] || TRANSLATIONS.en[key] || '';
  }

  function initNewsletter(){
    var form = document.querySelector("#newsletter-form");
    if(!form) return;
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var input = form.querySelector("input");
      if(!input.value.trim()) return;
      input.value = "";
      var msg = form.querySelector(".nl-msg");
      if(msg){ msg.textContent = getTranslation('newsletter.subscribed'); }
    });
  }
})();
