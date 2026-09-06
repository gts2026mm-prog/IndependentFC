/* ============================================================
   INDEPENDENT FOOTBALL CLUB — Admin panel
   Unlock with a password, edit data, download updated data.js.
   Give the downloaded file to the developer to push live.
   ============================================================ */
(function () {
  "use strict";

  var ADMIN_PASS = "ifc2026";
  var data = null;
  var dirty = false;

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* ==================== Toast + dirty tracking ==================== */
  var toastTimer = null;
  function toast(text, kind) {
    var el = $("#toast");
    el.textContent = text;
    el.className = "ad-toast show" + (kind === "err" ? " err" : kind === "ok" ? " ok" : "");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.className = "ad-toast"; }, 3400);
  }

  function markDirty() {
    dirty = true;
    var c = $("#dirtyChip");
    if (c) { c.classList.add("on"); c.textContent = "Unsaved changes"; }
  }
  function clearDirty() {
    dirty = false;
    var c = $("#dirtyChip");
    if (c) { c.classList.remove("on"); c.textContent = "All changes saved"; }
  }

  function watchDirty() {
    function onEdit(e) {
      if (!$("#dashView") || $("#dashView").classList.contains("hidden")) return;
      var t = e.target;
      if (t && t.closest("input, select, textarea")) markDirty();
    }
    document.addEventListener("input", onEdit);
    document.addEventListener("change", onEdit);
  }

  /* ==================== Sidebar navigation ==================== */
  var PAGE_TITLES = {
    overview: "Dashboard",
    club: "Club info",
    fixture: "Next fixture",
    latest: "Latest result",
    fixtures: "Fixtures",
    results: "Results",
    table: "League table",
    squad: "Squad",
    tiers: "Membership tiers",
    partner: "Partner",
    social: "Social links",
    json: "Raw JSON"
  };

  function initAdminNav() {
    $$(".admin-nav__link").forEach(function (a) {
      a.addEventListener("click", function () {
        var pane = a.getAttribute("data-pane");
        if (!pane) return;
        $$(".admin-nav__link").forEach(function (x) { x.classList.toggle("is-active", x === a); });
        $$(".admin-pane").forEach(function (p) {
          p.classList.toggle("is-active", p.getAttribute("data-pane") === pane);
        });
        var pt = $("#pageTitle");
        if (pt) pt.textContent = PAGE_TITLES[pane] || "Dashboard";
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  /* ==================== Unlock ==================== */
  function unlock() {
    if ($("#pass").value === ADMIN_PASS) {
      $("#unlockOverlay").classList.add("hidden");
      $("#dashView").classList.remove("hidden");
      setActivePane("overview");
      loadData();
    } else {
      $("#pass").value = "";
      toast("Wrong password. Try again.", "err");
    }
  }

  function setActivePane(name) {
    $$(".admin-nav__link").forEach(function (x) {
      x.classList.toggle("is-active", x.getAttribute("data-pane") === name);
    });
    $$(".admin-pane").forEach(function (p) {
      p.classList.toggle("is-active", p.getAttribute("data-pane") === name);
    });
    var pt = $("#pageTitle");
    if (pt) pt.textContent = PAGE_TITLES[name] || "Dashboard";
  }

  function lock() {
    $("#dashView").classList.add("hidden");
    $("#unlockOverlay").classList.remove("hidden");
    $("#pass").value = "";
    data = null;
    clearDirty();
  }

  function loadData() {
    toast("Loading data…");
    fetch("js/data.js").then(function (r) { return r.text(); }).then(function (code) {
      try { eval(code); } catch (e) { /* idempotent assignments */ }
      data = window.IFC || {};
      if (!data.club) throw new Error("data.js did not produce the expected structure");
      renderAll();
      clearDirty();
      toast("Data loaded. Edit the forms, then download.", "ok");
    }).catch(function (e) {
      toast("Could not load js/data.js — " + e.message, "err");
    });
  }

  /* ==================== Simple bound forms ==================== */
  function field(key, label, type, obj) {
    var val = (obj && obj[key]) != null ? obj[key] : "";
    if (type === "check") {
      return '<div class="field" style="margin:6px 0 0;"><label style="display:flex;align-items:center;gap:8px;font-weight:700;">' +
        '<input type="checkbox" data-bind="' + key + '"' + (val ? " checked" : "") + '> ' + esc(label) + '</label></div>';
    }
    return '<div class="field"><label for="b_' + key + '">' + esc(label) + '</label>' +
      '<input id="b_' + key + '" type="' + type + '" value="' + esc(val) + '" data-bind="' + key + '"' +
      (type === "number" ? ' step="any"' : "") + '></div>';
  }

  function renderBoundForm(sel, obj, fields) {
    var html = "";
    fields.forEach(function (f) { html += field(f[0], f[1], f[2]); });
    $(sel).innerHTML = html;
  }

  function gatherBound(container, target) {
    $$("[data-bind]", container).forEach(function (el) {
      var key = el.getAttribute("data-bind");
      var v = el.type === "checkbox" ? el.checked : el.value;
      target[key] = el.type === "number" ? (el.value === "" ? null : parseFloat(el.value)) : v;
    });
  }

  function renderNext() {
    var d = data.nextFixture || {};
    var dateVal = (d.date || "").slice(0, 16);
    $("#nextForm").innerHTML =
      '<div class="field"><label>Home match</label><label style="display:flex;align-items:center;gap:8px;font-weight:700;"><input type="checkbox" id="b_nfHome"' + (d.home ? " checked" : "") + '> Home</label></div>' +
      '<div class="field"><label>Opponent</label><input type="text" id="b_nfOpponent" value="' + esc(d.opponent) + '"></div>' +
      '<div class="field"><label>Competition</label><input type="text" id="b_nfComp" value="' + esc(d.competition) + '"></div>' +
      '<div class="field"><label>Kick-off date &amp; time</label><input type="datetime-local" id="b_nfDate" value="' + esc(dateVal) + '"></div>' +
      '<div class="field"><label>Venue</label><input type="text" id="b_nfVenue" value="' + esc(d.venue) + '"></div>';
  }
  function gatherNext() {
    var d = data.nextFixture || (data.nextFixture = {});
    var v = $("#b_nfDate").value;
    if (v) d.date = v.length === 16 ? v + ":00" : v; else d.date = d.date || "";
    d.home = $("#b_nfHome").checked;
    d.opponent = $("#b_nfOpponent").value;
    d.competition = $("#b_nfComp").value;
    d.venue = $("#b_nfVenue").value;
  }

  function renderLatest() {
    var d = data.latestResult || {};
    $("#lateForm").innerHTML =
      '<div class="field"><label>Opponent</label><input type="text" id="b_lrOpponent" value="' + esc(d.opponent) + '"></div>' +
      '<div class="field"><label>Competition</label><input type="text" id="b_lrComp" value="' + esc(d.competition) + '"></div>' +
      '<div class="field"><label>Venue</label><input type="text" id="b_lrVenue" value="' + esc(d.venue) + '"></div>' +
      '<div class="field"><label>Date</label><input type="date" id="b_lrDate" value="' + esc(d.date || "") + '"></div>' +
      '<div class="field"><label>Goals for</label><input type="number" id="b_lrHg" value="' + esc(d.homeGoals) + '"></div>' +
      '<div class="field"><label>Goals against</label><input type="number" id="b_lrAg" value="' + esc(d.awayGoals) + '"></div>' +
      '<div class="field"><label>Scorers (comma separated)</label><input type="text" id="b_lrScorers" value="' + esc((d.scorers || []).join(", ")) + '"></div>';
  }
  function gatherLatest() {
    var d = data.latestResult || (data.latestResult = {});
    d.opponent = $("#b_lrOpponent").value;
    d.competition = $("#b_lrComp").value;
    d.venue = $("#b_lrVenue").value;
    d.date = $("#b_lrDate").value;
    d.homeGoals = parseInt($("#b_lrHg").value, 10) || 0;
    d.awayGoals = parseInt($("#b_lrAg").value, 10) || 0;
    d.played = true;
    d.scorers = $("#b_lrScorers").value.split(",").map(function (x) { return x.trim(); }).filter(Boolean);
  }

  function renderPartner() {
    var p = data.partner || {};
    renderBoundForm("#partnerForm", p, [
      ["desc", "Description", "text"], ["logo", "Logo path", "text"], ["link", "Link URL", "text"]
    ]);
  }

  function renderSocial() {
    var s = data.social || {};
    renderBoundForm("#socialForm", s, [
      ["facebook", "Facebook URL", "url"], ["tiktok", "TikTok URL", "url"], ["youtube", "YouTube URL", "url"]
    ]);
    $("#socialForm").innerHTML += '<div class="field" style="grid-column:1/-1;"><label for="b_feedCode">Facebook Feed Embed Code</label><textarea id="b_feedCode" data-bind="feedCode">' + esc(s.feedCode || "") + '</textarea></div>';
  }

  /* ==================== Editable grids ==================== */
  var POSITIONS = ["Goalkeeper", "Defender", "Midfielder", "Forward"];
  var STATUSES = ["upcoming", "finished", "postponed"];
  var RESULTS = ["W", "D", "L"];

  var GRIDS = {
    fixtures: { card: "#fixturesCard", tbody: "fxBody", fields: [
      ["comp", "Competition", "text"], ["date", "Date", "text"], ["home", "Home", "check"],
      ["opp", "Opponent", "text"], ["venue", "Venue", "text"], ["status", "Status", "select-status"]
    ]},
    results: { card: "#resultsCard", tbody: "rsBody", fields: [
      ["comp", "Competition", "text"], ["date", "Date", "text"], ["home", "Home", "check"],
      ["opp", "Opponent", "text"], ["for", "For", "num"], ["against", "Against", "num"],
      ["result", "Res", "select-result"], ["scorers", "Scorers (comma)", "text"]
    ]},
    table: { card: "#tableCard", tbody: "tbBody", fields: [
      ["pos", "Pos", "num"], ["team", "Team", "text"], ["p", "P", "num"], ["w", "W", "num"],
      ["d", "D", "num"], ["l", "L", "num"], ["gf", "GF", "num"], ["ga", "GA", "num"], ["pts", "Pts", "num"]
    ]},
    squad: { card: "#squadCard", tbody: "sqBody", fields: [
      ["num", "No.", "num"], ["name", "Name", "text"], ["age", "Age", "num"], ["pos", "Position", "select-pos"],
      ["apps", "Apps", "num"], ["goals", "Goals", "num"], ["assists", "Assists", "num"], ["captain", "C", "check"]
    ]}
  };

  function cellHTML(key, val, type) {
    var opts = [];
    if (type === "check") return '<td><input type="checkbox" data-f="' + key + '"' + (val ? " checked" : "") + '></td>';
    if (type === "select-pos") opts = POSITIONS;
    if (type === "select-status") opts = STATUSES;
    if (type === "select-result") opts = RESULTS;
    if (opts.length) {
      var h = '<td><select data-f="' + key + '">';
      opts.forEach(function (o) { h += '<option value="' + o + '"' + (String(val) === o ? " selected" : "") + '>' + o + '</option>'; });
      return h + "</select></td>";
    }
    return '<td><input type="' + (type === "num" ? "number" : "text") + '" data-f="' + key + '" value="' + esc(val) + '"></td>';
  }

  function gridRowHTML(row, fields) {
    var h = "<tr>";
    fields.forEach(function (f) {
      var v = row[f[0]];
      if (Array.isArray(v)) v = v.join(", ");
      h += cellHTML(f[0], v, f[2]);
    });
    h += '<td class="tiny"><button class="ad-btn-icon" type="button" data-del title="Remove row">✕</button></td></tr>';
    return h;
  }

  function renderGrid(key) {
    var g = GRIDS[key];
    var rows = data[key] || [];
    var h = '<div class="ad-tbl-wrap"><table class="ad-tbl"><thead><tr>';
    g.fields.forEach(function (f) { h += "<th>" + esc(f[1]) + "</th>"; });
    h += '<th></th></tr></thead><tbody id="' + g.tbody + '">';
    rows.forEach(function (r) { h += gridRowHTML(r, g.fields); });
    h += '</tbody></table></div><div class="ad-row-actions"><button class="btn btn--outline btn--sm" type="button" data-add-grid="' + key + '">+ Add row</button></div>';
    $(g.card).innerHTML = h;
  }

  function addGridRow(key) {
    var g = GRIDS[key];
    var tbody = g.tbody;
    var row = {};
    g.fields.forEach(function (f) {
      if (f[2] === "num") row[f[0]] = 0;
      else if (f[2] === "check") row[f[0]] = false;
      else if (f[2] === "select-status") row[f[0]] = "upcoming";
      else if (f[2] === "select-result") row[f[0]] = "W";
      else if (f[2] === "select-pos") row[f[0]] = "Midfielder";
      else row[f[0]] = "";
    });
    var tr = document.createElement("tr");
    tr.innerHTML = gridRowHTML(row, g.fields);
    $("#" + tbody).appendChild(tr);
    markDirty();
  }

  function serialGrid(key) {
    var g = GRIDS[key];
    var out = [];
    $$("#" + g.tbody + " tr").forEach(function (tr) {
      var row = {};
      g.fields.forEach(function (f) {
        var el = tr.querySelector('[data-f="' + f[0] + '"]');
        if (!el) return;
        var v = el.type === "checkbox" ? el.checked : el.value;
        if (f[2] === "num") {
          v = v === "" ? null : parseFloat(v);
          if (f[0] === "pos") v = parseInt(v, 10);
        } else if (f[0] === "scorers") {
          v = v.split(",").map(function (x) { return x.trim(); }).filter(Boolean);
        }
        row[f[0]] = v;
      });
      out.push(row);
    });
    return out;
  }

  /* ==================== Membership tiers ==================== */
  function renderMembership() {
    var tiers = data.membership || [];
    var h = '<div class="ad-tbl-wrap"><table class="ad-tbl"><thead><tr><th>Tier</th><th>Price</th><th>Per</th><th style="width:60px;">Featured</th><th>Features (comma)</th><th></th></tr></thead><tbody id="memBody">';
    tiers.forEach(function (t) {
      h += '<tr><td><input type="text" data-f="name" value="' + esc(t.name) + '"></td>' +
        '<td><input type="text" data-f="price" value="' + esc(t.price) + '"></td>' +
        '<td><input type="text" data-f="per" value="' + esc(t.per || "/ month") + '"></td>' +
        '<td><input type="checkbox" data-f="featured"' + (t.featured ? " checked" : "") + '></td>' +
        '<td><input type="text" data-f="features" value="' + esc((t.features || []).join(", ")) + '"></td>' +
        '<td class="tiny"><button class="ad-btn-icon" type="button" data-del title="Remove row">✕</button></td></tr>';
    });
    h += '</tbody></table></div><div class="ad-row-actions"><button class="btn btn--outline btn--sm" type="button" data-add-mem>+ Add tier</button></div>';
    $("#membershipCard").innerHTML = h;
  }

  function addMembershipRow() {
    var tr = document.createElement("tr");
    tr.innerHTML =
      '<td><input type="text" data-f="name" value=""></td>' +
      '<td><input type="text" data-f="price" value="THB "></td>' +
      '<td><input type="text" data-f="per" value="/ month"></td>' +
      '<td><input type="checkbox" data-f="featured"></td>' +
      '<td><input type="text" data-f="features" value=""></td>' +
      '<td class="tiny"><button class="ad-btn-icon" type="button" data-del title="Remove row">✕</button></td>';
    $("#memBody").appendChild(tr);
    markDirty();
  }

  function serialMembership() {
    var out = [];
    $$("#memBody tr").forEach(function (tr) {
      var row = {};
      ["name", "price", "per", "featured", "features"].forEach(function (f) {
        var el = tr.querySelector('[data-f="' + f + '"]');
        if (el) row[f] = el.type === "checkbox" ? el.checked : el.value;
      });
      row.features = String(row.features || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean);
      if (row.name || row.price) out.push(row);
    });
    return out;
  }

  /* ==================== Overview ==================== */
  function renderOverview() {
    var club = data.club || {};
    var nf = data.nextFixture || {};
    $("#ovClubName").textContent = club.name || "Independent FC";
    $("#ovMotto").textContent = club.motto || "Content manager";
    var tiles = [
      { v: club.short || club.name || "—", l: "Club" },
      { v: nf.opponent || "—", l: "Next match" },
      { v: (data.squad || []).length + " players", l: "Squad" },
      { v: (data.fixtures || []).length, l: "Fixtures listed" },
      { v: (data.results || []).length, l: "Results played" },
      { v: (data.membership || []).length, l: "Membership tiers" }
    ];
    $("#ovStats").innerHTML = tiles.map(function (t) {
      return '<div class="ad-stat"><b>' + esc(t.v) + '</b><span>' + esc(t.l) + '</span></div>';
    }).join("");
  }

  /* ==================== Render all ==================== */
  function renderAll() {
    renderOverview();
    renderBoundForm("#clubForm", data.club || {}, [
      ["name", "Club name", "text"], ["short", "Short", "text"], ["nickname", "Nickname", "text"],
      ["founded", "Founded", "number"], ["stadium", "Stadium", "text"], ["capacity", "Capacity", "text"],
      ["league", "League", "text"], ["colors", "Colors", "text"], ["motto", "Motto", "text"]
    ]);
    renderNext();
    renderLatest();
    Object.keys(GRIDS).forEach(function (k) { renderGrid(k); });
    renderMembership();
    renderPartner();
    renderSocial();
    var ta = $("#advanced");
    if (!ta.dataset.touched) ta.value = JSON.stringify(data, null, 2);
  }

  /* ==================== Build & download ==================== */
  function gatherAll() {
    gatherBound($("#clubForm"), data.club || {});
    gatherNext();
    gatherLatest();
    Object.keys(GRIDS).forEach(function (k) { data[k] = serialGrid(k); });
    data.membership = serialMembership();
    gatherBound($("#partnerForm"), data.partner || {});
    gatherBound($("#socialForm"), data.social || {});
  }

  function buildDataFile() {
    return "/* ============================================================\n" +
      "   INDEPENDENT FOOTBALL CLUB — Site Data\n" +
      "   Generated and published by the admin panel.\n" +
      "   ============================================================ */\n" +
      "window.IFC = window.IFC || {};\n\n" +
      "window.IFC = " + JSON.stringify(data, null, 2) + ";\n";
  }

  function download() {
    var ta = $("#advanced");
    if (ta.dataset.touched) {
      try {
        var parsed = JSON.parse(ta.value);
        if (!parsed || typeof parsed !== "object" || !parsed.club) throw new Error("missing top-level club object");
        data = parsed;
      } catch (e) {
        toast("Raw JSON is invalid — fix it or clear the box before downloading. (" + e.message + ")", "err");
        return;
      }
    } else {
      gatherAll();
      ta.value = JSON.stringify(data, null, 2);
    }
    var content = buildDataFile();
    var blob = new Blob([content], { type: "text/javascript;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.download = "data.js";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    ta.dataset.touched = "";
    clearDirty();
    toast("data.js downloaded. Send it to the dev to push live, or drop it into D:\\IndependentFC\\js\\data.js.", "ok");
  }

  /* ==================== Wire up ==================== */
  initAdminNav();
  watchDirty();
  $("#unlockBtn").addEventListener("click", unlock);
  $("#pass").addEventListener("keydown", function (e) { if (e.key === "Enter") unlock(); });
  [$("#downloadBtn"), $("#topDownloadBtn"), $("#heroDownloadBtn")].forEach(function (b) {
    if (b) b.addEventListener("click", download);
  });
  $("#lockBtn").addEventListener("click", lock);
  $("#advanced").addEventListener("input", function () { this.dataset.touched = "1"; });
  $("#advLoad").addEventListener("click", function () {
    gatherAll();
    $("#advanced").value = JSON.stringify(data, null, 2);
    $("#advanced").dataset.touched = "1";
    toast("Raw JSON synced from the forms.", "ok");
  });
  $("#advApply").addEventListener("click", function () {
    try {
      var parsed = JSON.parse($("#advanced").value);
      if (!parsed || typeof parsed !== "object" || !parsed.club) throw new Error("missing club object");
      data = parsed;
      renderAll();
      clearDirty();
      toast("Raw JSON applied to the editor.", "ok");
    } catch (e) {
      toast("Invalid JSON — " + e.message, "err");
    }
  });
  document.addEventListener("click", function (ev) {
    var addBtn = ev.target.closest("[data-add-grid]");
    if (addBtn) addGridRow(addBtn.getAttribute("data-add-grid"));
    var memBtn = ev.target.closest("[data-add-mem]");
    if (memBtn) addMembershipRow();
    var delBtn = ev.target.closest("[data-del]");
    if (delBtn) {
      var tr = delBtn.closest("tr");
      if (tr) { tr.parentNode.removeChild(tr); markDirty(); }
    }
  });
})();