// src/data.js

export const categories = ["All", "Football", "Cricket", "Basketball", "Tennis", "Esports"];

export const matches = [
  {
    id: 1,
    sport: "Football",
    league: "Premier League",
    home: "Manchester City",
    away: "Arsenal",
    date: new Date().toISOString(), // Today
    status: "Live",
    score: "2 - 1",
    winProbability: { home: 60, draw: 20, away: 20 },
    ticketPrice: 120,
    streamAvailable: true,
  },
  {
    id: 2,
    sport: "Cricket",
    league: "T20 World Cup",
    home: "India",
    away: "Australia",
    date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    status: "Upcoming",
    score: "0 - 0",
    winProbability: { home: 55, draw: 0, away: 45 },
    ticketPrice: 80,
    streamAvailable: true,
  },
  {
    id: 3,
    sport: "Basketball",
    league: "NBA",
    home: "Lakers",
    away: "Warriors",
    date: new Date(Date.now() + 172800000).toISOString(), // Day after
    status: "Upcoming",
    score: "0 - 0",
    winProbability: { home: 40, draw: 0, away: 60 },
    ticketPrice: 250,
    streamAvailable: false,
  },
  {
    id: 4,
    sport: "Football",
    league: "La Liga",
    home: "Real Madrid",
    away: "Barcelona",
    date: new Date().toISOString(),
    status: "Finished",
    score: "3 - 1",
    winProbability: { home: 0, draw: 0, away: 0 },
    ticketPrice: 0,
    streamAvailable: true, // Highlights
  },
];

export const merchandise = [
  { id: 1, name: "Official Match Ball 2024", price: 49.99, image: "⚽" },
  { id: 2, name: "Team Jersey - Home", price: 89.99, image: "👕" },
  { id: 3, name: "Supporter Cap", price: 25.00, image: "🧢" },
  { id: 4, name: "Limited Ed. Scarf", price: 19.99, image: "🧣" },
];