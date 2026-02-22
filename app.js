/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const CHEFS = [
  { id:"mario",   name:"Chef Mario",   emoji:"🇮🇹", specialty:"Italian & Pasta",        followers:12400, bio:"Naples-born. Hand-rolled pasta and wood-fired everything." },
  { id:"yuki",    name:"Chef Yuki",    emoji:"🍣", specialty:"Japanese & Omakase",      followers:18900, bio:"15 years in Tokyo's finest omakase restaurants." },
  { id:"sarah",   name:"Chef Sarah",   emoji:"🥩", specialty:"BBQ & American Grill",    followers:9800,  bio:"Texas BBQ royalty. Low-and-slow is the only way." },
  { id:"priya",   name:"Chef Priya",   emoji:"🌶️", specialty:"Indian & Street Spice",   followers:14200, bio:"Mumbai street food meets fine dining. Spice is life." },
  { id:"emma",    name:"Chef Emma",    emoji:"🥗", specialty:"Plant-Based & Healthy",   followers:22100, bio:"Proving vegan food can be the most exciting thing on the plate." },
  { id:"nak",     name:"Chef Nak",     emoji:"🍜", specialty:"Thai & Southeast Asian",  followers:8700,  bio:"Bringing the flavours of Chiang Mai to your kitchen." },
  { id:"lucia",   name:"Chef Lucia",   emoji:"🍰", specialty:"Pastry & Desserts",       followers:31000, bio:"Pastry chef, chocolate obsessive, tiramisu perfectionist." },
  { id:"jin",     name:"Chef Jin",     emoji:"🔥", specialty:"Korean Fusion",           followers:16500, bio:"Bridging Seoul street food with modern technique." },
  { id:"antonio", name:"Chef Antonio", emoji:"🍕", specialty:"Neapolitan Pizza",        followers:11200, bio:"Third-generation pizzaiolo. 72-hour dough or nothing." },
  { id:"mei",     name:"Chef Mei",     emoji:"🥟", specialty:"Dim Sum & Chinese",       followers:19300, bio:"Hong Kong dim sum meets contemporary innovation." },
];

const COOKING_STYLES = [
  { id:"quick",      label:"Quick & Easy",      icon:"⚡", desc:"Under 30 minutes" },
  { id:"gourmet",    label:"Gourmet",            icon:"⭐", desc:"Restaurant quality" },
  { id:"healthy",    label:"Healthy & Clean",    icon:"🥗", desc:"Nutritious first" },
  { id:"comfort",    label:"Comfort Food",       icon:"🫶", desc:"Soul-warming classics" },
  { id:"baking",     label:"Baking & Pastry",    icon:"🍞", desc:"Bread, cake & more" },
  { id:"bbq",        label:"BBQ & Grilling",     icon:"🔥", desc:"Fire & smoke" },
  { id:"vegan",      label:"Plant-Based",        icon:"🌱", desc:"No animal products" },
  { id:"streetfood", label:"Street Food",        icon:"🌮", desc:"Bold & casual" },
  { id:"finedining", label:"Fine Dining",        icon:"🍽️", desc:"Elevated techniques" },
  { id:"fusion",     label:"Global Fusion",      icon:"🌍", desc:"Cross-cultural mixes" },
  { id:"breakfast",  label:"Breakfast & Brunch", icon:"☀️", desc:"Morning magic" },
  { id:"desserts",   label:"Desserts",           icon:"🍫", desc:"Sweet endings" },
];

const DIETS = [
  { id:"vegetarian", label:"Vegetarian", icon:"🥦", desc:"No meat or fish" },
  { id:"vegan",      label:"Vegan",      icon:"🌱", desc:"No animal products" },
  { id:"glutenfree", label:"Gluten-Free",icon:"🌾", desc:"No gluten" },
  { id:"dairyfree",  label:"Dairy-Free", icon:"🥛", desc:"No dairy" },
  { id:"keto",       label:"Keto",       icon:"🥩", desc:"Low-carb, high-fat" },
  { id:"halal",      label:"Halal",      icon:"☪️", desc:"Halal certified" },
];

const AVATARS = ["👨‍🍳","👩‍🍳","🧑‍🍳","🍳","👨‍🍽️","👩‍🍽️","🧑‍🍽️","🍴","🥘","🫕"];

const RECIPES = [
  { id:1,  title:"Chocolate Lava Cake",    image:"https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500", desc:"Molten dark chocolate center, crispy edges",         chefId:"mario",   difficulty:"medium", time:29,  rating:4.7, likes:234,  styles:["gourmet","desserts"],          cuisine:"French",
    ingredients:["200g dark chocolate","100g butter","3 eggs","50g sugar","30g flour"],
    steps:["Melt chocolate and butter together","Whisk eggs and sugar until pale","Fold in flour then chocolate","Bake at 200°C for 12 min"] },
  { id:2,  title:"Omakase Sushi Roll",     image:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500", desc:"Premium salmon and tuna with ponzu",                 chefId:"yuki",    difficulty:"hard",   time:45,  rating:4.9, likes:567,  styles:["gourmet","finedining"],        cuisine:"Japanese",
    ingredients:["Sushi rice","Nori sheets","200g salmon","Avocado","Cucumber","Ponzu sauce"],
    steps:["Season rice with vinegar mix","Slice fish paper thin","Roll tightly on bamboo mat","Slice and plate with garnish"] },
  { id:3,  title:"Truffle Smash Burger",   image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500", desc:"Wagyu beef, white truffle oil, aged cheddar",        chefId:"sarah",   difficulty:"medium", time:25,  rating:5.0, likes:892,  styles:["bbq","comfort","gourmet"],     cuisine:"American",
    ingredients:["500g wagyu mince","Brioche buns","2 tbsp truffle oil","Aged cheddar","Pickles"],
    steps:["Form loose 120g balls","Smash on screaming-hot cast iron","Flip, cheese, cover 30 sec","Build and drizzle truffle oil"] },
  { id:4,  title:"Butter Chicken Makhani", image:"https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500", desc:"Silky tomato cream sauce, tandoori chicken",         chefId:"priya",   difficulty:"medium", time:50,  rating:4.8, likes:1240, styles:["comfort","streetfood"],        cuisine:"Indian",
    ingredients:["700g chicken thighs","Yogurt & spices","400ml tomato puree","200ml cream","Butter & garlic"],
    steps:["Marinate chicken overnight","Grill until charred","Build sauce with butter and tomatoes","Simmer 20 min"] },
  { id:5,  title:"Rainbow Grain Bowl",     image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500", desc:"Quinoa, roasted veg, tahini goddess dressing",       chefId:"emma",    difficulty:"easy",   time:20,  rating:4.5, likes:445,  styles:["healthy","vegan","quick"],     cuisine:"Fusion",
    ingredients:["Quinoa","Mixed roasted veg","Tahini","Lemon","Pomegranate seeds","Fresh herbs"],
    steps:["Cook quinoa, let cool","Roast veg at 200°C 25 min","Blend tahini dressing","Assemble and drizzle"] },
  { id:6,  title:"Pad Thai Street Style",  image:"https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500", desc:"Wok-charred noodles with tamarind & prawns",         chefId:"nak",     difficulty:"medium", time:30,  rating:4.7, likes:788,  styles:["streetfood","quick"],          cuisine:"Thai",
    ingredients:["Rice noodles","200g prawns","Tamarind paste","Fish sauce","Bean sprouts","Peanuts"],
    steps:["Soak noodles 20 min","High-heat wok, cook prawns","Add noodles and sauce","Toss fast, top with peanuts"] },
  { id:7,  title:"Tiramisu Classico",      image:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500", desc:"Cold brew espresso, mascarpone, Amaretto",           chefId:"lucia",   difficulty:"medium", time:40,  rating:4.9, likes:1120, styles:["desserts","gourmet"],          cuisine:"Italian",
    ingredients:["500g mascarpone","4 eggs","100g sugar","Cold brew espresso","Ladyfingers","Amaretto","Cacao"],
    steps:["Whip egg whites to stiff peaks","Whisk yolks and sugar pale","Fold mascarpone in","Layer with ladyfingers, chill 6hrs"] },
  { id:8,  title:"Bulgogi Street Tacos",   image:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500", desc:"Korean BBQ beef, kimchi slaw, sesame mayo",          chefId:"jin",     difficulty:"medium", time:35,  rating:4.8, likes:934,  styles:["streetfood","fusion","bbq"],   cuisine:"Korean-Mexican",
    ingredients:["500g ribeye","Gochujang marinade","Flour tortillas","Kimchi","Sesame mayo"],
    steps:["Slice beef thin, marinate 2hrs","Grill max heat 2 min/side","Warm tortillas","Assemble with kimchi slaw"] },
  { id:9,  title:"Neapolitan Margherita",  image:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500", desc:"72-hour dough, San Marzano, buffalo mozz",           chefId:"antonio", difficulty:"hard",   time:90,  rating:4.6, likes:673,  styles:["gourmet","comfort"],           cuisine:"Italian",
    ingredients:["400g 00 flour","San Marzano tomatoes","Buffalo mozzarella","Fresh basil","Olive oil"],
    steps:["Cold-proof dough 72hrs","Stretch by hand 30cm","Sauce and tear mozzarella over","Bake at max heat 90 sec"] },
  { id:10, title:"Har Gow Dim Sum",        image:"https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500", desc:"Crystal prawn dumplings, XO dipping sauce",          chefId:"mei",     difficulty:"hard",   time:60,  rating:4.8, likes:891,  styles:["finedining","gourmet"],        cuisine:"Chinese",
    ingredients:["Wheat starch","300g prawns","Bamboo shoots","Sesame oil","XO sauce"],
    steps:["Make crystal dough with boiling water","Mince prawn filling","Pleat into 7-fold fans","Steam 8 min, serve immediately"] },
  { id:11, title:"Avocado Toast Deluxe",   image:"https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=500", desc:"Sourdough, dukkah, poached egg, chilli oil",         chefId:"emma",    difficulty:"easy",   time:12,  rating:4.5, likes:512,  styles:["breakfast","healthy","quick"], cuisine:"Modern Australian",
    ingredients:["Sourdough","2 avocados","2 eggs","Dukkah","Chilli oil","Microgreens"],
    steps:["Toast sourdough thick","Smash avocado with lemon","Poach eggs 3 min","Stack, drizzle chilli oil, dust dukkah"] },
  { id:12, title:"Croissant au Beurre",    image:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500", desc:"Classic laminated pastry, 81 flaky layers",          chefId:"lucia",   difficulty:"hard",   time:180, rating:5.0, likes:2100, styles:["baking","finedining","gourmet"],cuisine:"French",
    ingredients:["500g flour","AOP butter block","Milk","Yeast","Sugar","Salt"],
    steps:["Make détrempe, rest overnight","Lock butter block in, fold 3×","Cut triangles and roll","Proof 2hrs, egg wash, bake 200°C"] },
];

/* ═══════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════ */
const state = {
  // user profile
  username:   "",
  displayName:"",
  bio:        "",
  avatar:     "👨‍🍳",
  isNewUser:  false,

  // preferences (set during onboarding)
  userStyles: [],   // cooking style ids
  userDiets:  [],   // diet ids

  // social
  follows:     {},  // { chefId: bool }
  followDelta: {},  // { chefId: number } — delta to add to base followers

  // recipe actions
  likes:      {},   // { recipeId: bool }
  likeCounts: {},   // { recipeId: count }
  saved:      {},   // { recipeId: bool }

  // navigation
  currentPage: "feed",
  feedTab:     "foryou",
  feedDiff:    "all",
  profileTab:  "saved",

  // onboarding temp state
  obStep:     1,
  obStyles:   new Set(),
  obDiets:    new Set(),
  obChefs:    new Set(),

  // edit profile temp
  editAvatar: "",
};

/* ═══════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════ */
const fmt = n => n >= 1000 ? (n/1000).toFixed(1)+"K" : String(n);
const $   = id => document.getElementById(id);
const mk  = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls)  e.className = cls;
  if (html) e.innerHTML = html;
  return e;
};

let _toastTimer;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
}

/* ═══════════════════════════════════════════════════════
   AUTH
═══════════════════════════════════════════════════════ */
let _authMode = "login";

// Tab switching
document.querySelectorAll(".auth-tab").forEach(btn => {
  btn.addEventListener("click", () => {
    _authMode = btn.dataset.tab;
    document.querySelectorAll(".auth-tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    $("signup-extra").classList.toggle("hidden", _authMode !== "signup");
    $("auth-heading").textContent = _authMode === "login" ? "Welcome back 👋" : "Join the kitchen 👋";
    $("auth-sub").textContent     = _authMode === "login" ? "Sign in to continue your culinary journey" : "Join thousands of passionate cooks";
    $("auth-submit").textContent  = _authMode === "login" ? "Sign In →" : "Create Account →";
    $("auth-err").classList.add("hidden");
  });
});

$("auth-switch-link").addEventListener("click", () =>
  document.querySelector('.auth-tab[data-tab="signup"]').click()
);

["f-email","f-password","f-name","f-username","f-bio"].forEach(id => {
  const el = $(id); if (el) el.addEventListener("keydown", e => { if (e.key==="Enter") doAuth(); });
});
$("auth-submit").addEventListener("click", doAuth);

function doAuth() {
  const email = $("f-email").value.trim();
  const pass  = $("f-password").value;
  const errEl = $("auth-err");
  errEl.classList.add("hidden");

  if (!email || !pass) return showErr("Please fill in email and password");

  if (_authMode === "signup") {
    const name = $("f-name").value.trim();
    const user = $("f-username").value.trim();
    if (!name || !user) return showErr("Please fill in all fields");
    if (pass.length < 6) return showErr("Password needs at least 6 characters");

    state.displayName = name;
    state.username    = user;
    state.bio         = $("f-bio").value.trim() || "Passionate home cook";
    state.avatar      = "👨‍🍳";
    state.isNewUser   = true;

    // New users MUST go through onboarding
    startOnboarding();
  } else {
    // Returning users — mock login with any credentials
    state.displayName = email.split("@")[0];
    state.username    = email.split("@")[0];
    state.bio         = "Passionate home cook";
    state.avatar      = "👨‍🍳";
    state.isNewUser   = false;

    // Returning users also go through onboarding if they haven't set tastes
    // (for this demo, always show it for login too so they can customise)
    startOnboarding();
  }

  function showErr(msg) {
    errEl.textContent = "⚠️ " + msg;
    errEl.classList.remove("hidden");
  }
}

/* ═══════════════════════════════════════════════════════
   ONBOARDING  — 3 steps, always before dashboard
═══════════════════════════════════════════════════════ */
function startOnboarding() {
  state.obStep  = 1;
  state.obStyles = new Set();
  state.obDiets  = new Set();
  state.obChefs  = new Set();

  buildObStyleGrid();
  buildObDietGrid();
  buildObChefGrid();
  goObStep(1);
  showScreen("screen-onboard");
}

// ── Build grids ──────────────────────────────
function buildObStyleGrid() {
  const g = $("ob-style-grid");
  g.innerHTML = "";
  COOKING_STYLES.forEach(s => {
    const card = mk("div","style-card",`
      <span class="sc-icon">${s.icon}</span>
      <div class="sc-label">${s.label}</div>
      <div class="sc-desc">${s.desc}</div>
    `);
    card.dataset.id = s.id;
    card.addEventListener("click", () => {
      toggleObSet(state.obStyles, s.id, card);
      updateObFooter();
    });
    g.appendChild(card);
  });
}

function buildObDietGrid() {
  const g = $("ob-diet-grid");
  g.innerHTML = "";
  DIETS.forEach(d => {
    const card = mk("div","diet-card",`
      <span class="di">${d.icon}</span>
      <div><div class="dl">${d.label}</div><div class="dd">${d.desc}</div></div>
    `);
    card.dataset.id = d.id;
    card.addEventListener("click", () => {
      toggleObSet(state.obDiets, d.id, card);
      updateObFooter();
    });
    g.appendChild(card);
  });
}

function buildObChefGrid() {
  const g = $("ob-chef-grid");
  g.innerHTML = "";
  CHEFS.forEach(c => {
    const card = mk("div","chef-ob-card",`
      <span class="chef-ob-emoji">${c.emoji}</span>
      <h4>${c.name}</h4>
      <div class="specialty">${c.specialty}</div>
      <div class="fcount">👥 ${fmt(c.followers)} followers</div>
    `);
    card.dataset.id = c.id;
    card.addEventListener("click", () => {
      toggleObSet(state.obChefs, c.id, card);
      updateObFooter();
    });
    g.appendChild(card);
  });
}

function toggleObSet(set, id, card) {
  if (set.has(id)) { set.delete(id); card.classList.remove("sel"); removeCheck(card); }
  else             { set.add(id);    card.classList.add("sel");    addCheck(card); }
}
function addCheck(card) {
  if (!card.querySelector(".sel-check")) {
    const c = mk("div","sel-check","✓"); card.appendChild(c);
  }
}
function removeCheck(card) {
  const c = card.querySelector(".sel-check"); if (c) c.remove();
}

// ── Step navigation ──────────────────────────
function goObStep(n) {
  state.obStep = n;
  ["ob-s1","ob-s2","ob-s3"].forEach((id,i) =>
    $(id).classList.toggle("hidden", i !== n-1)
  );
  $("ob-fill").style.width = ((n/3)*100)+"%";
  $("ob-step-lbl").textContent = `Step ${n} of 3`;
  $("ob-back").classList.toggle("hidden", n === 1);
  updateObFooter();
}

function updateObFooter() {
  const n = state.obStep;
  let hint = "", disabled = false;
  if (n === 1) {
    hint     = `${state.obStyles.size} selected — pick at least 3 to continue`;
    disabled = state.obStyles.size < 3;
    $("ob-next").textContent = "Continue →";
  } else if (n === 2) {
    hint     = state.obDiets.size > 0 ? `${state.obDiets.size} dietary prefs selected` : "Skip if none apply";
    disabled = false;
    $("ob-next").textContent = "Continue →";
  } else {
    hint     = state.obChefs.size > 0 ? `${state.obChefs.size} chefs selected` : "Skip if you'd like";
    disabled = false;
    $("ob-next").textContent = "Go to Dashboard →";
  }
  $("ob-hint").textContent  = hint;
  $("ob-next").disabled     = disabled;
}

$("ob-next").addEventListener("click", () => {
  if (state.obStep < 3) {
    goObStep(state.obStep + 1);
  } else {
    finishOnboarding();
  }
});

$("ob-back").addEventListener("click", () => {
  if (state.obStep > 1) goObStep(state.obStep - 1);
});

$("ob-skip").addEventListener("click", finishOnboarding);

function finishOnboarding() {
  // Commit onboarding choices to state
  state.userStyles = [...state.obStyles];
  state.userDiets  = [...state.obDiets];
  state.obChefs.forEach(id => {
    state.follows[id]     = true;
    state.followDelta[id] = 1;
  });
  launchApp();
}

/* ═══════════════════════════════════════════════════════
   APP LAUNCH
═══════════════════════════════════════════════════════ */
function launchApp() {
  showScreen("screen-app");
  updateTopbar();
  renderSidebarFollowing();

  // Sidebar nav
  document.querySelectorAll(".sb-item[data-page]").forEach(item => {
    item.addEventListener("click", () => showPage(item.dataset.page));
  });

  // Topbar user pill → my profile
  $("topbar-profile-btn").addEventListener("click", () => showPage("profile"));

  // Feed tabs
  document.querySelectorAll(".feed-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".feed-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.feedTab = btn.dataset.ftab;
      renderFeed();
    });
  });

  // Difficulty chips
  document.querySelectorAll(".chip[data-diff]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".chip[data-diff]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.feedDiff = btn.dataset.diff;
      renderFeed();
    });
  });

  // Global search
  $("search-input").addEventListener("input", () => {
    if (state.currentPage !== "feed") showPage("feed");
    else renderFeed();
  });

  // Chefs page search
  $("chefs-search").addEventListener("input", renderChefs);

  // Recipe modal close
  $("modal-close").addEventListener("click", closeRecipeModal);
  $("recipe-modal").addEventListener("click", e => {
    if (e.target === $("recipe-modal")) closeRecipeModal();
  });

  // Chef panel close
  $("chef-panel-close").addEventListener("click", closeChefPanel);
  $("chef-panel-overlay").addEventListener("click", e => {
    if (e.target === $("chef-panel-overlay")) closeChefPanel();
  });

  // Chef name in recipe modal → open chef panel
  $("modal-chef-click").addEventListener("click", () => {
    const chefId = $("modal-chef-click").dataset.chefId;
    if (chefId) { closeRecipeModal(); openChefPanel(chefId); }
  });

  // Profile tabs
  document.querySelectorAll(".profile-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".profile-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.profileTab = btn.dataset.ptab;
      renderMyProfileContent();
    });
  });

  // Edit profile
  $("edit-profile-btn").addEventListener("click", openEditModal);
  $("edit-modal-close").addEventListener("click", () => $("edit-modal").classList.add("hidden"));
  $("edit-modal").addEventListener("click", e => {
    if (e.target === $("edit-modal")) $("edit-modal").classList.add("hidden");
  });
  $("edit-save-btn").addEventListener("click", saveProfile);

  // Avatar picker
  buildAvatarPicker();

  // Publish
  $("publish-btn").addEventListener("click", () => {
    if (!$("c-title").value.trim() || !$("c-desc").value.trim() || !$("c-time").value) {
      toast("⚠️ Fill in title, description and time"); return;
    }
    toast("🎉 Recipe published! (demo)");
    ["c-title","c-desc","c-time","c-ing","c-steps"].forEach(id => $(id).value = "");
  });

  // Save prefs
  $("save-prefs-btn").addEventListener("click", () => {
    state.userStyles = [...document.querySelectorAll("#prefs-style-grid .style-card.sel")].map(c => c.dataset.id);
    state.userDiets  = [...document.querySelectorAll("#prefs-diet-grid .diet-card.sel")].map(c => c.dataset.id);
    toast("✅ Preferences saved — feed updated!");
    renderFeed();
  });

  // Logout
  $("logout-btn").addEventListener("click", () => {
    Object.assign(state, {
      username:"", displayName:"", bio:"", avatar:"👨‍🍳", isNewUser:false,
      userStyles:[], userDiets:[], follows:{}, followDelta:{},
      likes:{}, likeCounts:{}, saved:{},
    });
    showScreen("screen-auth");
  });

  showPage("feed");
}

/* ═══════════════════════════════════════════════════════
   PAGE NAVIGATION
═══════════════════════════════════════════════════════ */
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  $("page-" + id).classList.add("active");
  document.querySelectorAll(".sb-item[data-page]").forEach(i =>
    i.classList.toggle("active", i.dataset.page === id)
  );
  state.currentPage = id;
  if (id === "feed")    renderFeed();
  if (id === "chefs")   renderChefs();
  if (id === "saved")   renderSaved();
  if (id === "prefs")   renderPrefs();
  if (id === "profile") renderMyProfile();
}

/* ═══════════════════════════════════════════════════════
   TOPBAR & SIDEBAR
═══════════════════════════════════════════════════════ */
function updateTopbar() {
  $("topbar-username").textContent = state.displayName || state.username;
  $("topbar-av").textContent       = state.avatar;
}

function renderSidebarFollowing() {
  const followed = CHEFS.filter(c => state.follows[c.id]);
  const wrap = $("sb-following");
  const list = $("sb-followed-list");
  wrap.classList.toggle("hidden", followed.length === 0);
  list.innerHTML = "";
  followed.forEach(c => {
    const row = mk("div","sb-chef",`
      <div class="sb-chef-av">${c.emoji}</div>
      <div class="sb-chef-name">${c.name}</div>
    `);
    row.addEventListener("click", () => openChefPanel(c.id));
    list.appendChild(row);
  });
}

/* ═══════════════════════════════════════════════════════
   FEED PAGE
═══════════════════════════════════════════════════════ */
function renderFeed() {
  const search    = ($("search-input").value || "").toLowerCase().trim();
  const followIds = Object.keys(state.follows).filter(k => state.follows[k]);
  let list        = [...RECIPES];

  if (search) {
    list = list.filter(r =>
      r.title.toLowerCase().includes(search) ||
      r.cuisine.toLowerCase().includes(search) ||
      CHEFS.find(c => c.id === r.chefId)?.name.toLowerCase().includes(search)
    );
  }

  if (state.feedDiff !== "all") list = list.filter(r => r.difficulty === state.feedDiff);

  if (state.feedTab === "following") {
    list = list.filter(r => followIds.includes(r.chefId));
  } else if (state.feedTab === "liked") {
    list = list.filter(r => !!state.likes[r.id]);
  } else if (state.userStyles.length > 0) {
    list.sort((a,b) => {
      const score = r => (followIds.includes(r.chefId)?10:0) + r.styles.filter(s=>state.userStyles.includes(s)).length;
      return score(b) - score(a);
    });
  }

  $("feed-title").textContent = state.feedTab === "liked" ? "Liked Recipes" : state.feedTab === "following" ? "Your Feed" : `Hey, ${state.displayName || state.username} 👋`;

  const hasTastes  = state.userStyles.length > 0;
  const hasFollows = followIds.length > 0;
  const banner     = $("curated-banner");
  if (hasTastes && state.feedTab === "foryou") {
    banner.classList.remove("hidden");
    const labels = state.userStyles.slice(0,3).map(id => COOKING_STYLES.find(s=>s.id===id)?.label).filter(Boolean).join(", ");
    $("curated-text").textContent = "Based on your love of " + labels;
  } else {
    banner.classList.add("hidden");
  }

  $("feed-sub").textContent = state.feedTab === "liked"
    ? `${Object.values(state.likes).filter(Boolean).length} liked recipes`
    : hasTastes && hasFollows && state.feedTab === "foryou"
    ? `Curated from ${state.userStyles.length} style picks & ${followIds.length} followed chefs`
    : "";

  renderRecipeGrid("feed-grid","feed-empty", list,
    state.feedTab === "following" ? "👨‍🍳" : "🔍",
    state.feedTab === "following" ? "No recipes yet" : state.feedTab === "liked" ? "No liked recipes" : "No results",
    state.feedTab === "following" ? "Follow chefs to see their recipes" : "Try a different filter");
}

/* ═══════════════════════════════════════════════════════
   RECIPE GRID RENDERER (reused across pages)
═══════════════════════════════════════════════════════ */
function renderRecipeGrid(gridId, emptyId, recipes, emptyIcon, emptyTitle, emptyText) {
  const grid  = $(gridId);
  const empty = $(emptyId);
  grid.innerHTML = "";

  if (!recipes.length) {
    empty.classList.remove("hidden");
    empty.querySelector(".ei").textContent = emptyIcon;
    empty.querySelector("h3").textContent  = emptyTitle;
    empty.querySelector("p").textContent   = emptyText;
    return;
  }
  empty.classList.add("hidden");

  recipes.forEach(r => {
    const chef    = CHEFS.find(c => c.id === r.chefId);
    const isLiked = !!state.likes[r.id];
    const isSaved = !!state.saved[r.id];
    const count   = state.likeCounts[r.id] ?? r.likes;

    const card = mk("div","recipe-card");
    card.innerHTML = `
      <div class="rc-img">
        <img src="${r.image}" alt="${r.title}" loading="lazy" />
        <span class="rc-badge badge-${r.difficulty}">${r.difficulty}</span>
        <button class="rc-save-btn" title="${isSaved?'Unsave':'Save'}">${isSaved?"📌":"🔖"}</button>
      </div>
      <div class="rc-body">
        <div class="rc-title">${r.title}</div>
        <div class="rc-desc">${r.desc}</div>
        <div class="rc-meta"><span>⏱ ${r.time}m</span><span>⭐ ${r.rating}</span><span>🍽 ${r.cuisine}</span></div>
        <div class="rc-footer">
          <div class="rc-chef" title="View chef profile">
            <div class="rc-chef-av">${chef?.emoji||""}</div>${chef?.name||""}
          </div>
          <button class="like-btn${isLiked?" liked":""}">
            ${isLiked?"❤️":"🤍"} ${fmt(count)}
          </button>
        </div>
      </div>`;

    card.querySelector(".rc-save-btn").addEventListener("click", e => {
      e.stopPropagation(); doSave(r.id);
      e.currentTarget.textContent = state.saved[r.id] ? "📌" : "🔖";
    });
    card.querySelector(".like-btn").addEventListener("click", e => {
      e.stopPropagation(); doLike(r.id, r.likes);
      const btn = e.currentTarget;
      const liked = !!state.likes[r.id];
      btn.className = "like-btn"+(liked?" liked":"");
      btn.innerHTML = (liked?"❤️":"🤍")+" "+fmt(state.likeCounts[r.id]??r.likes);
    });
    card.querySelector(".rc-chef").addEventListener("click", e => {
      e.stopPropagation(); openChefPanel(r.chefId);
    });
    card.addEventListener("click", () => openRecipeModal(r.id));
    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════════════
   LIKE / SAVE / FOLLOW
═══════════════════════════════════════════════════════ */
function doLike(recipeId, baseLikes) {
  const wasLiked   = !!state.likes[recipeId];
  state.likes[recipeId]      = !wasLiked;
  const prev = state.likeCounts[recipeId] ?? baseLikes;
  state.likeCounts[recipeId] = wasLiked ? prev-1 : prev+1;
  toast(wasLiked ? "💔 Removed from likes" : "❤️ Liked!");
  syncStats();
}

function doSave(recipeId) {
  state.saved[recipeId] = !state.saved[recipeId];
  toast(state.saved[recipeId] ? "🔖 Saved!" : "Removed from saved");
  syncStats();
}

function doFollow(chefId) {
  const wasFollowing     = !!state.follows[chefId];
  state.follows[chefId]  = !wasFollowing;
  state.followDelta[chefId] = (state.followDelta[chefId]||0) + (wasFollowing?-1:1);
  const chef = CHEFS.find(c=>c.id===chefId);
  toast(wasFollowing ? `Unfollowed ${chef?.name}` : `✅ Following ${chef?.name}`);
  renderSidebarFollowing();
  syncStats();
}

function syncStats() {
  // update saved page stats if visible
  const sv = Object.values(state.saved).filter(Boolean).length;
  const lk = Object.values(state.likes).filter(Boolean).length;
  const fo = Object.keys(state.follows).filter(k=>state.follows[k]).length;
  const els = { "stat-saved":sv, "stat-liked":lk, "stat-following":fo,
                "pstat-saved":sv, "pstat-following":fo, "pstat-liked":lk };
  Object.entries(els).forEach(([id,v]) => { const el=$(id); if(el) el.textContent=v; });
}

/* ═══════════════════════════════════════════════════════
   RECIPE MODAL
═══════════════════════════════════════════════════════ */
function openRecipeModal(recipeId) {
  const r    = RECIPES.find(r=>r.id===recipeId);
  const chef = CHEFS.find(c=>c.id===r.chefId);

  $("modal-img").src             = r.image;
  $("modal-title").textContent   = r.title;
  $("modal-desc").textContent    = r.desc;
  $("modal-meta").innerHTML      = `<span>⏱ <strong>${r.time} min</strong></span><span>⭐ <strong>${r.rating}</strong></span><span>📊 <strong>${r.difficulty}</strong></span><span>🌍 <strong>${r.cuisine}</strong></span>`;
  $("modal-ing").innerHTML       = r.ingredients.map(i=>`<span class="ing-tag">${i}</span>`).join("");
  $("modal-steps").innerHTML     = r.steps.map((s,i)=>`<li><div class="step-n">${i+1}</div><div class="step-t">${s}</div></li>`).join("");
  $("modal-chef-av").textContent = chef?.emoji||"";
  $("modal-chef-name").textContent = chef?.name||"";

  const followerCount = (chef?.followers||0) + (state.followDelta[chef?.id]||0);
  $("modal-chef-followers").textContent = fmt(followerCount)+" followers";
  $("modal-chef-click").dataset.chefId  = chef?.id||"";

  refreshModalButtons(r);
  $("recipe-modal").classList.remove("hidden");

  $("modal-like-btn").onclick = () => { doLike(r.id, r.likes); refreshModalButtons(r); };
  $("modal-follow-btn").onclick = () => {
    doFollow(r.chefId);
    refreshModalButtons(r);
    const newCount = (chef?.followers||0)+(state.followDelta[chef?.id]||0);
    $("modal-chef-followers").textContent = fmt(newCount)+" followers";
  };
}

function refreshModalButtons(r) {
  const isLiked    = !!state.likes[r.id];
  const isFollowing = !!state.follows[r.chefId];
  const count       = state.likeCounts[r.id] ?? r.likes;

  const lb = $("modal-like-btn");
  lb.className = "btn-mlike"+(isLiked?" liked":"");
  lb.innerHTML = (isLiked?"❤️":"🤍")+` <span>${fmt(count)}</span>`;

  const fb = $("modal-follow-btn");
  fb.textContent = isFollowing ? "✓ Following" : "+ Follow";
  fb.className   = "btn-mfollow"+(isFollowing?" following":"");
}

function closeRecipeModal() { $("recipe-modal").classList.add("hidden"); }

/* ═══════════════════════════════════════════════════════
   CHEF PROFILE PANEL
═══════════════════════════════════════════════════════ */
function openChefPanel(chefId) {
  const chef      = CHEFS.find(c=>c.id===chefId);
  if (!chef) return;

  const isFollowing   = !!state.follows[chefId];
  const followerCount = chef.followers + (state.followDelta[chefId]||0);
  const chefRecipes   = RECIPES.filter(r=>r.chefId===chefId);

  $("cp-av").textContent         = chef.emoji;
  $("cp-name").textContent       = chef.name;
  $("cp-specialty").textContent  = chef.specialty;
  $("cp-bio").textContent        = chef.bio;
  $("cp-followers").textContent  = fmt(followerCount);
  $("cp-recipes-count").textContent = chefRecipes.length;

  // Follow button
  const actions = $("cp-actions");
  actions.innerHTML = "";
  const followBtn = mk("button", `chef-panel-follow-btn ${isFollowing?"flw":"nflw"}`,
    isFollowing ? "✓ Following" : "+ Follow Chef");
  followBtn.addEventListener("click", () => {
    doFollow(chefId);
    const nowFollowing = !!state.follows[chefId];
    followBtn.textContent = nowFollowing ? "✓ Following" : "+ Follow Chef";
    followBtn.className   = `chef-panel-follow-btn ${nowFollowing?"flw":"nflw"}`;
    const newCount = chef.followers + (state.followDelta[chefId]||0);
    $("cp-followers").textContent = fmt(newCount);
  });
  actions.appendChild(followBtn);

  // Chef's recipes
  const grid  = $("cp-recipe-grid");
  const empty = $("cp-empty");
  grid.innerHTML = "";
  if (!chefRecipes.length) {
    empty.classList.remove("hidden");
  } else {
    empty.classList.add("hidden");
    chefRecipes.forEach(r => {
      const isLiked = !!state.likes[r.id];
      const count   = state.likeCounts[r.id] ?? r.likes;
      const card = mk("div","recipe-card");
      card.innerHTML = `
        <div class="rc-img">
          <img src="${r.image}" alt="${r.title}" loading="lazy"/>
          <span class="rc-badge badge-${r.difficulty}">${r.difficulty}</span>
          <button class="rc-save-btn">${state.saved[r.id]?"📌":"🔖"}</button>
        </div>
        <div class="rc-body">
          <div class="rc-title">${r.title}</div>
          <div class="rc-desc">${r.desc}</div>
          <div class="rc-meta"><span>⏱ ${r.time}m</span><span>⭐ ${r.rating}</span></div>
          <div class="rc-footer">
            <div></div>
            <button class="like-btn${isLiked?" liked":""}">${isLiked?"❤️":"🤍"} ${fmt(count)}</button>
          </div>
        </div>`;
      card.querySelector(".rc-save-btn").addEventListener("click", e => {
        e.stopPropagation(); doSave(r.id);
        e.currentTarget.textContent = state.saved[r.id]?"📌":"🔖";
      });
      card.querySelector(".like-btn").addEventListener("click", e => {
        e.stopPropagation(); doLike(r.id, r.likes);
        const btn = e.currentTarget;
        const liked = !!state.likes[r.id];
        btn.className = "like-btn"+(liked?" liked":"");
        btn.innerHTML = (liked?"❤️":"🤍")+" "+fmt(state.likeCounts[r.id]??r.likes);
      });
      card.addEventListener("click", () => {
        closeChefPanel();
        setTimeout(() => openRecipeModal(r.id), 200);
      });
      grid.appendChild(card);
    });
  }

  $("chef-panel-overlay").classList.remove("hidden");
}

function closeChefPanel() { $("chef-panel-overlay").classList.add("hidden"); }

/* ═══════════════════════════════════════════════════════
   CHEFS PAGE
═══════════════════════════════════════════════════════ */
function renderChefs() {
  const search = ($("chefs-search").value||"").toLowerCase().trim();
  const grid   = $("chefs-grid");
  grid.innerHTML = "";

  const list = CHEFS.filter(c =>
    !search ||
    c.name.toLowerCase().includes(search) ||
    c.specialty.toLowerCase().includes(search)
  );

  list.forEach(c => {
    const isFollowing   = !!state.follows[c.id];
    const followerCount = c.followers + (state.followDelta[c.id]||0);
    const recipeCount   = RECIPES.filter(r=>r.chefId===c.id).length;

    const card = mk("div","chef-card");
    card.innerHTML = `
      <div class="cc-top">
        <div class="cc-av">${c.emoji}</div>
        <div class="cc-info"><h3>${c.name}</h3><div class="sp">${c.specialty}</div></div>
      </div>
      <div class="cc-bio">${c.bio}</div>
      <div class="cc-stats">
        <div class="cc-stat"><span>${fmt(followerCount)}</span><p>Followers</p></div>
        <div class="cc-stat"><span>${recipeCount}</span><p>Recipes</p></div>
      </div>
      <button class="follow-btn ${isFollowing?"flw":"nflw"}">${isFollowing?"✓ Following":"+ Follow"}</button>`;

    // Clicking the card (not the follow button) opens chef panel
    card.addEventListener("click", e => {
      if (!e.target.classList.contains("follow-btn")) openChefPanel(c.id);
    });

    card.querySelector(".follow-btn").addEventListener("click", e => {
      e.stopPropagation();
      doFollow(c.id);
      renderChefs();
    });

    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════════════
   SAVED PAGE
═══════════════════════════════════════════════════════ */
function renderSaved() {
  syncStats();
  const list = RECIPES.filter(r=>!!state.saved[r.id]);
  renderRecipeGrid("saved-grid","saved-empty", list, "🔖","Nothing saved yet","Hit the bookmark on any recipe");
}

/* ═══════════════════════════════════════════════════════
   PREFS PAGE
═══════════════════════════════════════════════════════ */
function renderPrefs() {
  buildPrefGrid("prefs-style-grid", COOKING_STYLES, state.userStyles, "style-card",
    s => `<span class="sc-icon">${s.icon}</span><div class="sc-label">${s.label}</div><div class="sc-desc">${s.desc}</div>`,
    "prefs-style-count"
  );
  buildPrefGrid("prefs-diet-grid", DIETS, state.userDiets, "diet-card",
    d => `<span class="di">${d.icon}</span><div><div class="dl">${d.label}</div><div class="dd">${d.desc}</div></div>`,
    "prefs-diet-count"
  );
}

function buildPrefGrid(gridId, items, selected, cardClass, tplFn, countId) {
  const grid = $(gridId);
  grid.innerHTML = "";
  items.forEach(item => {
    const isSel = selected.includes(item.id);
    const card  = mk("div", cardClass+(isSel?" sel":""), tplFn(item));
    card.dataset.id = item.id;
    if (isSel) addCheck(card);
    card.addEventListener("click", () => {
      card.classList.toggle("sel");
      if (card.classList.contains("sel")) addCheck(card); else removeCheck(card);
      const count = grid.querySelectorAll(".sel").length;
      $(countId).textContent = count ? `(${count} selected)` : "";
    });
    grid.appendChild(card);
  });
  const count = selected.length;
  $(countId).textContent = count ? `(${count} selected)` : "";
}

/* ═══════════════════════════════════════════════════════
   MY PROFILE PAGE
═══════════════════════════════════════════════════════ */
function renderMyProfile() {
  $("my-profile-av").textContent   = state.avatar;
  $("my-profile-name").textContent = state.displayName || state.username;
  $("my-profile-username").textContent = "@"+(state.username||"chef");
  $("my-profile-bio").textContent  = state.bio || "Passionate home cook";

  // taste tags
  const tags = $("profile-taste-tags");
  tags.innerHTML = "";
  state.userStyles.slice(0,5).forEach(id => {
    const s = COOKING_STYLES.find(cs=>cs.id===id);
    if (s) { const t=mk("span","profile-tag",s.icon+" "+s.label); tags.appendChild(t); }
  });

  syncStats();

  // Reset to saved tab
  document.querySelectorAll(".profile-tab").forEach(b=>b.classList.remove("active"));
  document.querySelector('.profile-tab[data-ptab="saved"]').classList.add("active");
  state.profileTab = "saved";
  renderMyProfileContent();
}

function renderMyProfileContent() {
  const grid    = $("my-profile-grid");
  const empty   = $("my-profile-empty");
  const tastes  = $("profile-tastes-content");

  grid.classList.remove("hidden");
  tastes.classList.add("hidden");
  empty.classList.add("hidden");

  if (state.profileTab === "tastes") {
    grid.classList.add("hidden");
    tastes.classList.remove("hidden");

    // Styles cloud
    const sc = $("profile-styles-cloud");
    sc.innerHTML = "";
    if (state.userStyles.length) {
      state.userStyles.forEach(id => {
        const s = COOKING_STYLES.find(cs=>cs.id===id);
        if (s) sc.appendChild(mk("span","tag-cloud-item",s.icon+" "+s.label));
      });
    } else {
      sc.appendChild(mk("span","tag-cloud-item","No styles selected yet"));
    }

    // Diets cloud
    const dc = $("profile-diets-cloud");
    dc.innerHTML = "";
    if (state.userDiets.length) {
      state.userDiets.forEach(id => {
        const d = DIETS.find(di=>di.id===id);
        if (d) dc.appendChild(mk("span","tag-cloud-item",d.icon+" "+d.label));
      });
    } else {
      dc.appendChild(mk("span","tag-cloud-item","No dietary preferences set"));
    }
    return;
  }

  const list = state.profileTab === "liked"
    ? RECIPES.filter(r=>!!state.likes[r.id])
    : RECIPES.filter(r=>!!state.saved[r.id]);

  if (!list.length) {
    grid.classList.add("hidden");
    empty.classList.remove("hidden");
    empty.querySelector(".ei").textContent = state.profileTab==="liked" ? "❤️" : "🔖";
    empty.querySelector("h3").textContent  = state.profileTab==="liked" ? "No liked recipes" : "No saved recipes";
    empty.querySelector("p").textContent   = "Start exploring recipes";
    return;
  }

  grid.innerHTML = "";
  list.forEach(r => {
    const chef    = CHEFS.find(c=>c.id===r.chefId);
    const isLiked = !!state.likes[r.id];
    const count   = state.likeCounts[r.id]??r.likes;
    const card = mk("div","recipe-card");
    card.innerHTML = `
      <div class="rc-img">
        <img src="${r.image}" alt="${r.title}" loading="lazy"/>
        <span class="rc-badge badge-${r.difficulty}">${r.difficulty}</span>
        <button class="rc-save-btn">${state.saved[r.id]?"📌":"🔖"}</button>
      </div>
      <div class="rc-body">
        <div class="rc-title">${r.title}</div>
        <div class="rc-desc">${r.desc}</div>
        <div class="rc-meta"><span>⏱ ${r.time}m</span><span>⭐ ${r.rating}</span><span>🍽 ${r.cuisine}</span></div>
        <div class="rc-footer">
          <div class="rc-chef"><div class="rc-chef-av">${chef?.emoji||""}</div>${chef?.name||""}</div>
          <button class="like-btn${isLiked?" liked":""}">${isLiked?"❤️":"🤍"} ${fmt(count)}</button>
        </div>
      </div>`;
    card.querySelector(".rc-save-btn").addEventListener("click", e => {
      e.stopPropagation(); doSave(r.id);
      e.currentTarget.textContent = state.saved[r.id]?"📌":"🔖";
      renderMyProfileContent();
    });
    card.querySelector(".like-btn").addEventListener("click", e => {
      e.stopPropagation(); doLike(r.id, r.likes);
      const btn=e.currentTarget, liked=!!state.likes[r.id];
      btn.className="like-btn"+(liked?" liked":"");
      btn.innerHTML=(liked?"❤️":"🤍")+" "+fmt(state.likeCounts[r.id]??r.likes);
      if (state.profileTab==="liked") renderMyProfileContent();
    });
    card.querySelector(".rc-chef").addEventListener("click", e => {
      e.stopPropagation(); openChefPanel(r.chefId);
    });
    card.addEventListener("click", () => openRecipeModal(r.id));
    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════════════
   EDIT PROFILE MODAL
═══════════════════════════════════════════════════════ */
function buildAvatarPicker() {
  const container = $("avatar-options");
  container.innerHTML = "";
  AVATARS.forEach(av => {
    const opt = mk("div","av-opt"+(av===state.avatar?" sel":""), av);
    opt.addEventListener("click", () => {
      document.querySelectorAll(".av-opt").forEach(o=>o.classList.remove("sel"));
      opt.classList.add("sel");
      state.editAvatar = av;
      $("edit-av-current").textContent = av;
    });
    container.appendChild(opt);
  });
}

function openEditModal() {
  state.editAvatar = state.avatar;
  $("edit-name").value     = state.displayName;
  $("edit-username").value = state.username;
  $("edit-bio").value      = state.bio;
  $("edit-av-current").textContent = state.avatar;
  // refresh picker selection
  document.querySelectorAll(".av-opt").forEach(o => {
    o.classList.toggle("sel", o.textContent === state.avatar);
  });
  $("edit-modal").classList.remove("hidden");
}

function saveProfile() {
  const name = $("edit-name").value.trim();
  const user = $("edit-username").value.trim();
  const bio  = $("edit-bio").value.trim();
  if (!name || !user) { toast("⚠️ Name and username are required"); return; }

  state.displayName = name;
  state.username    = user;
  state.bio         = bio || "Passionate home cook";
  state.avatar      = state.editAvatar || state.avatar;

  updateTopbar();
  renderMyProfile();
  $("edit-modal").classList.add("hidden");
  toast("✅ Profile updated!");
}
