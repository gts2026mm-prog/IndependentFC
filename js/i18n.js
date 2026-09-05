/* ============================================================
   INDEPENDENT FOOTBALL CLUB — i18n (EN / MY / TH)
   Language switcher with flags. Stores selection in localStorage.
   Usage: add data-i18n="key" to elements; window.t("key") in JS.
   ============================================================ */
(function () {
  "use strict";

  var STORE_KEY = "ifc-lang";
  var LANG = "en";
  try { LANG = localStorage.getItem(STORE_KEY) || "en"; } catch (e) {}
  if (["en", "my", "th"].indexOf(LANG) === -1) LANG = "en";

  var FLAG_EN = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" fill="#012169"/><path d="M0 0 L24 24 M24 0 L0 24 M0 12 H24 M12 0 V24" stroke="#ffffff" stroke-width="6" fill="none"/><path d="M0 0 L24 24 M24 0 L0 24 M0 12 H24 M12 0 V24" stroke="#C8102E" stroke-width="3" fill="none"/></svg>';
  var FLAG_MM = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="8" fill="#FECB00"/><rect width="24" height="8" y="8" fill="#34B233"/><rect width="24" height="8" y="16" fill="#EA2839"/><path d="M12 8.6 L13.35 11.4 H16.4 L14 13.3 L15.1 16.1 L12 14.2 L8.9 16.1 L10 13.3 L7.6 11.4 H10.65 Z" fill="#ffffff"/></svg>';
  var FLAG_TH = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="6" fill="#A51931"/><rect width="24" height="3" y="6" fill="#F4F5F8"/><rect width="24" height="6" y="9" fill="#2D2A4A"/><rect width="24" height="3" y="15" fill="#F4F5F8"/><rect width="24" height="6" y="18" fill="#A51931"/></svg>';

  var DICT = { en: {}, my: {}, th: {} };

  /* ================= En ================= */
  DICT.en = {
    nav_home: "Home", nav_club: "Club", nav_squad: "Squad", nav_fixtures: "Fixtures",
    nav_partners: "Partners", nav_contact: "Contact", topbar_membership: "Membership",
    footer_theclub: "The Club", footer_supporters: "Supporters", footer_matchday: "Matchday",
    footer_about_history: "About & History", footer_first_team: "First Team",
    footer_fixtures_results: "Fixtures & Results",
    footer_park: "Independence Park", footer_capacity: "12,500 capacity", footer_est1982: "Est. 1982",
    footer_kickoff: "Kick-off:", footer_directions: "Directions",
    footer_rights: "© 2026 Independent Football Club. All rights reserved.",
    hero_h1a: "Forged by the City.", hero_h1b: "United by Pride.",
    hero_lead: "Independent Football Club is more than a team — it's the heartbeat of the community. Navy and gold runs deep. This is your club.",
    hero_cta_member: "Become a Member", hero_cta_story: "Our Story",
    sec_next: "Next Up", sec_countdown_h: "Countdown to Kick-off", cd_vs: "vs",
    sec_season: "2026/27 Season", sec_rise: "On the Rise",
    stat_position: "League Position", stat_points: "Points", stat_scored: "Goals Scored",
    stat_conceded: "Goals Conceded", stat_clean: "Clean Sheets",
    cta_h: "Be Part of the Independents",
    cta_p: "Membership and away travel — get closer to the action and support the club that supports the city.",
    cta_btn: "Explore Membership",
    nl_h: "Never Miss a Match",
    nl_p: "Sign up to the Independent FC newsletter for match reports, ticket alerts and club announcements.",
    nl_ph: "Enter your email address", nl_btn: "Sign Up",
    nl_note: "We respect your inbox. Unsubscribe at any time.",
    bc_home: "Home",
    about_hero_title: "About & History", about_hero_p: "The story of a club built by the people, for the people.",
    e_since1978: "Since 1978", h_forged: "Forged by the City",
    e_mission: "Our Mission", h_morethan: "More Than a Club",
    feat_comm_t: "Community First", feat_comm_d: "We invest in the city's young people through football, education and opportunity.",
    feat_comp_t: "Competitive Pride", feat_comp_d: "We compete to win, with integrity and a never-say-die spirit on every pitch.",
    feat_owner_t: "Supporters Own It", feat_owner_d: "Fan-owned and fan-run — every member has a voice and a stake in the club.",
    feat_belong_t: "Belonging", feat_belong_d: "Everyone is welcome. The Independents are a family of every background.",
    e_crest: "The Crest", h_badge: "What the Badge Means",
    feat_shield_t: "The Shield", feat_shield_d: "A symbol of strength and solidarity — a united front that never breaks.",
    feat_ball_t: "The Football", feat_ball_d: "Pure and simple: the beautiful game is at the heart of everything.",
    feat_star_t: "The Star", feat_star_d: "One star for every decade of independence — a promise of the journey ahead.",
    feat_colors_t: "Navy & Gold", feat_colors_d: "Navy for the working waters and night shifts of our city; gold for the hope of every sunrise.",
    e_silverware: "Silverware", h_honours: "Honours & Trophies", tag_national: "National",
    team_hero_title: "First Team",
    team_hero_p: "The Independents — every shirt, every player, every shirt number carries the badge with pride.",
    e_squad: "2026/27 Squad", h_meet: "Meet the Team",
    meet_lead: "A squad built on grit, talent and togetherness — representing the community on every pitch.",
    e_spotlight: "Player Spotlight", h_topscorer: "Top Scorer",
    ts_desc: "Junior Mensah leads the charge with 5 goals this season — the man the away end fears most.",
    stat_goals: "Goals", stat_assists: "Assists", stat_shirtno: "Shirt No.", stat_mins: "Mins/90",
    e_staff: "Staff", h_badge2: "Behind the Badge",
    sb_lead: "A dedicated backroom team that keeps the Independents firing on all cylinders.",
    role_coach_t: "Head Coach", role_coach_d: "Graham Whitfield — 6th season in charge.",
    role_asst_t: "Assistant", role_asst_d: "Priya Nair",
    role_gk_t: "Goalkeeping Coach", role_gk_d: "Stéphane Gervais",
    role_perf_t: "Head of Performance", role_perf_d: "Dr. Felix Osei",
    fixt_hero_title: "Fixtures & Results",
    fixt_hero_p: "Every match, every score, every climb up the table — track the Independents across the season.",
    e_upcoming: "Coming Up", h_upcoming: "Upcoming Fixtures",
    e_standings: "League Standings", tbl_note: "As of Matchday 5 · Independent FC sit top of the table.",
    e_recent: "Recent Form", h_results: "Past Results",
    legend: "W — Win · D — Draw · L — Loss",
    th_date: "Date", th_comp: "Competition", th_match: "Match", th_venue: "Venue", th_status: "Status",
    th_team: "Team", th_pts: "Pts", th_home: "Home", th_score: "Score", th_away: "Away", th_scorers: "Scorers",
    cta_live_h: "See It Live",
    cta_live_p: "Follow the Independents all season long. Join as a member and never miss a kick.",
    member_hero_title: "Membership",
    member_hero_p: "Independent FC is owned by its supporters. Membership means a voice, a vote, and a place at the heart of the club.",
    e_tier: "Choose Your Tier", h_join: "Join the Independents",
    join_lead: "Every member helps fund the teams, the academy and the community programmes that make this club special.",
    e_why: "Why Membership Matters", h_voice: "Your Club, Your Voice",
    why_lead: "As a member you don't just follow the club — you own a part of it.",
    mem_feat1_t: "Voting Rights", mem_feat1_d: "1882 Members vote at the AGM on club matters large and small.",
    mem_feat2_t: "Priority Tickets", mem_feat2_d: "Get first access to big fixtures before general sale.",
    mem_feat3_t: "Shop Discount", mem_feat3_d: "Save on every kit and scarf in the Independent FC shop.",
    mem_feat4_t: "Away Travel", mem_feat4_d: "Free or discounted coaches to away games with 1882.",
    per_month: "/ month", join_now: "Join now",
    mem_a_0: "Priority ticket window", mem_a_1: "Matchday programme", mem_a_2: "10% off in the club shop", mem_a_3: "Members' newsletter",
    mem_b_0: "Guaranteed season ticket", mem_b_1: "Free away travel", mem_b_2: "20% off in the club shop",
    mem_b_3: "Access to members' lounge", mem_b_4: "Voting rights at AGM",
    mem_c_0: "Kids 12 & under", mem_c_1: "Free entry to home games", mem_c_2: "Birthday card & gift", mem_c_3: "Junior academy discount",
    sponsor_hero_title: "Partners & Sponsors",
    sponsor_hero_p: "The businesses powering the Independents — and the community behind them.",
    e_thank: "Thank You", h_partners: "Our Partners",
    ptag: "Featured Partner", ptitle: "Our Official Partner",
    partner_desc: "Translator, passport & Visa service, Transportation service.",
    pvisit: "Visit them on Facebook →",
    h_grow: "Grow With the Independents",
    grow_lead: "Independent FC offers a passionate, loyal and family-friendly audience that brands love to reach.",
    feat_brand_t: "Brand Visibility", feat_brand_d: "Shirt, stadium, digital and broadcast exposure all season.",
    feat_reach_t: "Community Reach", feat_reach_d: "Align with a club that gives back through its academy and programmes.",
    feat_value_t: "Long-Term Value", feat_value_d: "Flexible packages from grassroots to principal partnership tiers.",
    btn_discuss: "Discuss Partnership",
    contact_hero_title: "Contact & Location",
    contact_hero_p: "Find us at Independence Park, drop us a line, or say hello on social.",
    e_fortress: "The Fortress",
    feat_addr_t: "Address", feat_addr_d: "Independence Park, Stadium Way, City Centre",
    feat_travel_t: "Travel", feat_travel_d: "10 mins from the central station. On-street and matchday parking available.",
    feat_ticket_t: "Ticket Office", feat_ticket_d: "+1 (555) 010-1978 tickets@independentfc.club",
    feat_general_t: "General", feat_general_d: "hello@independentfc.club",
    follow_p: "Follow us for live updates, behind-the-scenes and this week's team news.",
    e_touch: "Get in Touch", h_message: "Send Us a Message",
    msg_lead: "Questions about tickets, membership, the academy or partnerships? Drop us a line and a member of the team will reply within 48 hours.",
    form_success: "Thanks for your message! We'll be in touch soon.",
    label_name: "Name", label_email: "Email", label_topic: "Topic", label_message: "Message",
    ph_name: "Your full name", ph_email: "you@example.com", ph_message: "How can we help?",
    opt_tickets: "Tickets", opt_membership: "Membership", opt_academy: "Academy", opt_shop: "Shop",
    opt_partnerships: "Partnerships", opt_press: "Press / Media", opt_other: "Other",
    btn_send: "Send Message",
    cd_days: "Days", cd_hours: "Hours", cd_mins: "Mins", cd_secs: "Secs", cd_fulltime: "FULL TIME",
    hm_latest: "Latest Result", hm_next: "Next Up",
    badge_upcoming: "UPCOMING",
    pos_gk: "Goalkeeper", pos_def: "Defender", pos_mid: "Midfielder", pos_fwd: "Forward",
    st_age: "Age", st_apps: "Apps", st_goals: "Goals"
  };

  /* ================= Myanmar ================= */
  DICT.my = {
    nav_home: "ပင်မစာမျက်နှာ", nav_club: "ကလပ်အသင်း", nav_squad: "ကစားသမားများ", nav_fixtures: "ပွဲစဉ်များ",
    nav_partners: "မိတ်ဖက်များ", nav_contact: "ဆက်သွယ်ရန်", topbar_membership: "အသင်းဝင်ခြင်း",
    footer_theclub: "ကလပ်အကြောင်း", footer_supporters: "ပရိသတ်များ", footer_matchday: "ပွဲနေ့",
    footer_about_history: "အကြောင်းနှင့်သမိုင်း", footer_first_team: "ပထမအသင်း",
    footer_fixtures_results: "ပွဲစဉ်နှင့်ရလဒ်များ",
    footer_park: "Independence Park", footer_capacity: "ပရိသတ် ၁၂,၅၀၀ ဆံ့", footer_est1982: "၁၉၈၂ တွင် တည်ထောင်",
    footer_kickoff: "ကစားချိန်:", footer_directions: "လမ်းညွှန်",
    footer_rights: "© ၂၀၂၆ Independent Football Club. မူပိုင်ခွင့်အားလုံး ရယူသည်။",
    hero_h1a: "မြို့တော်၏ အမာခံ", hero_h1b: "မာနဖြင့် စည်းလုံးသည်",
    hero_lead: "Independent Football Club သည် အသင်းတစ်သင်းထက် ပိုပါသည် — ရပ်ရွာ၏ နှလုံးသားဖြစ်သည်။ နက်ပြာနှင့်ရွှေရောင်တို့ဖြင့် နက်ရှိုင်းစွာ တည်ဆောက်ထားသော ဤသည်မှာ သင့်အသင်းဖြစ်သည်။",
    hero_cta_member: "အသင်းဝင်ရန်", hero_cta_story: "ကျွန်ုပ်တို့အကြောင်း",
    sec_next: "လာမည့်ပွဲစဉ်", sec_countdown_h: "ပွဲမစတင်မီ ကျန်ရှိချိန်", cd_vs: "နှင့်",
    sec_season: "၂၀၂၆/၂၇ ရာသီ", sec_rise: "အရှိန်ရလာနေသည်",
    stat_position: "လိဂ်အဆင့်", stat_points: "အမှတ်", stat_scored: "သွင်းဂိုး",
    stat_conceded: "ပေးဂိုး", stat_clean: "ဂိုးမရှိပွဲ",
    cta_h: "အသင်းနှင့် အတူရှိပါ",
    cta_p: "အသင်းဝင်ခြင်းနှင့် အဝေးကွင်းခရီး — ပွဲစဉ်များနှင့် ပိုနီးကပ်ပြီး မြို့ကို အားပေးသော အသင်းကို ထောက်ပံ့ပါ။",
    cta_btn: "အသင်းဝင်ခြင်းကို လေ့လာပါ",
    nl_h: "ပွဲတိုင်း မလွတ်ပါနှင့်",
    nl_p: "ပွဲသတင်း၊ လက်မှတ်သတိပေးချက်နှင့် အသင်းကြေညာချက်များအတွက် Independent FC သတင်းလွှာတွင် စာရင်းသွင်းပါ။",
    nl_ph: "သင့်အီးမေးလ်ထည့်ပါ", nl_btn: "စာရင်းသွင်း",
    nl_note: "သင့်အင်ဘောက်စ်ကို လေးစားပါသည်။ အချိန်မရွေး ရပ်စဲနိုင်ပါသည်။",
    bc_home: "ပင်မစာမျက်နှာ",
    about_hero_title: "အကြောင်းနှင့်သမိုင်း", about_hero_p: "ရပ်ရွာလူထု တည်ထောင်ပြီး ရပ်ရွာလူထုအတွက် ဖြစ်သော ကလပ်၏သမိုင်းကြောင်း။",
    e_since1978: "၁၉၇၈ မှစ၍", h_forged: "မြို့တော်၏ အမာခံ",
    e_mission: "ကျွန်ုပ်တို့၏ ရည်ရွယ်ချက်", h_morethan: "ကလပ်တစ်ခုထက်ပို",
    feat_comm_t: "ရပ်ရွာ ဦးစားပေး", feat_comm_d: "ဘောလုံး၊ ပညာရေးနှင့် အခွင့်အလမ်းများဖြင့် မြို့၏လူငယ်များအတွက် ရင်းနှီးမြှုပ်နှံပါသည်။",
    feat_comp_t: "ယှဉ်ပြိုင်မှု ဂုဏ်", feat_comp_d: "ပွဲတိုင်းတွင် ဂုဏ်သိက္ခာရှိရှိနှင့် ဘယ်တော့မှ အရှုံးမပေးဘဲ အနိုင်ရရန် ယှဉ်ပြိုင်သည်။",
    feat_owner_t: "ပရိသတ်က ပိုင်ဆိုင်သည်", feat_owner_d: "ပရိသတ်ပိုင်နှင့် ပရိသတ်လည်ပတ် — အဖွဲ့ဝင်တိုင်း အသံနှင့် အသင်းတွင် အစုရှိသည်။",
    feat_belong_t: "ပိုင်ဆိုင်မှုခံစားချက်", feat_belong_d: "လူတိုင်း ကြိုဆိုပါသည်။ Independent FC သည် နောက်ခံအားလုံး၏ မိသားစုဖြစ်သည်။",
    e_crest: "အမှတ်တံဆိပ်", h_badge: "အမှတ်တံဆိပ်၏ အဓိပ္ပါယ်",
    feat_shield_t: "ဒိုင်း", feat_shield_d: "ခွန်အားနှင့် စည်းလုံးမှု၏ လက္ခဏာ — မည်သည့်အခါမှ မကွဲပြားသော တစ်တည်းသော တန်းတူရပ်တည်မှု။",
    feat_ball_t: "ဘောလုံး", feat_ball_d: "ရိုးရှင်းလှသည် — လှပသောဂိမ်းသည် အရာအားလုံး၏ ဗဟို။",
    feat_star_t: "ကြယ်", feat_star_d: "လွတ်လပ်ရေး ဆယ်စုနှစ်တိုင်းအတွက် ကြယ်တစ်စင်း — ရှေ့ခရီးအတွက် ကတိ။",
    feat_colors_t: "အပြာနှင့်ရွှေ", feat_colors_d: "အပြာသည် ကျွန်ုပ်တို့မြို့၏ လုပ်ငန်းရေနှင့် ညဆိုင်းများအတွက်၊ ရွှေသည် နေထွက်တိုင်း၏ မျှော်လင့်ချက်အတွက်။",
    e_silverware: "ဆုတံဆိပ်များ", h_honours: "ဂုဏ်ဆုများနှင့် ဖလားများ", tag_national: "အမျိုးသား",
    team_hero_title: "ပထမအသင်း",
    team_hero_p: "Independent FC — အင်္ကျီတိုင်း၊ ကစားသမားတိုင်း၊ နံပါတ်တိုင်းသည် အသင်းတံဆိပ်ကို ဂုဏ်ယူစွာ ဆောင်သည်။",
    e_squad: "၂၀၂၆/၂၇ လူစာရင်း", h_meet: "အသင်းသားများနှင့် မိတ်ဆက်",
    meet_lead: "ဇွဲ၊ အရည်အချင်းနှင့် စည်းလုံးမှုတို့ဖြင့် တည်ဆောက်ထားသည့် အသင်း — ပွဲတိုင်းတွင် ရပ်ရွာလူထုကို ကိုယ်စားပြုသည်။",
    e_spotlight: "ကစားသမား အထူးမီဒီယာမျှော်", h_topscorer: "ဂိုးအများဆုံး",
    ts_desc: "Junior Mensah သည် ဤရာသီတွင် ဂိုး ၅ ဂိုးဖြင့် ဦးဆောင်နေသည် — အဝေးကွင်းပရိသတ်များ အကြောက်ဆုံး ကစားသမား။",
    stat_goals: "ဂိုး", stat_assists: "အကူဂိုး", stat_shirtno: "နံပါတ်", stat_mins: "မိနစ်/၉၀",
    e_staff: "နည်းပြအဖွဲ့", h_badge2: "အသင်းနောက်ကွယ်",
    sb_lead: "Independent FC ကို အကောင်းဆုံးဖြစ်အောင် ထိန်းသိမ်းပေးသော ဆည်းကပ်သည့် နည်းပြအဖွဲ့။",
    role_coach_t: "နည်းပြအကြီးအကဲ", role_coach_d: "Graham Whitfield — ဆဋ္ဌမရာသီ ဦးဆောင်။",
    role_asst_t: "လက်ထောက်နည်းပြ", role_asst_d: "Priya Nair",
    role_gk_t: "ဂိုးသမားနည်းပြ", role_gk_d: "Stéphane Gervais",
    role_perf_t: "စွမ်းဆောင်ရည် အကြီးအကဲ", role_perf_d: "Dr. Felix Osei",
    fixt_hero_title: "ပွဲစဉ်နှင့်ရလဒ်များ",
    fixt_hero_p: "ပွဲတိုင်း၊ ဂိုးတိုင်း၊ ရလဒ်တိုင်း — ရာသီတစ်လျှောက် Independent FC ၏ အခြေအနေကို ခြေရာခံပါ။",
    e_upcoming: "လာမည့်ပွဲများ", h_upcoming: "လာမည့်ပွဲစဉ်များ",
    e_standings: "လိဂ်အဆင့်ဇယား", tbl_note: "ပွဲစဉ် ၅ ပြီးသည့်အခြေအနေ · Independent FC သည် ဇယားထိပ်တွင်ရှိသည်။",
    e_recent: "လတ်တလော ပုံစံ", h_results: "ယခင်ရလဒ်များ",
    legend: "W — နိုင် · D — သရေ · L — ရှုံး",
    th_date: "ရက်", th_comp: "ပြိုင်ပွဲ", th_match: "ပွဲ", th_venue: "ကွင်း", th_status: "အခြေအနေ",
    th_team: "အသင်း", th_pts: "အမှတ်", th_home: "အိမ်ကွင်း", th_score: "ဂိုး", th_away: "အဝေးကွင်း", th_scorers: "ဂိုးသွင်းသူ",
    cta_live_h: "ကွင်းစင်၌ ကြည့်ရှုပါ",
    cta_live_p: "ရာသီတစ်လျှောက် Independent FC ကို လိုက်ပါပါ။ အသင်းဝင်အဖြစ် ပူးပေါင်းပြီး ကန်သွင်းတိုင်း မလွတ်ပါနှင့်။",
    member_hero_title: "အသင်းဝင်ခြင်း",
    member_hero_p: "Independent FC သည် ပရိသတ်များ ပိုင်ဆိုင်သော ကလပ်ဖြစ်သည်။ အသင်းဝင်ခြင်းသည် အသံ၊ မဲပေးခွင့်နှင့် ကလပ်၏ နှလုံးသားတွင် နေရာတစ်ခု ရရှိခြင်းဖြစ်သည်။",
    e_tier: "အဆင့် ရွေးချယ်ပါ", h_join: "Independent FC သို့ ပူးပေါင်းပါ",
    join_lead: "အဖွဲ့ဝင်တိုင်းသည် အသင်း၊ အကယ်ဒမီနှင့် ရပ်ရွာအစီအစဉ်များအတွက် ရန်ပုံငွေ ထောက်ပံ့ပေးသည်။",
    e_why: "အသင်းဝင်ခြင်း၏ အရေးပါမှု", h_voice: "သင့်အသင်း၊ သင့်အသံ",
    why_lead: "အဖွဲ့ဝင်တစ်ဦးအနေဖြင့် အသင်းကို လိုက်ပါရုံမက — အစိတ်အပိုင်းတစ်ခု ပိုင်ဆိုင်သည်။",
    mem_feat1_t: "မဲပေးပိုင်ခွင့်", mem_feat1_d: "1882 အဖွဲ့ဝင်များသည် AGM တွင် အသင်းကိစ္စကြီးငယ်အားလုံးကို မဲပေးပါသည်။",
    mem_feat2_t: "လက်မှတ်ဦးစားပေး", mem_feat2_d: "အများရောင်းချခြင်းမပြုမီ ပွဲကြီးပွဲကောင်းများအတွက် ဦးစားပေး ရယူပါ။",
    mem_feat3_t: "လျှော့စျေး", mem_feat3_d: "Independent FC ဆိုင်၏ ပိုက်ဆံနှင့် ပဝါတိုင်းတွင် ချွေတာပါ။",
    mem_feat4_t: "အဝေးကွင်းခရီး", mem_feat4_d: "1882 ဖြင့် အဝေးကွင်းပွဲများသို့ အခမဲ့ သို့မဟုတ် လျှော့စျေး ကားဝန်ဆောင်မှု။",
    per_month: "/ လ", join_now: "ယခု ပူးပေါင်းပါ",
    mem_a_0: "လက်မှတ် ဦးစားပေးပြတင်းပေါက်", mem_a_1: "ပွဲနေ့ အစီအစဉ်စာအုပ်", mem_a_2: "အသင်းဆိုင်၌ ၁၀% လျှော့စျေး", mem_a_3: "အဖွဲ့ဝင် သတင်းလွှာ",
    mem_b_0: "ရာသီလက်မှတ် အာမခံ", mem_b_1: "အဝေးကွင်းခရီး အခမဲ့", mem_b_2: "အသင်းဆိုင်၌ ၂၀% လျှော့စျေး",
    mem_b_3: "အဖွဲ့ဝင် ဧည့်ခန်းသုံးခွင့်", mem_b_4: "AGM တွင် မဲပေးခွင့်",
    mem_c_0: "၁၂ နှစ်နှင့်အောက် ကလေးများ", mem_c_1: "အိမ်ကွင်းပွဲများ အခမဲ့ဝင်ခွင့်", mem_c_2: "မွေးနေ့ကတ်နှင့် လက်ဆောင်", mem_c_3: "အကယ်ဒမီ လျှော့စျေး",
    sponsor_hero_title: "မိတ်ဖက်များနှင့်စပွန်ဆာများ",
    sponsor_hero_p: "Independent FC ကို အားဖြည့်ပေးသော စီးပွားရေးလုပ်ငန်းများနှင့် ၎င်းတို့နောက်ကွယ်ရှိ ရပ်ရွာ။",
    e_thank: "ကျေးဇူးတင်ပါသည်", h_partners: "ကျွန်ုပ်တို့၏ မိတ်ဖက်များ",
    ptag: "အထူးမိတ်ဖက်", ptitle: "ကျွန်ုပ်တို့၏ တရားဝင် မိတ်ဖက်",
    partner_desc: "ဘာသာပြန်၊ ပတ်စ်ပို့နှင့် ဗီဇာဝန်ဆောင်မှု၊ သယ်ယူပို့ဆောင်ရေး ဝန်ဆောင်မှု။",
    pvisit: "Facebook တွင် ဝင်ကြည့်ပါ →",
    h_grow: "Independent FC နှင့် အတူ ကြီးထွားပါ",
    grow_lead: "Independent FC သည် ကုန်အမှတ်တံဆိပ်များလက်လှမ်းမီလိုသော စိတ်အားထက်သန်၊ သစ္စာရှိပြီး မိသားစုဆန်သော ပရိသတ်ကို ပေးသည်။",
    feat_brand_t: "အမှတ်တံဆိပ် မြင်နိုင်မှု", feat_brand_d: "ရှပ်အင်္ကျီ၊ ကွင်း၊ ဒစ်ဂျစ်တယ်နှင့် ထုတ်လွှင့်မှုတို့တွင် ရာသီတစ်လျှောက် ထိတွေ့မှု။",
    feat_reach_t: "ရပ်ရွာ လက်လှမ်းမှီမှု", feat_reach_d: "အကယ်ဒမီနှင့် အစီအစဉ်များဖြင့် ပြန်လည်ပေးအပ်သော ကလပ်နှင့် ပေါင်းဖက်ပါ။",
    feat_value_t: "ရေရှည် တန်ဖိုး", feat_value_d: "အခြေခံမှ အဓိကမိတ်ဖက် အဆင့်အထိ လိုက်လျောညီထွေ ပက်ကေ့ဂျ်များ။",
    btn_discuss: "ပူးပေါင်းမှုကို ဆွေးနွေးပါ",
    contact_hero_title: "ဆက်သွယ်ရန်နှင့်နေရာ",
    contact_hero_p: "Independence Park တွင် ရှာဖွေပါ၊ စာပေးပို့ပါ၊ သို့မဟုတ် ဆိုရှယ်မီဒီယာတွင် နှုတ်ဆက်ပါ။",
    e_fortress: "အမာခံကွင်း",
    feat_addr_t: "လိပ်စာ", feat_addr_d: "Independence Park, Stadium Way, City Centre",
    feat_travel_t: "သွားလာရေး", feat_travel_d: "၁၀ မိနစ်။ လမ်းဘေးနှင့် ပွဲနေ့ ကားပါကင်ရှိသည်။",
    feat_ticket_t: "လက်မှတ်ရုံး", feat_ticket_d: "+1 (555) 010-1978 tickets@independentfc.club",
    feat_general_t: "ယေဘုယျ", feat_general_d: "hello@independentfc.club",
    follow_p: "တိုက်ရိုက်သတင်းများ၊ နောက်ကွယ်မြင်ကွင်းများနှင့် ဤအပတ်၏ အသင်းသတင်းများအတွက် လိုက်ကြည့်ပါ။",
    e_touch: "ဆက်သွယ်ရန်", h_message: "Message ပေးပို့ပါ",
    msg_lead: "လက်မှတ်၊ အသင်းဝင်ခြင်း၊ အကယ်ဒမီ သို့မဟုတ် ပူးပေါင်းမှုအကြောင်း မေးခွန်းများ? Message ပေးပို့ပါ — အဖွဲ့ဝင်တစ်ဦး ၄၈ နာရီအတွင်း ပြန်ဖြေပါမည်။",
    form_success: "Message အတွက် ကျေးဇူးတင်ပါသည်! မကြာမီ ဆက်သွယ်ပါမည်။",
    label_name: "အမည်", label_email: "အီးမေးလ်", label_topic: "အหัวข้อ", label_message: "Message",
    ph_name: "သင့်အမည်အပြည့်အစုံ", ph_email: "you@example.com", ph_message: "ကျွန်ုပ်တို့ မည်သို့ ကူညီနိုင်ပါသလဲ?",
    opt_tickets: "လက်မှတ်", opt_membership: "အသင်းဝင်ခြင်း", opt_academy: "အကယ်ဒမီ", opt_shop: "ဆိုင်",
    opt_partnerships: "ပူးပေါင်းမှု", opt_press: "သတင်း / မီဒီယာ", opt_other: "အခြား",
    btn_send: "Message ပို့ပါ",
    cd_days: "ရက်", cd_hours: "နာရီ", cd_mins: "မိနစ်", cd_secs: "စက္ကန့်", cd_fulltime: "ပွဲပြီး",
    hm_latest: "လတ်တလော ရလဒ်", hm_next: "နောက်ပွဲ",
    badge_upcoming: "လာမည့်ပွဲ",
    pos_gk: "ဂိုးသမား", pos_def: "နောက်တန်း", pos_mid: "ကွင်းလယ်", pos_fwd: "ရှေ့တန်း",
    st_age: "အသက်", st_apps: "ပွဲ", st_goals: "ဂိုး"
  };

  /* ================= Thai ================= */
  DICT.th = {
    nav_home: "หน้าแรก", nav_club: "สโมสร", nav_squad: "ผู้เล่น", nav_fixtures: "ตารางแข่ง",
    nav_partners: "พันธมิตร", nav_contact: "ติดต่อ", topbar_membership: "สมาชิกภาพ",
    footer_theclub: "สโมสรของเรา", footer_supporters: "แฟนคลับ", footer_matchday: "วันแข่ง",
    footer_about_history: "เกี่ยวกับและประวัติ", footer_first_team: "ทีมชุดใหญ่",
    footer_fixtures_results: "ตารางแข่งและผล",
    footer_park: "อินดิเพนเดนซ์ พาร์ค", footer_capacity: "จุ 12,500 ที่นั่ง", footer_est1982: "ก่อตั้ง 1982",
    footer_kickoff: "เวลาเริ่ม:", footer_directions: "เส้นทาง",
    footer_rights: "© 2026 สโมสรฟุตบอลอินดิเพนเดนซ์ สงวนลิขสิทธิ์",
    hero_h1a: "หล่อหลอมโดยเมือง", hero_h1b: "รวมเป็นหนึ่งด้วยความภาคภูมิใจ",
    hero_lead: "สโมสรฟุตบอลอินดิเพนเดนซ์ไม่ใช่แค่ทีม — คือหัวใจของชุมชน สีน้ำเงินเข้มและทองฝังลึกในสายเลือด นี่คือสโมสรของคุณ",
    hero_cta_member: "สมัครสมาชิก", hero_cta_story: "เรื่องราวของเรา",
    sec_next: "แมตช์ถัดไป", sec_countdown_h: "นับถอยหลังก่อนเริ่มแมตช์", cd_vs: "พบ",
    sec_season: "ฤดูกาล 2026/27", sec_rise: "กำลังมาแรง",
    stat_position: "อันดับลีก", stat_points: "แต้ม", stat_scored: "ประตูทำได้",
    stat_conceded: "ประตูเสีย", stat_clean: "คลีนชีต",
    cta_h: "เป็นส่วนหนึ่งของสโมสร",
    cta_p: "สมาชิกภาพและการเดินทางเยือนต่างถิ่น — เข้าใกล้การแข่งขันและสนับสนุนสโมสรที่สนับสนุนเมืองของคุณ",
    cta_btn: "ดูแพ็กเกจสมาชิก",
    nl_h: "ไม่พลาดทุกแมตช์",
    nl_p: "สมัครรับจดหมายข่าวของอินดิเพนเดนซ์ เอฟซี เพื่อรายงานผลการแข่งขัน แจ้งเตือนตั๋ว และประกาศสโมสร",
    nl_ph: "กรอกอีเมลของคุณ", nl_btn: "สมัคร",
    nl_note: "เราเคารพกล่องข้อความของคุณ ยกเลิกได้ทุกเมื่อ",
    bc_home: "หน้าแรก",
    about_hero_title: "เกี่ยวกับและประวัติ", about_hero_p: "เรื่องราวของสโมสรที่สร้างโดยประชาชน เพื่อประชาชน",
    e_since1978: "ตั้งแต่ปี 1978", h_forged: "หล่อหลอมโดยเมือง",
    e_mission: "พันธกิจของเรา", h_morethan: "มากกว่าสโมสร",
    feat_comm_t: "ชุมชนมาก่อน", feat_comm_d: "เราลงทุนในเยาวชนของเมืองผ่านฟุตบอล การศึกษา และโอกาส",
    feat_comp_t: "ศักดิ์ศรีแห่งการแข่งขัน", feat_comp_d: "เราแข่งขันเพื่อชนะด้วยความซื่อสัตย์และจิตวิญญาณไม่ยอมแพ้ในทุกสนาม",
    feat_owner_t: "แฟนเป็นเจ้าของ", feat_owner_d: "แฟนบอลเป็นเจ้าของและบริหาร — สมาชิกทุกคนมีเสียงและมีส่วนในสโมสร",
    feat_belong_t: "ความเป็นส่วนหนึ่ง", feat_belong_d: "ทุกคนยินดีต้อนรับ อินดิเพนเดนซ์คือครอบครัวของทุกพื้นฐาน",
    e_crest: "ตราสโมสร", h_badge: "ความหมายของตรา",
    feat_shield_t: "โล่", feat_shield_d: "สัญลักษณ์แห่งความแข็งแกร่งและสามัคคี — แนวร่วมที่ไม่มีวันแตกแยก",
    feat_ball_t: "ลูกฟุตบอล", feat_ball_d: "เรียบง่ายและแท้จริง: เกมฟุตบอลคือหัวใจของทุกสิ่ง",
    feat_star_t: "ดาว", feat_star_d: "หนึ่งดาวต่อทุกทศวรรษแห่งเอกราช — คำมั่นสัญญาของเส้นทางข้างหน้า",
    feat_colors_t: "น้ำเงินเข้มและทอง", feat_colors_d: "น้ำเงินแทนสายน้ำและกะกลางคืนของเมืองเรา ทองแทนความหวังของทุกเช้าที่พระอาทิตย์ขึ้น",
    e_silverware: "ถ้วยรางวัล", h_honours: "เกียรติประวัติและถ้วย", tag_national: "ระดับชาติ",
    team_hero_title: "ทีมชุดใหญ่",
    team_hero_p: "อินดิเพนเดนซ์ — เสื้อทุกตัว ผู้เล่นทุกคน หมายเลขทุกเบอร์แบกตราสโมสรด้วยความภาคภูมิใจ",
    e_squad: "ผู้เล่นฤดูกาล 2026/27", h_meet: "พบกับทีม",
    meet_lead: "ทีมที่สร้างด้วยความมุ่งมั่น ความสามารถ และความเป็นหนึ่ง — เป็นตัวแทนชุมชนในทุกสนาม",
    e_spotlight: "ไฮไลต์ผู้เล่น", h_topscorer: "ดาวซัลโว",
    ts_desc: "Junior Mensah นำด้วย 5 ประตูในฤดูกาลนี้ — ผู้ชายที่แฟนบอลเยือนกลัวที่สุด",
    stat_goals: "ประตู", stat_assists: "แอสซิสต์", stat_shirtno: "หมายเลขเสื้อ", stat_mins: "นาที/90",
    e_staff: "ทีมงาน", h_badge2: "เบื้องหลังสโมสร",
    sb_lead: "ทีมงานสตาฟที่ทุ่มเททำให้อินดิเพนเดนซ์ทำงานเต็มกำลังทุกกระบอกสูบ",
    role_coach_t: "หัวหน้าผู้ฝึกสอน", role_coach_d: "Graham Whitfield — ปีที่ 6 ในตำแหน่ง",
    role_asst_t: "ผู้ช่วยผู้ฝึกสอน", role_asst_d: "Priya Nair",
    role_gk_t: "ผู้ฝึกสอนผู้รักษาประตู", role_gk_d: "Stéphane Gervais",
    role_perf_t: "หัวหน้าฝ่ายสมรรถภาพ", role_perf_d: "ดร. Felix Osei",
    fixt_hero_title: "ตารางแข่งและผล",
    fixt_hero_p: "ทุกแมตช์ ทุกคะแนน ทุกก้าวขึ้นตาราง — ติดตามอินดิเพนเดนซ์ตลอดฤดูกาล",
    e_upcoming: "แมตช์ถัดไป", h_upcoming: "โปรแกรมการแข่งขัน",
    e_standings: "ตารางคะแนน", tbl_note: "หลังแมตช์เดย์ 5 · อินดิเพนเดนซ์ เอฟซี รั้งจ่าฝูงของตาราง",
    e_recent: "ฟอร์มล่าสุด", h_results: "ผลการแข่งขันที่ผ่านมา",
    legend: "W — ชนะ · D — เสมอ · L — แพ้",
    th_date: "วันที่", th_comp: "รายการ", th_match: "แมตช์", th_venue: "สนาม", th_status: "สถานะ",
    th_team: "ทีม", th_pts: "แต้ม", th_home: "เจ้าบ้าน", th_score: "สกอร์", th_away: "ทีมเยือน", th_scorers: "ผู้ทำประตู",
    cta_live_h: "ชมสดที่สนาม",
    cta_live_p: "ติดตามอินดิเพนเดนซ์ตลอดฤดูกาล สมัครสมาชิกเพื่อไม่พลาดทุกการเตะ",
    member_hero_title: "สมาชิกภาพ",
    member_hero_p: "อินดิเพนเดนซ์ เอฟซี เป็นของแฟนบอล สมาชิกภาพคือเสียง การโหวต และที่ของคุณในหัวใจสโมสร",
    e_tier: "เลือกระดับ", h_join: "ร่วมเป็นอินดิเพนเดนซ์",
    join_lead: "สมาชิกทุกคนช่วยสนับสนุนทีม สถาบันเยาวชน และโครงการชุมชนที่ทำให้สโมสรนี้พิเศษ",
    e_why: "ทำไมสมาชิกภาพสำคัญ", h_voice: "สโมสรของคุณ เสียงของคุณ",
    why_lead: "ในฐานะสมาชิกคุณไม่ได้แค่เชียร์ — คุณเป็นเจ้าของส่วนหนึ่ง",
    mem_feat1_t: "สิทธิ์ลงคะแนน", mem_feat1_d: "สมาชิก 1882 โหวตในที่ประชุมใหญ่ (AGM) ในเรื่องเล็กและใหญ่ของสโมสร",
    mem_feat2_t: "ตั๋วล่วงหน้า", mem_feat2_d: "เข้าถึงบัตรแมตช์ใหญ่ก่อนเปิดขายทั่วไป",
    mem_feat3_t: "ส่วนลดช้อป", mem_feat3_d: "ประหยัดทุกชุดและผ้าพันคอในร้านอินดิเพนเดนซ์ เอฟซี",
    mem_feat4_t: "ทริปเยือนต่างถิ่น", mem_feat4_d: "รถโดยสารฟรีหรือลดราคาสำหรับเกมเยือนกับสมาชิก 1882",
    per_month: "/ เดือน", join_now: "สมัครเลย",
    mem_a_0: "สิทธิ์ซื้อตั๋วล่วงหน้า", mem_a_1: "โปรแกรมแมตช์เดย์", mem_a_2: "ส่วนลด 10% ในร้านสโมสร", mem_a_3: "จดหมายข่าวสมาชิก",
    mem_b_0: "ตั๋วฤดูกาลการันตี", mem_b_1: "เดินทางเยือนฟรี", mem_b_2: "ส่วนลด 20% ในร้านสโมสร",
    mem_b_3: "สิทธิ์ใช้เลานจ์สมาชิก", mem_b_4: "สิทธิ์โหวตใน AGM",
    mem_c_0: "เด็กอายุ 12 ปีและต่ำกว่า", mem_c_1: "เข้าชมเกมเหย้าฟรี", mem_c_2: "การ์ดและของขวัญวันเกิด", mem_c_3: "ส่วนลดสถาบันเยาวชน",
    sponsor_hero_title: "พันธมิตรและสปอนเซอร์",
    sponsor_hero_p: "ธุรกิจที่ขับเคลื่อนอินดิเพนเดนซ์ — และชุมชนที่อยู่เบื้องหลัง",
    e_thank: "ขอบคุณ", h_partners: "พันธมิตรของเรา",
    ptag: "พันธมิตรพิเศษ", ptitle: "พันธมิตรอย่างเป็นทางการ",
    partner_desc: "บริการล่าม หนังสือเดินทางและวีซ่า และบริการขนส่ง",
    pvisit: "เยี่ยมชมบน Facebook →",
    h_grow: "เติบโตไปกับอินดิเพนเดนซ์",
    grow_lead: "อินดิเพนเดนซ์ เอฟซี มอบผู้ชมที่หลงใหล ซื่อสัตย์ และเหมาะกับครอบครัว แบรนด์ใฝ่หา",
    feat_brand_t: "การมองเห็นแบรนด์", feat_brand_d: "การเปิดรับบนเสื้อ สนาม ดิจิทัล และการถ่ายทอดตลอดฤดูกาล",
    feat_reach_t: "เข้าถึงชุมชน", feat_reach_d: "ร่วมกับสโมสรที่ตอบแทนสังคมผ่านสถาบันเยาวชนและโครงการต่าง ๆ",
    feat_value_t: "คุณค่าระยะยาว", feat_value_d: "แพ็กเกจยืดหยุ่นจากระดับท้องถิ่นถึงพาร์ทเนอร์หลัก",
    btn_discuss: "คุยเรื่องความร่วมมือ",
    contact_hero_title: "ติดต่อและที่ตั้ง",
    contact_hero_p: "มาหาเราที่อินดิเพนเดนซ์ พาร์ค เขียนหาเรา หรือทักทายในโซเชียล",
    e_fortress: "ป้อมปราการ",
    feat_addr_t: "ที่อยู่", feat_addr_d: "Independence Park, Stadium Way, City Centre",
    feat_travel_t: "การเดินทาง", feat_travel_d: "10 นาทีจากสถานีกลาง มีที่จอดรถริมถนนและวันแข่ง",
    feat_ticket_t: "สำนักงานตั๋ว", feat_ticket_d: "+1 (555) 010-1978 tickets@independentfc.club",
    feat_general_t: "ทั่วไป", feat_general_d: "hello@independentfc.club",
    follow_p: "ติดตามเราสำหรับอัปเดตสด เบื้องหลัง และข่าวทีมประจำสัปดาห์",
    e_touch: "ติดต่อเรา", h_message: "ส่งข้อความหาเรา",
    msg_lead: "มีคำถามเรื่องตั๋ว สมาชิกภาพ สถาบันเยาวชนหรือพันธมิตรไหม? ส่งข้อความมา แล้วทีมงานจะตอบกลับภายใน 48 ชั่วโมง",
    form_success: "ขอบคุณสำหรับข้อความ! เราจะติดต่อกลับเร็ว ๆ นี้",
    label_name: "ชื่อ", label_email: "อีเมล", label_topic: "หัวข้อ", label_message: "ข้อความ",
    ph_name: "ชื่อเต็มของคุณ", ph_email: "you@example.com", ph_message: "เราช่วยอะไรคุณได้บ้าง?",
    opt_tickets: "ตั๋ว", opt_membership: "สมาชิกภาพ", opt_academy: "สถาบันเยาวชน", opt_shop: "ร้านค้า",
    opt_partnerships: "ความร่วมมือ", opt_press: "สื่อ / ข่าว", opt_other: "อื่น ๆ",
    btn_send: "ส่งข้อความ",
    cd_days: "วัน", cd_hours: "ชั่วโมง", cd_mins: "นาที", cd_secs: "วินาที", cd_fulltime: "จบการแข่งขัน",
    hm_latest: "ผลล่าสุด", hm_next: "แมตช์ถัดไป",
    badge_upcoming: "เร็ว ๆ นี้",
    pos_gk: "ผู้รักษาประตู", pos_def: "กองหลัง", pos_mid: "กองกลาง", pos_fwd: "กองหน้า",
    st_age: "อายุ", st_apps: "ลงเล่น", st_goals: "ประตู"
  };

  window.t = function (key) {
    var d = DICT[LANG] || DICT.en;
    if (d && d.hasOwnProperty(key)) return d[key];
    if (DICT.en.hasOwnProperty(key)) return DICT.en[key];
    return key;
  };
  window.getLang = function () { return LANG; };
  window.setLang = function (l) {
    if (["en", "my", "th"].indexOf(l) === -1) return;
    LANG = l;
    try { localStorage.setItem(STORE_KEY, l); } catch (e) {}
    document.documentElement.lang = l;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = window.t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", window.t(el.getAttribute("data-i18n-placeholder")));
    });
    var btns = document.querySelectorAll(".lang-btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle("is-active", btns[i].getAttribute("data-lang") === l);
    }
    document.dispatchEvent(new CustomEvent("ifc:langchange", { detail: { lang: l } }));
  };

  function buildSwitcher() {
    var host = document.getElementById("langSwitch");
    if (!host) return;
    var flags = { en: FLAG_EN, my: FLAG_MM, th: FLAG_TH };
    var labels = { en: "EN", my: "MY", th: "TH" };
    ["en", "my", "th"].forEach(function (l) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "lang-btn" + (l === LANG ? " is-active" : "");
      b.setAttribute("data-lang", l);
      b.title = labels[l];
      b.setAttribute("aria-label", "Language: " + labels[l]);
      b.innerHTML = flags[l] + "<span>" + labels[l] + "</span>";
      b.addEventListener("click", function () { window.setLang(l); });
      host.appendChild(b);
    });
  }

  function applyOnLoad() {
    document.documentElement.lang = LANG;
    buildSwitcher();
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = window.t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", window.t(el.getAttribute("data-i18n-placeholder")));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyOnLoad);
  } else {
    applyOnLoad();
  }
})();