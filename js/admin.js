/* ============================================================
   INDEPENDENT FOOTBALL CLUB — Admin panel
   Loads js/data.js from the repo, edits it in forms, and
   writes changes back to GitHub via the Contents API. The
   GitHub Pages site redeploys automatically after each push.
   ============================================================ */
(function () {
  "use strict";

  var API = "https://api.github.com/repos/";
  var DATA_PATH = "js/data.js";
  var TOKEN_KEY = "ifc_admin_token";
  var REPO_KEY = "ifc_admin_repo";

  var data = null;
  var repoSha = null;

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  function storeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function storeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function storeDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function toB64(str) {
    var bytes = new TextEncoder().encode(str), bin = "";
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }
  function fromB64(b64) {
    var bin = atob(b64), bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  function gh(method, path, body, token) {
    var opts = {
      method: method,
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }
    };
    if (body) { opts.headers["Content-Type"] = "application/json"; opts.body = JSON.stringify(body); }
    return fetch(API + $("#repo").value.trim() + "/" + path, opts).then(function (res) {
      if (!res.ok) {
        return res.text().then(function (t) {
          throw new Error("GitHub " + res.status + " — " + (t || res.statusText).slice(0, 220));
        });
      }
      return res.json();
    });
  }

  function msg(text, kind) {
    var el = $("#msg");
    el.textContent = text;
    el.className = kind === "err" ? "err" : kind === "ok" ? "ok" : "";
  }

  /* ==================== Login ==================== */
  function connect() {
    var token = $("#token").value.trim();
    var repo = $("#repo").value.trim();
    if (!repo || !token) { msg("Enter the repository and a GitHub token.", "err"); return; }
    msg("Connecting…");
    gh("GET", "", null, token).then(function () {
      storeSet(TOKEN_KEY, token);
      storeSet(REPO_KEY, repo);
      return loadData();
    }).then(function () {
      showDash();
      msg("Connected to " + repo + ". Data loaded.", "ok");
    }).catch(function (e) { msg(e.message, "err"); });
  }

  function loadData() {
    var token = storeGet(TOKEN_KEY) || $("#token").value.trim();
    return gh("GET", "contents/" + DATA_PATH, null, token).then(function (meta) {
      repoSha = meta.sha;
      var code = fromB64(meta.content);
      eval(code);
      data = window.IFC || {};
      if (!data.club || !data.fixtures || !data.squad) throw new Error("js/data.js did not produce the expected structure.");
      return data;
    });
  }

  function autoConnect() {
    var t = storeGet(TOKEN_KEY);
    if (!t) return;
    $("#token").value = t;
    var r = storeGet(REPO_KEY);
    if (r) $("#repo").value = r;
    loadData().then(function () {
      showDash();
      msg("Connected to " + $("#repo").value.trim() + ". Data loaded.", "ok");
    }).catch(function (e) {
      $("#loginView").classList.remove("hidden");
      msg("", "");
    });
  }

  function logout() {
    storeDel(TOKEN_KEY);
    storeDel(REPO_KEY);
    $("#dashView").classList.add("hidden");
    $("#loginView").classList.remove("hidden");
    $("#token").value = "";
    data = null;
  }

  function showDash() {
    $("#loginView").classList.add("hidden");
    $("#dashView").classList.remove("hidden");
    renderAll();
  }

  /* ==================== Simple bound forms ==================== */
  function field(key, label, type, obj) {
    var val = (obj && obj[key]) != null ? obj[key] : "";
    if (type === "check") {
      return '<div class="field" style="margin:6px 0 0;"><label style="display:flex;align-items:center;gap:8px;font-weight:700;">' +
        '<input type="checkbox" data-bind="' + key + '"' + (val ? " checked" : "") + '> ' + esc(label) + '</label></div>';
    }
    if (type === "date") type = "date";
    if (type === "datetime") type = "datetime-local";
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

  function gatherNext() {
    var d = data.nextFixture || (data.nextFixture = {});
    var v = $("#b_nfDate").value;
    if (v) d.date = v.length === 16 ? v + ":00" : v; else d.date = d.date || "";
    d.home = $("#b_nfHome").checked;
    d.opponent = $("#b_nfOpponent").value;
    d.competition = $("#b_nfComp").value;
    d.venue = $("#b_nfVenue").value;
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
  }

  /* ==================== Editable grids ==================== */
  var POSITIONS = ["Goalkeeper", "Defender", "Midfielder", "Forward"];
  var STATUSES = ["upcoming", "finished", "postponed"];
  var RESULTS = ["W", "D", "L"];

  var GRIDS = {
    fixtures: {
      card: "#fixturesCard",
      tbody: "fxBody",
      fields: [
        ["comp", "Competition", "text"], ["date", "Date", "text"], ["home", "Home", "check"],
        ["opp", "Opponent", "text"], ["venue", "Venue", "text"], ["status", "Status", "select-status"]
      ]
    },
    results: {
      card: "#resultsCard",
      tbody: "rsBody",
      fields: [
        ["comp", "Competition", "text"], ["date", "Date", "text"], ["home", "Home", "check"],
        ["opp", "Opponent", "text"], ["for", "For", "num"], ["against", "Against", "num"],
        ["result", "Res", "select-result"], ["scorers", "Scorers (comma)", "text"]
      ]
    },
    table: {
      card: "#tableCard",
      tbody: "tbBody",
      fields: [
        ["pos", "Pos", "num"], ["team", "Team", "text"], ["p", "P", "num"], ["w", "W", "num"],
        ["d", "D", "num"], ["l", "L", "num"], ["gf", "GF", "num"], ["ga", "GA", "num"], ["pts", "Pts", "num"]
      ]
    },
    squad: {
      card: "#squadCard",
      tbody: "sqBody",
      fields: [
        ["num", "No.", "num"], ["name", "Name", "text"], ["age", "Age", "num"], ["pos", "Position", "select-pos"],
        ["apps", "Apps", "num"], ["goals", "Goals", "num"], ["assists", "Assists", "num"], ["captain", "C", "check"]
      ]
    }
  };

  function cellHTML(key, val, type) {
    var opts = [];
    if (type === "check") {
      return '<td><input type="checkbox" data-f="' + key + '"' + (val ? " checked" : "") + '></td>';
    }
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
    h += '<td class="tiny"><button class="btn--sm" type="button" data-del>✕</button></td></tr>';
    return h;
  }

  function renderGrid(key) {
    var g = GRIDS[key];
    var rows = data[key] || [];
    var h = '<table class="grid"><thead><tr>';
    g.fields.forEach(function (f) {
      h += f[1] === "C" && key === "squad" ? "<th title=\"Captain\">C</th>" : "<th>" + esc(f[1]) + "</th>";
    });
    h += '<th></th></tr></thead><tbody id="' + g.tbody + '">';
    rows.forEach(function (r) { h += gridRowHTML(r, g.fields); });
    h += '</tbody></table><div class="row-actions"><button class="btn btn--sm btn--outline" type="button" data-add-grid="' + key + '">+ Add row</button></div>';
    $(g.card).innerHTML = h;
    wireGrid(key);
  }

  function wireGrid(key) {
    var g = GRIDS[key];
    var tbody = $("#" + g.tbody);
    tbody.addEventListener("click", function (ev) {
      var btn = ev.target.closest("[data-del]");
      if (!btn) return;
      var tr = btn.closest("tr");
      if (tr) tr.parentNode.removeChild(tr);
    });
  }

  function addGridRow(key) {
    var g = GRIDS[key];
    var tbody = $("#" + g.tbody);
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
    tbody.appendChild(tr);
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
    var h = '<table class="grid"><thead><tr><th>Tier</th><th>Price</th><th>Per</th><th>Featured</th><th>Features (comma separated)</th><th></th></tr></thead><tbody id="memBody">';
    tiers.forEach(function (t, i) {
      h += '<tr data-tier="' + i + '">' +
        '<td><input type="text" data-f="name" value="' + esc(t.name) + '"></td>' +
        '<td><input type="text" data-f="price" value="' + esc(t.price) + '"></td>' +
        '<td><input type="text" data-f="per" value="' + esc(t.per || "/ month") + '"></td>' +
        '<td style="width:36px;"><input type="checkbox" data-f="featured"' + (t.featured ? " checked" : "") + '></td>' +
        '<td><input type="text" data-f="features" value="' + esc((t.features || []).join(", ")) + '"></td>' +
        '<td class="tiny"><button class="btn--sm" type="button" data-del>✕</button></td></tr>';
    });
    h += '</tbody></table><div class="row-actions"><button class="btn btn--sm btn--outline" type="button" data-add-mem>+ Add tier</button></div>';
    $("#membershipCard").innerHTML = h;
    $("#membershipCard").querySelector("tbody").addEventListener("click", function (ev) {
      var b = ev.target.closest("[data-del]");
      if (b) { var tr = b.closest("tr"); if (tr) tr.parentNode.removeChild(tr); }
    });
  }

  function addMembershipRow() {
    var tbody = $("#membershipCard").querySelector("tbody");
    var tr = document.createElement("tr");
    tr.innerHTML =
      '<td><input type="text" data-f="name" value=""></td>' +
      '<td><input type="text" data-f="price" value="THB "></td>' +
      '<td><input type="text" data-f="per" value="/ month"></td>' +
      '<td style="width:36px;"><input type="checkbox" data-f="featured"></td>' +
      '<td><input type="text" data-f="features" value=""></td>' +
      '<td class="tiny"><button class="btn--sm" type="button" data-del>✕</button></td>';
    tbody.appendChild(tr);
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

  /* ==================== Render all ==================== */
  function renderAll() {
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

  /* ==================== Publish ==================== */
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

  function applyAdvanced() {
    try {
      var parsed = JSON.parse($("#advanced").value);
      if (!parsed || typeof parsed !== "object" || !parsed.club) throw new Error("missing top-level keys (e.g. club)");
      data = parsed;
      renderAll();
      msg("Raw JSON applied to the editor.", "ok");
    } catch (e) {
      msg("Advanced JSON is invalid — " + e.message, "err");
    }
  }

  function save() {
    /* If the raw-JSON field was hand-edited, use it; otherwise re-sync from forms. */
    var ta = $("#advanced");
    if (ta.dataset.touched) {
      try {
        var parsed = JSON.parse(ta.value);
        if (!parsed || typeof parsed !== "object" || !parsed.club) throw new Error("missing top-level club object");
        data = parsed;
      } catch (e) {
        msg("Advanced JSON is invalid — fix or clear the Raw JSON box before saving. (" + e.message + ")", "err");
        return;
      }
    } else {
      gatherAll();
      ta.value = JSON.stringify(data, null, 2);
    }
    msg("Publishing…");
    var token = storeGet(TOKEN_KEY);
    return gh("GET", "contents/" + DATA_PATH, null, token).then(function (meta) {
      repoSha = meta.sha;
      return gh("PUT", "contents/" + DATA_PATH, {
        message: "Update site data via admin panel",
        content: toB64(buildDataFile()),
        sha: repoSha
      }, token);
    }).then(function (meta) {
      repoSha = meta.content.sha;
      ta.dataset.touched = "";
      msg("Published ✓ — live site redeploys in ~1 minute. (commit " + meta.commit.sha.slice(0, 7) + ")", "ok");
    }).catch(function (e) { msg("Publish failed — " + e.message, "err"); });
  }

  /* ==================== Wire up ==================== */
  $("#connectBtn").addEventListener("click", connect);
  $("#token").addEventListener("keydown", function (e) { if (e.key === "Enter") connect(); });
  $("#saveBtn").addEventListener("click", save);
  $("#logOutBtn").addEventListener("click", logout);
  $("#advanced").addEventListener("input", function () { this.dataset.touched = "1"; });
  $("#advLoad").addEventListener("click", function () {
    gatherAll();
    $("#advanced").value = JSON.stringify(data, null, 2);
    $("#advanced").dataset.touched = "1";
    msg("Raw JSON synced from the forms.", "ok");
  });
  $("#advApply").addEventListener("click", applyAdvanced);
  document.addEventListener("click", function (ev) {
    var addBtn = ev.target.closest("[data-add-grid]");
    if (addBtn) addGridRow(addBtn.getAttribute("data-add-grid"));
    var memBtn = ev.target.closest("[data-add-mem]");
    if (memBtn) addMembershipRow();
  });

  window.__adminTest = window.__adminTest || {
    load: function (d) { data = d; renderAll(); },
    gather: gatherAll,
    build: buildDataFile,
    serialize: function (k) { return serialGrid(k); },
    membershipList: serialMembership
  };

  autoConnect();
})();