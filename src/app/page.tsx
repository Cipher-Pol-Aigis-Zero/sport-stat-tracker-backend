"use client";

import { useState } from "react";

type ApiSection = {
  title: string;
  description: string;
  routes: {
    method: string;
    endpoint: string;
    description: string;
    params?: string;
    exampleRequest?: string;
    exampleResponse?: object;
  }[];
};

export default function ApiDocsPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const sections: ApiSection[] = [
    {
      title: "Players API",
      description: "Endpoints for fetching and managing player data.",
      routes: [
        {
          method: "GET",
          endpoint: "/api/players",
          description: "Get all players in the database.",
          params: "No query params",
          exampleRequest: "/api/players",
          exampleResponse: [
            {
              id: "7bc9f2f8-5032-4286-ae31-dcb3db67e672",
              first_name: "Andrew",
              last_name: "Reed",
              position: "PF",
              avatar_url:
                "https://mcoxscmcokkpbmonrxku.supabase.co/storage/v1/object/public/teamLogos/Harrison-Barnes.jpg",
              jersey_number: 1,
              team_id: null,
            },
          ],
        },
        {
          method: "GET",
          endpoint: "/api/player_stats",
          description:
            "Fetch player stats, optionally filtered by matchId or teamId.",
          params: "?matchId=<match_id>&teamId=<team_id>",
          exampleRequest: "/api/player_stats?matchId=123",
          exampleResponse: {
            data: [
              {
                id: "stat1",
                match_id: "match123",
                player_id: "player1",
                points: 25,
                assists: 5,
                rebounds: 7,
                players: {
                  first_name: "LeBron",
                  last_name: "James",
                  jersey_number: 23,
                  position: "SF",
                  team_id: "team1",
                },
              },
            ],
          },
        },
        {
          method: "POST",
          endpoint: "/api/player_stats",
          description: "Add a new player stat entry.",
          params: "Body JSON with player stat fields",
          exampleRequest: `{
  "match_id": "match123",
  "player_id": "player1",
  "points": 25,
  "assists": 5
}`,
          exampleResponse: {
            data: {
              id: "new_stat_id",
              match_id: "match123",
              player_id: "player1",
              points: 25,
              assists: 5,
            },
          },
        },
      ],
    },
    {
      title: "Teams API",
      description: "Endpoints for fetching and managing teams.",
      routes: [
        {
          method: "GET",
          endpoint: "/api/teams",
          description: "Get all teams.",
          params: "No params",
          exampleRequest: "/api/teams",
          exampleResponse: [
            {
              team_id: "73b4b864-1a12-4dca-a0c3-015714264ebe",
              team_name: "Lakers",
              coach_id: "8caf41cf-edf5-4cb0-93dd-23b94bb24efa",
              icon_url:
                "https://mcoxscmcokkpbmonrxku.supabase.co/storage/v1/object/public/teamLogos/f30a3bb5-9352-426e-836f-faeb4d722292.png",
              lineup: true,
            },
          ],
        },
        {
          method: "GET",
          endpoint: "/api/teams/[teamsid]",
          description:
            "Get full team details (coach, players, matches) by teamId.",
          params: "?teamsid=<team_id>",
          exampleRequest:
            "/api/teams/73b4b864-1a12-4dca-a0c3-015714264ebe",
          exampleResponse: {
            team: {
              team_id: "73b4b864-1a12-4dca-a0c3-015714264ebe",
              team_name: "Lakers",
              coach: {
                coach_id: "8caf41cf-edf5-4cb0-93dd-23b94bb24efa",
                user: { first_name: "John", last_name: "Doe", role: "Coach" },
              },
            },
            players: [
              {
                player_id: "p1",
                first_name: "LeBron",
                last_name: "James",
                position: "SF",
                jersey_number: 23,
                points: 30,
                assists: 10,
              },
            ],
            matches: [
              {
                match_id: "m1",
                home_team_id: "73b4b864-1a12-4dca-a0c3-015714264ebe",
                away_team_id: "another_team",
                home_score: 120,
                away_score: 118,
              },
            ],
          },
        },
        {
          method: "GET",
          endpoint: "/api/teams/team-logos",
          description:
            "Fetch and update a team’s logo from ESPN if missing or placeholder.",
          params: "?teamId=<team_id>",
          exampleRequest:
            "/api/teams/team-logos?teamId=73b4b864-1a12-4dca-a0c3-015714264ebe",
          exampleResponse: {
            logoUrl:
              "https://mcoxscmcokkpbmonrxku.supabase.co/storage/v1/object/public/teamLogos/lakers.png",
          },
        },
        {
          method: "POST",
          endpoint: "/api/TeamStats",
          description:
            "Get full team statistics either by auth_user_id or team_id.",
          params: "Body JSON: { auth_user_id?: string, team_id?: string }",
          exampleRequest: `{
  "auth_user_id": "user123"
}`,
          exampleResponse: {
            team_name: "Lakers",
            num_players: 12,
            last_5_matches: [
              { match_id: "m1", home_score: 120, away_score: 118 },
            ],
            player_stats: [
              { player_id: "p1", points: 25, assists: 5 },
            ],
          },
        },
        {
          method: "GET",
          endpoint: "/api/matches_by_coachID",
          description: "Get matches for all teams coached by the specified coach.",
          params: "?coachId=<coach_id>",
          exampleRequest: "/api/matches_by_coachID?coachId=8caf41cf-edf5-4cb0-93dd-23b94bb24efa",
          exampleResponse: [
            {
              match_id: "m1",
              home_team_id: "team1",
              away_team_id: "team2",
              match_date: "2025-08-28T22:46:42.898703",
              completed: true,
            },
          ],
        },
      ],
    },
    {
      title: "Search API",
      description: "Search for players and teams by query string.",
      routes: [
        {
          method: "GET",
          endpoint: "/api/search",
          description:
            "Search players and teams by name using the 'q' query param.",
          params: "?q=<search-term>",
          exampleRequest: "/api/search?q=LeBron",
          exampleResponse: {
            players: [
              {
                player_id: "p1",
                first_name: "LeBron",
                last_name: "James",
                team_id: "team1",
              },
            ],
            teams: [
              {
                team_id: "team1",
                team_name: "Lakers",
                icon_url: "...",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Matches API",
      description: "Endpoints for fetching and managing match data.",
      routes: [
        {
          method: "GET",
          endpoint: "/api/matches",
          description:
            "Get all matches with optional filters (e.g., teamId, date).",
          params: "?teamId=<team_id>&date=<yyyy-mm-dd>",
          exampleRequest: "/api/matches?teamId=1",
          exampleResponse: [
            {
              match_id: "8a3bd8ab-5976-47f2-8710-621753cfd08a",
              home_team_id: "f32290d1-0069-4452-97fa-4811a868e0d7",
              away_team_id: "97325c02-cbb3-48a8-a4b6-04736fdb9eb5",
              match_date: "2025-08-28T22:46:42.898703",
              location: "Stadium 10",
              season: "2025 Season",
              completed: true,
              home_score: 117,
              away_score: 93,
            },
          ],
        },
      ],
    },
    {
  title: "Lineups API",
  description: "Endpoints to manage and fetch default team lineups.",
  routes: [
    {
      method: "POST",
      endpoint: "/api/lineups/UpdateDefault",
      description: "Update the default starting lineup and reserves for a team.",
      params: `Body JSON: {
  startingLineup: [{ playerID, teamID, isStarting, position }],
  reserves: [{ playerID, teamID, isStarting, position }]
}`,
      exampleRequest: `{
  "startingLineup": [
    { "playerID": "p1", "teamID": "t1", "isStarting": true, "position": "PG" }
  ],
  "reserves": [
    { "playerID": "p6", "teamID": "t1", "isStarting": false, "position": "SG" }
  ]
}`,
      exampleResponse: {
        message: "Default lineup updated successfully ✅",
      },
    },
    {
      method: "POST",
      endpoint: "/api/lineups/GetDefault",
      description:
        "Get the default lineup for a coach using their auth_user_id.",
      params: `Body JSON: { auth_user_id: string }`,
      exampleRequest: `{
  "auth_user_id": "user123"
}`,
      exampleResponse: {
        message: "Default lineup retrieved ✅",
        lineup: [
          {
            id: "entry1",
            player_id: "p1",
            team_id: "t1",
            is_starting: true,
            position: "PG",
            player_name: "LeBron James",
          },
        ],
      },
    },
  ],
},
{
  title: "History API",
  description: "Fetch full historical data of teams, players, and matches.",
  routes: [
    {
      method: "GET",
      endpoint: "/api/history",
      description:
        "Retrieve all teams, players, matches, and summary statistics.",
      exampleRequest: "/api/history",
      exampleResponse: {
        teams: [
          {
            team_id: "t1",
            team_name: "Lakers",
            total_points: 256,
            players: [
              { player_id: "p1", first_name: "LeBron", points: 30 },
            ],
          },
        ],
        players: [
          { player_id: "p1", first_name: "LeBron", points: 30 },
        ],
        matches: [
          {
            match_id: "m1",
            home_team_name: "Lakers",
            away_team_name: "Warriors",
            home_score: 120,
            away_score: 118,
          },
        ],
        summary: { totalTeams: 5, totalPlayers: 30, totalMatches: 12 },
      },
    },
  ],
},
{
  title: "Game Booking API",
  description: "Endpoints to assign analysts to matches.",
  routes: [
    {
      method: "POST",
      endpoint: "/api/GameBooking",
      description:
        "Assign an analyst to a match. Ensures the match does not already have an analyst.",
      params: `Body JSON: {
  matchId: string,
  analystId: string
}`,
      exampleRequest: `{
  "matchId": "m123",
  "analystId": "a456"
}`,
      exampleResponse: {
        message: "Analyst assigned successfully ✅",
        match: {
          match_id: "m123",
          analyst: "a456",
        },
      },
    },
  ],
},
{
  title: "Fan Dashboard API",
  description: "Endpoint to fetch aggregated fan dashboard data using an RPC call.",
  routes: [
    {
      method: "GET",
      endpoint: "/api/fan-dashboard",
      description:
        "Fetch fan dashboard data. Uses Supabase RPC `get_fan_dashboard` to retrieve info.",
      exampleRequest: "/api/fan-dashboard",
      exampleResponse: {
        totalFans: 1234,
        topTeams: [
          { team_id: "t1", team_name: "Lakers", points: 256 },
        ],
        upcomingMatches: [
          {
            match_id: "m1",
            home_team: "Lakers",
            away_team: "Warriors",
            match_date: "2025-10-20T18:00:00Z"
          }
        ],
      },
    },
  ],
},
{
  title: "Game & Analyst APIs",
  description: "Endpoints for managing booked games, match details, and player info.",
  routes: [
    {
      method: "GET",
      endpoint: "/api/Booked_Games",
      description: "Fetch booked games for a specific user based on role (Analyst/Admin).",
      params: "Query parameters: ?userId=<userId>&role=<role>",
      exampleResponse: [
        {
          id: "b123",
          created_at: "2025-10-19T10:00:00Z",
          basketball_history: {
            match_id: "m123",
            home_team: "Team A",
            away_team: "Team B",
            score: "102-98"
          }
        }
      ]
    },
    {
      method: "GET",
      endpoint: "/api/analyst/[matchid]",
      description: "Fetch all details of a specific match including lineups, events, and last 5 matches for home/away teams.",
      params: "Path param: matchid=<match_id>",
      exampleResponse: {
        matchMetaData: { match_id: "m123", home_team_id: "t1", away_team_id: "t2", completed: true },
        Teams: [
          { team_id: "t1", team_name: "Team A", coach_id: "c1", icon_url: "iconA.png" },
          { team_id: "t2", team_name: "Team B", coach_id: "c2", icon_url: "iconB.png" }
        ],
        lineups: {
          homeLineup: [{ player_id: "p1", first_name: "John", last_name: "Doe", position: "PG" }],
          awayLineup: [{ player_id: "p2", first_name: "Jane", last_name: "Smith", position: "SG" }]
        },
        homePrevMatches: [{ match_id: "m120", home_score: 100, away_score: 90 }],
        awayPrevMatches: [{ match_id: "m121", home_score: 88, away_score: 95 }],
        MatchEvents: [{ id: "e1", match_id: "m123", action: "score", points: 2, player_id: "p1" }]
      }
    },
    {
      method: "GET",
      endpoint: "/api/(external api)/pl",
      description: "Fetch all players, optionally filtered by teamId or comma-separated teamIds.",
      params: "Query parameters: ?teamId=<teamId> OR ?teamIds=<id1,id2>",
      exampleResponse: [
        { player_id: "p1", first_name: "John", last_name: "Doe", team_id: "t1", jersey_number: 5 },
        { player_id: "p2", first_name: "Jane", last_name: "Smith", team_id: "t2", jersey_number: 10 }
      ]
    },
    {
      method: "POST",
      endpoint: "/api/(external api)/pl",
      description: "Add a new player to the database.",
      params: `Body JSON: {
        player_id: string,
        first_name: string,
        last_name: string,
        team_id: string,
        jersey_number: number
      }`,
      exampleResponse: { player_id: "p3", first_name: "Alex", last_name: "Taylor", team_id: "t3", jersey_number: 7 }
    },
    {
      method: "GET",
      endpoint: "/api/(external api)/all",
      description: "Fetch all coaches, matches, teams, and users in the system.",
      exampleResponse: {
        coaches: [{ coach_id: "c1", team_id: "t1", user_id: "u1", users: { first_name: "Coach", last_name: "One" } }],
        matches: [{ match_id: "m123", home_team_id: "t1", away_team_id: "t2", completed: true }],
        teams: [{ team_id: "t1", team_name: "Team A", lineup: [], coach: { user_id: "u1", first_name: "Coach" } }],
        users: [{ user_id: "u1", first_name: "Coach", last_name: "One", role: "Coach" }]
      }
    },
    {
      method: "GET",
      endpoint: "/api/(external api)/trails",
      description: "Fetch trails from an external API with optional pagination and filters.",
      params: "Query parameters: ?page=1&limit=10&difficulty=easy&status=active&tags=forest",
      exampleResponse: {
        success: true,
        trails: [{ id: "t1", name: "Forest Trail", difficulty: "easy", status: "active", tags: ["forest"] }],
        pagination: { page: 1, limit: 10, total: 100 }
      }
    }
  ]
},

{
  title: "Coach API",
  description: "Endpoints for managing coaches, teams, and player assignments.",
  routes: [
    {
      method: "POST",
      endpoint: "/api/coach/assign-player",
      description: "Assign a player to a team. Player cannot already belong to a team.",
      params: `Body JSON: {
  playerId: string,
  teamId: string
}`,
      exampleRequest: `{
  "playerId": "p123",
  "teamId": "t456"
}`,
      exampleResponse: {
        success: true,
        data: {
          player_id: "p123",
          team_id: "t456",
          first_name: "John",
          last_name: "Doe"
        }
      },
    },
    {
      method: "POST",
      endpoint: "/api/coach/check",
      description: "Check if the current authenticated user is a coach and retrieve their team_id.",
      exampleResponse: {
        success: true,
        coach: {
          user_id: "u123",
          team_id: "t456",
          other_fields: "...",
        },
        team_id: "t456"
      },
    },
    {
      method: "POST",
      endpoint: "/api/coach/create-team",
      description: "Create a new team and associate it with a coach.",
      params: `Body JSON: {
  team_name: string,
  coach_id: string,
  icon_url?: string
}`,
      exampleResponse: {
        success: true,
        team: {
          team_id: "t123",
          team_name: "New Team",
          coach_id: "u123",
          icon_url: null
        },
        coach: {
          user_id: "u123",
          team_id: "t123"
        }
      },
    },
    {
      method: "GET",
      endpoint: "/api/coach/fetchTeamPlayers",
      description: "Fetch all players belonging to the coach's team.",
      params: "Query parameter: ?coachId=<coach_id>",
      exampleResponse: [
        {
          player_id: "p1",
          first_name: "John",
          last_name: "Doe",
          team_id: "t1"
        },
        {
          player_id: "p2",
          first_name: "Jane",
          last_name: "Smith",
          team_id: "t1"
        }
      ],
    },
    {
      method: "GET",
      endpoint: "/api/coach/free",
      description: "Fetch all unassigned players (players with null team_id).",
      exampleResponse: [
        {
          player_id: "p3",
          first_name: "Free",
          last_name: "Player",
          team_id: null
        }
      ],
    },
    {
      method: "POST",
      endpoint: "/api/DatabaseApi/getCoachTeam",
      description: "Get a coach's team info by user_id.",
      params: `Body JSON: { user_id: string }`,
      exampleResponse: {
        team_id: "t123",
        team_name: "My Awesome Team"
      },
    }
  ]
}




  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 px-6 py-12">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">
        Sports Stat Tracker API
      </h1>
      <p className="text-gray-600 mb-10 max-w-2xl">
        A RESTful API for managing players, teams, and match data in your sports
        tracking application.
      </p>

      <div className="space-y-8">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-white shadow-md rounded-2xl p-6"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() =>
                setOpenSection(
                  openSection === section.title ? null : section.title
                )
              }
            >
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <span className="text-blue-600 text-2xl font-bold">
                {openSection === section.title ? "−" : "+"}
              </span>
            </div>
            <p className="text-gray-500 mt-2">{section.description}</p>

            {openSection === section.title && (
              <div className="mt-6 space-y-6">
                {section.routes.map((route) => (
                  <div
                    key={route.endpoint + route.method}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded text-sm font-semibold ${
                          route.method === "GET"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {route.method}
                      </span>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {route.endpoint}
                      </code>
                    </div>
                    <p className="text-gray-700">{route.description}</p>
                    {route.params && (
                      <p className="text-gray-500 text-sm mt-1">
                        <strong>Query Params:</strong> {route.params}
                      </p>
                    )}
                    {route.exampleRequest && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 font-semibold">
                          Example Request:
                        </p>
                        <pre className="bg-gray-900 text-gray-100 text-sm p-3 rounded-lg overflow-auto">
                          {route.exampleRequest}
                        </pre>
                      </div>
                    )}
                    {route.exampleResponse && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 font-semibold">
                          Example Response:
                        </p>
                        <pre className="bg-gray-100 text-gray-800 text-sm p-3 rounded-lg overflow-auto">
                          {JSON.stringify(route.exampleResponse, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className="mt-16 text-gray-400 text-sm text-center">
        © {new Date().getFullYear()} Sports Stat Tracker API — Built with
        Next.js and Supabase
      </footer>
    </main>
  );
}
