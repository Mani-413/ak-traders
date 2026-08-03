/* AK TRADERS — Admin Panel logic */
(function(){
  "use strict";

  var API = "/api";
  var TOKEN_KEY = "ak_admin_token";
  var demoMode = false;

  var demoData = {
    products: [
      {id:1,name:"Onion",emoji:"🧅",badge:"Fresh Quality",avail:"Available",desc:"Firm, well-cured bulbs sourced from Andhra Pradesh, Karnataka and Madhya Pradesh."},
      {id:2,name:"Potato",emoji:"🥔",badge:"Fresh Quality",avail:"Available",desc:"Clean, uniform-grade potatoes from Madhya Pradesh."},
      {id:3,name:"Tomato",emoji:"🍅",badge:"Fresh Quality",avail:"Available",desc:"Vine-ripened tomatoes from Andhra Pradesh and Karnataka."},
      {id:4,name:"Garlic",emoji:"🧄",badge:"Fresh Quality",avail:"Available",desc:"Aromatic, tight-skinned garlic from Karnataka and Madhya Pradesh."},
      {id:5,name:"Ginger",emoji:"🫚",badge:"Fresh Quality",avail:"Available",desc:"Fibre-light, high-oil ginger sourced from Kerala."}
    ],
    gallery: [],
    messages: [
      {id:1,name:"Suresh Kumar",phone:"+91 90000 00001",email:"suresh@example.com",message:"Interested in bulk onion supply for our hotel.",created_at:"2026-07-20"},
      {id:2,name:"Meena R",phone:"+91 90000 00002",email:"",message:"Do you deliver to Perambalur town daily?",created_at:"2026-07-22"}
    ],
    enquiries: [
      {id:1,name:"Green Leaf Restaurant",product:"Tomato",quantity:"200 kg / week",status:"Open"},
      {id:2,name:"City Wholesale Market",product:"Onion",quantity:"1 tonne / week",status:"Contacted"}
    ]
  };

  function token(){ return localStorage.getItem(TOKEN_KEY); }
  function setToken(t){ localStorage.setItem(TOKEN_KEY, t); }
  function clearToken(){ localStorage.removeItem(TOKEN_KEY); }

  async function api(path, opts){
    opts = opts || {};
    opts.headers = Object.assign({"Content-Type":"application/json"}, opts.headers || {});
    if(token()) opts.headers["Authorization"] = "Bearer " + token();
    var res = await fetch(API + path, opts);
    if(res.status === 401) throw new Error("unauthorized");
    if(!res.ok) throw new Error("request failed");
    return res.json();
  }

  function toast(msg){
    var t = document.getElementById("toast");
    t.textContent = msg;
    t.style.display = "block";
    setTimeout(function(){ t.style.display = "none"; }, 2600);
  }

  // ---------- LOGIN ----------
  document.getElementById("login-form").addEventListener("submit", async function(e){
    e.preventDefault();
    var user = document.getElementById("l-user").value.trim();
    var pass = document.getElementById("l-pass").value;
    var err = document.getElementById("login-err");
    err.style.display = "none";
    try{
      var data = await api("/auth/login", {
        method:"POST",
        body: JSON.stringify({username:user, password:pass})
      });
      setToken(data.access_token);
      demoMode = false;
      enterDashboard();
    }catch(ex){
      // fall back to local demo mode if backend is unreachable
      if(user === "admin" && pass === "admin123"){
        demoMode = true;
        setToken("demo-token");
        enterDashboard();
      }else{
        err.style.display = "block";
      }
    }
  });

  document.getElementById("logout-btn").addEventListener("click", function(){
    clearToken();
    document.getElementById("admin-shell").classList.remove("active");
    document.getElementById("login-screen").style.display = "flex";
  });

  function enterDashboard(){
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("admin-shell").classList.add("active");
    loadAll();
  }

  if(token()){ demoMode = true; enterDashboard(); } // resume session (demo-safe)

  // ---------- NAV ----------
  document.querySelectorAll(".a-nav button").forEach(function(btn){
    btn.addEventListener("click", function(){
      document.querySelectorAll(".a-nav button").forEach(function(b){ b.classList.remove("active"); });
      btn.classList.add("active");
      document.querySelectorAll(".a-view").forEach(function(v){ v.classList.remove("active"); });
      document.getElementById("view-" + btn.dataset.view).classList.add("active");
    });
  });

  // ---------- DATA LOADING ----------
  async function loadAll(){
    var products = await safeGet("/products/", demoData.products);
    var gallery = await safeGet("/gallery/", demoData.gallery);
    var messages = await safeGet("/contact/", demoData.messages);
    var enquiries = await safeGet("/enquiries/", demoData.enquiries);

    renderDashboard(products, gallery, messages, enquiries);
    renderProducts(products);
    renderGallery(gallery);
    renderMessages(messages);
    renderEnquiries(enquiries);
  }

  async function safeGet(path, fallback){
    if(demoMode) return fallback;
    try{ return await api(path); }catch(e){ demoMode = true; return fallback; }
  }

  function renderDashboard(products, gallery, messages, enquiries){
    document.getElementById("stat-products").textContent = products.length;
    document.getElementById("stat-gallery").textContent = gallery.length;
    document.getElementById("stat-messages").textContent = messages.length;
    document.getElementById("stat-enquiries").textContent = enquiries.filter(function(e){return e.status !== "Closed";}).length;
    var rows = messages.slice(-5).reverse().map(function(m){
      return "<tr><td>"+esc(m.name)+"</td><td>"+esc(m.phone)+"</td><td>"+esc(m.message)+"</td><td>"+esc(m.created_at||"")+"</td></tr>";
    }).join("");
    document.getElementById("dash-recent").innerHTML = rows || emptyRow(4,"No messages yet.");
  }

  // ---------- PRODUCTS ----------
  var editingId = null;
  document.getElementById("new-product-btn").addEventListener("click", function(){
    editingId = null;
    document.getElementById("product-form-title").textContent = "New Product";
    ["p-name","p-emoji","p-desc"].forEach(function(id){ document.getElementById(id).value = ""; });
    document.getElementById("p-badge").value = "Fresh Quality";
    document.getElementById("p-avail").value = "Available";
    document.getElementById("product-form-panel").style.display = "block";
  });
  document.getElementById("cancel-product-btn").addEventListener("click", function(){
    document.getElementById("product-form-panel").style.display = "none";
  });
  document.getElementById("save-product-btn").addEventListener("click", async function(){
    var payload = {
      name: document.getElementById("p-name").value.trim(),
      emoji: document.getElementById("p-emoji").value.trim() || "🥬",
      badge: document.getElementById("p-badge").value.trim(),
      avail: document.getElementById("p-avail").value,
      desc: document.getElementById("p-desc").value.trim()
    };
    if(!payload.name){ toast("Product name is required"); return; }
    try{
      if(demoMode){
        if(editingId){
          var idx = demoData.products.findIndex(function(p){return p.id===editingId;});
          demoData.products[idx] = Object.assign({id:editingId}, payload);
        }else{
          payload.id = Date.now();
          demoData.products.push(payload);
        }
      }else if(editingId){
        await api("/products/"+editingId, {method:"PUT", body:JSON.stringify(payload)});
      }else{
        await api("/products/", {method:"POST", body:JSON.stringify(payload)});
      }
      toast("Product saved");
      document.getElementById("product-form-panel").style.display = "none";
      loadAll();
    }catch(e){ toast("Could not save product"); }
  });

  function renderProducts(products){
    document.getElementById("products-table").innerHTML = products.map(function(p){
      return "<tr><td>"+p.emoji+" <strong>"+esc(p.name)+"</strong><div style='color:#5B655B;font-size:12.5px;margin-top:2px;'>"+esc(p.desc||"")+"</div></td>" +
        "<td><span class='a-badge'>"+esc(p.badge||"")+"</span></td><td>"+esc(p.avail||"")+"</td>" +
        "<td class='a-row-actions'><button class='a-btn' onclick='AKAdmin.editProduct("+p.id+")'>Edit</button>" +
        "<button class='a-btn danger' onclick='AKAdmin.deleteProduct("+p.id+")'>Delete</button></td></tr>";
    }).join("") || emptyRow(4,"No products yet — add your first one.");
  }

  window.AKAdmin = {
    editProduct: function(id){
      var p = demoData.products.find(function(x){return x.id===id;});
      if(!p) return;
      editingId = id;
      document.getElementById("product-form-title").textContent = "Edit Product";
      document.getElementById("p-name").value = p.name;
      document.getElementById("p-emoji").value = p.emoji;
      document.getElementById("p-badge").value = p.badge;
      document.getElementById("p-avail").value = p.avail;
      document.getElementById("p-desc").value = p.desc;
      document.getElementById("product-form-panel").style.display = "block";
    },
    deleteProduct: async function(id){
      if(!confirm("Delete this product?")) return;
      if(demoMode){
        demoData.products = demoData.products.filter(function(p){return p.id!==id;});
      }else{
        try{ await api("/products/"+id, {method:"DELETE"}); }catch(e){}
      }
      toast("Product deleted");
      loadAll();
    },
    deleteImage: function(id){
      demoData.gallery = demoData.gallery.filter(function(g){return g.id!==id;});
      toast("Image removed");
      loadAll();
    },
    deleteMessage: function(id){
      demoData.messages = demoData.messages.filter(function(m){return m.id!==id;});
      toast("Message deleted");
      loadAll();
    },
    setEnquiryStatus: function(id, status){
      var e = demoData.enquiries.find(function(x){return x.id===id;});
      if(e) e.status = status;
      toast("Enquiry updated");
      loadAll();
    }
  };

  // ---------- GALLERY ----------
  document.getElementById("gallery-upload-btn").addEventListener("click", function(){
    var input = document.getElementById("gallery-upload");
    if(!input.files.length){ toast("Choose an image first"); return; }
    var file = input.files[0];
    demoData.gallery.push({id:Date.now(), name:file.name, created_at:new Date().toISOString().slice(0,10)});
    input.value = "";
    toast("Image uploaded");
    loadAll();
  });

  function renderGallery(gallery){
    document.getElementById("gallery-table").innerHTML = gallery.map(function(g){
      return "<tr><td>"+esc(g.name)+"</td><td>"+esc(g.created_at||"")+"</td>" +
        "<td><button class='a-btn danger' onclick='AKAdmin.deleteImage("+g.id+")'>Delete</button></td></tr>";
    }).join("") || emptyRow(3,"No images uploaded yet.");
  }

  // ---------- MESSAGES ----------
  function renderMessages(messages){
    document.getElementById("messages-table").innerHTML = messages.map(function(m){
      return "<tr><td>"+esc(m.name)+"</td><td>"+esc(m.phone)+"</td><td>"+esc(m.email||"—")+"</td>" +
        "<td>"+esc(m.message)+"</td><td>"+esc(m.created_at||"")+"</td>" +
        "<td><button class='a-btn danger' onclick='AKAdmin.deleteMessage("+m.id+")'>Delete</button></td></tr>";
    }).join("") || emptyRow(6,"No contact messages yet.");
  }

  // ---------- ENQUIRIES ----------
  function renderEnquiries(enquiries){
    document.getElementById("enquiries-table").innerHTML = enquiries.map(function(e){
      return "<tr><td>"+esc(e.name)+"</td><td>"+esc(e.product)+"</td><td>"+esc(e.quantity)+"</td>" +
        "<td><span class='a-badge'>"+esc(e.status)+"</span></td>" +
        "<td><select onchange='AKAdmin.setEnquiryStatus("+e.id+", this.value)'>" +
        "<option"+(e.status==="Open"?" selected":"")+">Open</option>" +
        "<option"+(e.status==="Contacted"?" selected":"")+">Contacted</option>" +
        "<option"+(e.status==="Closed"?" selected":"")+">Closed</option></select></td></tr>";
    }).join("") || emptyRow(5,"No enquiries yet.");
  }

  function emptyRow(cols,text){
    return "<tr><td colspan='"+cols+"' class='empty-state'>"+text+"</td></tr>";
  }
  function esc(s){
    return String(s==null?"":s).replace(/[&<>"']/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }
})();
