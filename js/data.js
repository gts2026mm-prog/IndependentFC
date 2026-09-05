/* ============================================================
   INDEPENDENT FOOTBALL CLUB — Site Data
   Edit this file to update fixtures, results, squad, news, etc.
   Pages render from this data automatically.
   ============================================================ */
window.IFC = window.IFC || {};

/* ---------- Club info ---------- */
IFC.club = {
  name: "Independent FC",
  short: "IFC",
  nickname: "The Independents",
  founded: 1978,
  stadium: "Independence Park",
  capacity: "12,500",
  league: "Carabao 7-a-side 2026",
  colors: "Navy & Gold",
  motto: "Forged by the City. United by Pride."
};

/* ---------- Next fixture (for countdown) ---------- */
IFC.nextFixture = {
  home: true,
  opponent: "Riverside Athletic",
  competition: "Carabao 7-a-side 2026",
  date: "2026-09-19T15:00:00",
  venue: "Independence Park"
};

/* ---------- Latest match result ---------- */
IFC.latestResult = {
  opponent: "Harbour City",
  competition: "Carabao 7-a-side 2026",
  played: true,
  venue: "Harbour City Ground",
  homeGoals: 3,
  awayGoals: 1,
  date: "2026-09-05",
  scorers: ["J. Mensah (23')", "L. Okafor (51')", "R. Duarte (78')"]
};

/* ---------- Fixtures & results ---------- */
IFC.fixtures = [
  { comp: "Carabao 7-a-side 2026", date: "2026-09-12", home: false, opp: "Eastgate United", venue: "Eastgate Stadium", status: "upcoming" },
  { comp: "Carabao 7-a-side 2026", date: "2026-09-19", home: true, opp: "Riverside Athletic", venue: "Independence Park", status: "upcoming" },
  { comp: "National Cup — Round 3", date: "2026-09-26", home: true, opp: "Northbridge Town", venue: "Independence Park", status: "upcoming" },
  { comp: "Carabao 7-a-side 2026", date: "2026-10-03", home: false, opp: "Windsor Wanderers", venue: "Windsor Park", status: "upcoming" },
  { comp: "Carabao 7-a-side 2026", date: "2026-10-10", home: true, opp: "Kingsley City", venue: "Independence Park", status: "upcoming" }
];

IFC.results = [
  { comp: "Carabao 7-a-side 2026", date: "2026-09-05", home: false, opp: "Harbour City", for: 3, against: 1, result: "W", scorers: ["J. Mensah 23'", "L. Okafor 51'", "R. Duarte 78'"] },
  { comp: "Carabao 7-a-side 2026", date: "2026-08-30", home: true, opp: "Milton Rovers", for: 1, against: 1, result: "D", scorers: ["A. Petrova 44'"] },
  { comp: "National Cup — Round 2", date: "2026-08-23", home: false, opp: "Stonebridge", for: 2, against: 0, result: "W", scorers: ["J. Mensah 12'", "T. Bello 68'"] },
  { comp: "Carabao 7-a-side 2026", date: "2026-08-16", home: true, opp: "Iron Works", for: 0, against: 2, result: "L", scorers: [] },
  { comp: "Carabao 7-a-side 2026", date: "2026-08-09", home: false, opp: "Greenfield", for: 2, against: 1, result: "W", scorers: ["L. Okafor 30'", "R. Duarte 88'"] }
];

/* ---------- League table ---------- */
IFC.table = [
  { pos: 1, team: "Independent FC", p: 5, w: 4, d: 1, l: 0, gf: 12, ga: 4, pts: 13 },
  { pos: 2, team: "Harbour City", p: 5, w: 4, d: 0, l: 1, gf: 11, ga: 5, pts: 12 },
  { pos: 3, team: "Riverside Athletic", p: 5, w: 3, d: 2, l: 0, gf: 9, ga: 4, pts: 11 },
  { pos: 4, team: "Windsor Wanderers", p: 5, w: 3, d: 1, l: 1, gf: 8, ga: 5, pts: 10 },
  { pos: 5, team: "Eastgate United", p: 5, w: 2, d: 2, l: 1, gf: 7, ga: 6, pts: 8 },
  { pos: 6, team: "Milton Rovers", p: 5, w: 2, d: 2, l: 1, gf: 6, ga: 5, pts: 8 },
  { pos: 7, team: "Kingsley City", p: 5, w: 2, d: 1, l: 2, gf: 6, ga: 7, pts: 7 },
  { pos: 8, team: "Northbridge Town", p: 5, w: 1, d: 2, l: 2, gf: 5, ga: 7, pts: 5 },
  { pos: 9, team: "Iron Works", p: 5, w: 1, d: 1, l: 3, gf: 4, ga: 8, pts: 4 },
  { pos: 10, team: "Stonebridge", p: 5, w: 1, d: 0, l: 4, gf: 3, ga: 10, pts: 3 }
];

/* ---------- Squad ---------- */
IFC.squad = [
  { num: 1, name: "Kyaw Kyaw Lwin", age: 38, pos: "Goalkeeper", apps: 0, goals: 0, assists: 0, captain: false },
  { num: 2, name: "Thura Aung", age: 23, pos: "Defender", apps: 0, goals: 0, assists: 0, captain: false },
  { num: 3, name: "Kyaw Lin", age: 39, pos: "Defender", apps: 0, goals: 0, assists: 0, captain: false },
  { num: 4, name: "Htwe Ko Ko", age: 28, pos: "Defender", apps: 0, goals: 0, assists: 0, captain: false },
  { num: 5, name: "Aung Myo Khaing", age: 27, pos: "Defender", apps: 0, goals: 0, assists: 0, captain: false },
  { num: 6, name: "Nanda Oo", age: 28, pos: "Midfielder", apps: 0, goals: 0, assists: 0, captain: false },
  { num: 7, name: "Sam Som Seng", age: 22, pos: "Forward", apps: 0, goals: 0, assists: 0, captain: false },
  { num: 8, name: "Hein Htet Aung", age: 22, pos: "Midfielder", apps: 0, goals: 0, assists: 0, captain: false },
  { num: 9, name: "Zin Min Htet", age: 22, pos: "Forward", apps: 0, goals: 0, assists: 0, captain: false },
  { num: 10, name: "Sun Tun", age: 23, pos: "Midfielder", apps: 0, goals: 0, assists: 0, captain: false },
  { num: 11, name: "Thin Naing Oo", age: 22, pos: "Forward", apps: 0, goals: 0, assists: 0, captain: false },
  { num: 12, name: "Oo Way", age: 26, pos: "Midfielder", apps: 0, goals: 0, assists: 0, captain: false },
  { num: 13, name: "Zay Zay Aung", age: 26, pos: "Goalkeeper", apps: 0, goals: 0, assists: 0, captain: false },
  { num: 14, name: "Khant Htet Kyaw", age: 23, pos: "Midfielder", apps: 0, goals: 0, assists: 0, captain: false },
  { num: 15, name: "Zaw Htet", age: 31, pos: "Defender", apps: 0, goals: 0, assists: 0, captain: false },
  { num: 16, name: "Kinram Loawu", age: 21, pos: "Forward", apps: 0, goals: 0, assists: 0, captain: false },
  { num: 17, name: "Hein Si Thu", age: 22, pos: "Forward", apps: 0, goals: 0, assists: 0, captain: false },
  { num: 18, name: "Kaung Khant San", age: 26, pos: "Midfielder", apps: 0, goals: 0, assists: 0, captain: false },
  { num: 19, name: "Thein Phyo Aung", age: 23, pos: "Forward", apps: 0, goals: 0, assists: 0, captain: false }
];

/* ---------- Featured partner ---------- */
IFC.partner = {
  desc: "Translator, passport & Visa service, Transportation service.",
  logo: "assets/img/partner.jpg",
  link: "https://www.facebook.com/profile.php?id=61573285617073"
};

/* ---------- Membership tiers ---------- */
IFC.membership = [
  { name: "Supporters Club", price: "THB 10", featured: false, per: "/ month", features: ["Priority ticket window", "Matchday programme", "10% off in the club shop", "Members' newsletter"] },
  { name: "1882 Member", price: "THB 50", featured: true, per: "/ month", features: ["Guaranteed season ticket", "Free away travel", "20% off in the club shop", "Access to members' lounge", "Voting rights at AGM"] },
  { name: "Junior IFC", price: "THB 100", featured: false, per: "/ month", features: ["Kids 12 & under", "Free entry to home games", "Birthday card & gift", "Junior academy discount"] }
];

/* ---------- Social links ---------- */
IFC.social = {
  facebook: "https://www.facebook.com/profile.php?id=61581583439195",
  tiktok: "https://tiktok.com/@independentfc",
  youtube: "https://youtube.com/@independentfc",
  feedCode: ""
};
