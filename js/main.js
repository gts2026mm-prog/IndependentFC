/* ============================================================
   INDEPENDENT FOOTBALL CLUB — Site Scripts
   Handles responsive nav, data rendering, countdown, forms.
   ============================================================ */
(function () {
  "use strict";

  var data = window.IFC || {};
  var DOM = {};

  /* ---------- Helpers ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(str) {
    return String(str).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  var REAL_LOGOS = [
    "riverside-athletic", "harbour-city", "eastgate-united", "northbridge-town",
    "windsor-wanderers", "kingsley-city", "milton-rovers", "stonebridge", "iron-works"
  ];
  function crestSrc(name) {
    if (name === data.club.name || name === data.club.short) return "assets/img/crest.png";
    var s = slug(name);
    return REAL_LOGOS.indexOf(s) !== -1 ? "assets/img/clubs/" + s + ".png" : "assets/img/clubs/" + s + ".svg";
  }
  function crestFor(name) {
    var src = crestSrc(name);
    return '<span class="team-c"><img class="mini-crest" src="' + src + '" alt="' + esc(name) + '" loading="lazy" onerror="this.style.display=\'none\'"><b>' + esc(name) + '</b></span>';
  }
  function crestForHero(name) {
    var src = crestSrc(name);
    return '<span class="hmatch__crest"><img src="' + src + '" alt="' + esc(name) + '" onerror="this.style.display=\'none\'"><b>' + esc(name) + '</b></span>';
  }

  /* ---------- SVG icon paths (brand socials + misc) ---------- */
  var ICONS = {
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
  };

  function socialLinksHTML() {
    var s = data.social || {};
    var out = [];
    if (s.facebook) out.push('<a href="' + esc(s.facebook) + '" aria-label="Facebook" target="_blank" rel="noopener">' + ICONS.facebook + '</a>');
    if (s.tiktok) out.push('<a href="' + esc(s.tiktok) + '" aria-label="TikTok" target="_blank" rel="noopener">' + ICONS.tiktok + '</a>');
    if (s.youtube) out.push('<a href="' + esc(s.youtube) + '" aria-label="YouTube" target="_blank" rel="noopener">' + ICONS.youtube + '</a>');
    return out.join("");
  }

  /* ---------- Mobile nav toggle ---------- */
  function initNav() {
    DOM.navToggle = $(".nav-toggle");
    DOM.nav = $("#siteNav");
    if (!DOM.navToggle || !DOM.nav) return;
    DOM.navToggle.addEventListener("click", function () {
      var open = DOM.nav.classList.toggle("is-open");
      DOM.navToggle.classList.toggle("is-open", open);
      DOM.navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Highlight current page in nav ---------- */
  function initActiveNav() {
    var path = location.pathname.split("/").pop() || "index.html";
    $$("#siteNav a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === path || (path === "" && href === "index.html")) {
        a.classList.add("is-active");
      }
    });
  }

  /* ---------- Inject social icons ---------- */
  function initSocials() {
    $$("[data-socials]").forEach(function (el) { el.innerHTML = socialLinksHTML(); });
  }

  /* ---------- Countdown ---------- */
  var cdTimer = null;
  function initCountdown() {
    var el = $("#countdown");
    if (!el || !data.nextFixture) return;
    if (cdTimer) clearInterval(cdTimer);
    var target = new Date(data.nextFixture.date).getTime();
    function pad(n) { return n < 10 ? "0" + n : "" + n; }
    function tick() {
      var diff = target - Date.now();
      if (diff < 0) { el.innerHTML = '<div class="countdown__unit"><b>' + t("cd_fulltime") + '</b></div>'; return; }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      el.innerHTML =
        '<div class="countdown__unit"><b>' + d + '</b><span>' + t("cd_days") + '</span></div>' +
        '<div class="countdown__unit"><b>' + pad(h) + '</b><span>' + t("cd_hours") + '</span></div>' +
        '<div class="countdown__unit"><b>' + pad(m) + '</b><span>' + t("cd_mins") + '</span></div>' +
        '<div class="countdown__unit"><b>' + pad(s) + '</b><span>' + t("cd_secs") + '</span></div>';
    }
    tick();
    cdTimer = setInterval(tick, 1000);
  }

  /* ---------- Hero match strip ---------- */
  function initHeroMatch() {
    var wrap = $("#heroMatch");
    if (!wrap) return;
    var r = data.latestResult;
    if (!r) return;
    var homeName = r.home ? data.club.short : r.opponent;
    var awayName = r.home ? r.opponent : data.club.short;
    var homeGoals = r.home ? r.homeGoals : r.awayGoals;
    var awayGoals = r.home ? r.awayGoals : r.homeGoals;
    wrap.innerHTML =
      '<div class="hmatch">' +
        '<div class="hmatch__label">' + t("hm_latest") + ' · ' + esc(r.competition) + '</div>' +
        '<div class="hmatch__score">' +
          '<div class="hmatch__team">' + crestForHero(homeName) + '</div>' +
          '<div class="hmatch__num">' + homeGoals + ' – ' + awayGoals + '</div>' +
          '<div class="hmatch__team">' + crestForHero(awayName) + '</div>' +
        '</div>' +
        '<div class="hmatch__meta">' + esc(r.venue) + ' · ' + esc(r.date) + '</div>' +
      '</div>' +
      '<div class="hmatch">' +
        '<div class="hmatch__label">' + t("hm_next") + ' · ' + esc(data.nextFixture.competition) + '</div>' +
        '<div class="hmatch__score">' +
          '<div class="hmatch__team">' + crestForHero(data.club.short) + '</div>' +
          '<div class="hmatch__num">' + t("cd_vs") + '</div>' +
          '<div class="hmatch__team">' + crestForHero(data.nextFixture.opponent) + '</div>' +
        '</div>' +
        '<div class="hmatch__meta">' + esc(data.nextFixture.venue) + ' · ' + esc(data.nextFixture.date) + '</div>' +
      '</div>';
  }

  /* ---------- Fixtures & results rendering ---------- */
  function renderFixtures() {
    var el = $("#fixturesList");
    if (!el) return;
    el.innerHTML = data.fixtures.map(function (f) {
      var homeName = f.home ? data.club.short : f.opp;
      var awayName = f.home ? f.opp : data.club.short;
      var venue = f.venue === (data.club.stadium) ? data.club.stadium : f.venue;
      return '<tr>' +
        '<td>' + esc(f.date) + '</td>' +
        '<td>' + esc(f.comp) + '</td>' +
        '<td class="team-cell">' + crestFor(homeName) + '<span class="vs">' + t("cd_vs") + '</span>' + crestFor(awayName) + '</td>' +
        '<td>' + esc(venue) + '</td>' +
        '<td><span class="badge-live">' + t("badge_upcoming") + '</span></td>' +
      '</tr>';
    }).join("");
  }

  function renderResults() {
    var el = $("#resultsList");
    if (!el) return;
    el.innerHTML = data.results.map(function (r) {
      var homeName = r.home ? data.club.short : r.opp;
      var awayName = r.home ? r.opp : data.club.short;
      var cls = r.result === "W" ? "result--win" : r.result === "L" ? "result--loss" : "result--draw";
      var homeGoals = r.home ? r.for : r.against;
      var awayGoals = r.home ? r.against : r.for;
      var scorers = (r.scorers && r.scorers.length) ? r.scorers.join(", ") : "—";
      return '<tr>' +
        '<td>' + esc(r.date) + '</td>' +
        '<td>' + esc(r.comp) + '</td>' +
        '<td class="team-cell">' + crestFor(homeName) + '</td>' +
        '<td class="result ' + cls + '">' + homeGoals + ' – ' + awayGoals + '</td>' +
        '<td class="team-cell">' + crestFor(awayName) + '</td>' +
        '<td>' + esc(scorers) + '</td>' +
      '</tr>';
    }).join("");
  }

  function renderTable() {
    var el = $("#leagueTable");
    if (!el) return;
    el.innerHTML = data.table.map(function (row) {
      var cls = row.team === data.club.name ? ' style="background:var(--gold-100);font-weight:700;"' : "";
      return '<tr' + cls + '>' +
        '<td class="pos">' + row.pos + '</td>' +
        '<td class="team-cell">' + crestFor(row.team) + '</td>' +
        '<td>' + row.p + '</td><td>' + row.w + '</td><td>' + row.d + '</td><td>' + row.l + '</td>' +
        '<td>' + row.gf + '</td><td>' + row.ga + '</td><td>' + (row.gf - row.ga) + '</td>' +
        '<td><strong>' + row.pts + '</strong></td>' +
      '</tr>';
    }).join("");
  }

  /* ---------- Squad rendering ---------- */
  var POS_KEY = { Goalkeeper: "pos_gk", Defender: "pos_def", Midfielder: "pos_mid", Forward: "pos_fwd" };
  function renderSquad() {
    var el = $("#squadGrid");
    if (!el) return;
    el.innerHTML = data.squad.map(function (p) {
      var captain = p.captain ? ' <span style="color:var(--gold-600);font-size:11px;">(C)</span>' : "";
      var art = (p.pos === "Goalkeeper") ? "assets/img/players/player-gk.svg" : "assets/img/players/player-" + ((p.num - 1) % 10) + ".svg";
      var posTxt = t(POS_KEY[p.pos] || "pos_mid");
      return '<div class="player">' +
        '<div class="player__photo"><img src="' + art + '" alt="' + esc(p.name) + '"><span class="player__number">' + p.num + '</span></div>' +
        '<div class="player__name">' + esc(p.name) + captain + '</div>' +
        '<div class="player__pos">' + esc(posTxt) + '</div>' +
        '<div class="player__stats">' +
          '<div><b>' + p.age + '</b>' + t("st_age") + '</div>' +
          '<div><b>' + p.apps + '</b>' + t("st_apps") + '</div>' +
          '<div><b>' + p.goals + '</b>' + t("st_goals") + '</div>' +
        '</div>' +
      '</div>';
    }).join("");
  }

  /* ---------- Membership rendering ---------- */
  var TIER_PREFIX = ["mem_a", "mem_b", "mem_c"];
  function renderMembership() {
    var el = $("#membershipGrid");
    if (!el || !data.membership) return;
    el.innerHTML = data.membership.map(function (m, mi) {
      var pre = TIER_PREFIX[mi % TIER_PREFIX.length] || "mem_a";
      var feats = m.features.map(function (f, fi) {
        return '<li>' + ICONS.check + esc(t(pre + "_" + fi)) + '</li>';
      }).join("");
      return '<div class="card price-card' + (m.featured ? ' is-featured' : '') + '">' +
        '<div class="card__body">' +
          '<h3>' + esc(m.name) + '</h3>' +
          '<div class="price">' + esc(m.price) + '<span>' + t("per_month") + '</span></div>' +
          '<ul>' + feats + '</ul>' +
          '<a href="contact.html" class="btn ' + (m.featured ? 'btn--gold' : 'btn--outline') + '">' + t("join_now") + '</a>' +
        '</div>' +
      '</div>';
    }).join("");
  }

  /* ---------- Featured partner rendering ---------- */
  function renderPartner() {
    var el = $("#partnerFeature");
    if (!el || !data.partner) return;
    var p = data.partner;
    el.innerHTML =
      '<div class="partner-card">' +
        '<a class="partner-card__logo" href="' + esc(p.link) + '" target="_blank" rel="noopener">' +
          '<img src="' + esc(p.logo) + '" alt="' + esc(t("ptitle")) + '">' +
        '</a>' +
        '<div class="partner-card__body">' +
          '<span class="tag">' + t("ptag") + '</span>' +
          '<h3>' + t("ptitle") + '</h3>' +
          '<p>' + t("partner_desc") + '</p>' +
          '<a class="card__link" href="' + esc(p.link) + '" target="_blank" rel="noopener">' + t("pvisit") + '</a>' +
        '</div>' +
      '</div>';
  }

  /* ---------- Forms ---------- */
  function initForms() {
    $$("form[data-newsletter], form[data-contact]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var success = form.querySelector(".form-success");
        if (success) success.classList.add("is-visible");
        form.reset();
        if (form.getAttribute("data-newsletter")) {
          var btn = form.querySelector("button[type=submit]");
          if (btn) { var t = btn.textContent; btn.textContent = "Subscribed ✓"; setTimeout(function () { btn.textContent = t; }, 3000); }
        }
      });
    });
  }

  /* ---------- Build & init ---------- */
  function reRender() {
    initCountdown();
    initHeroMatch();
    renderFixtures();
    renderResults();
    renderTable();
    renderSquad();
    renderMembership();
    renderPartner();
  }

  function init() {
    initNav();
    initActiveNav();
    initSocials();
    reRender();
    initForms();
    document.addEventListener("ifc:langchange", reRender);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
