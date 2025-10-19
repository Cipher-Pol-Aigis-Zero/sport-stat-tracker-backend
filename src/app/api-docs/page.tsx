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
          description: "Get all players (optionally filtered by teamId or teamIds).",
          params: `?teamId=<id> or ?teamIds=<id1,id2>`,
          exampleRequest: "/api/players?teamId=1",
          exampleResponse: {
            id: "p1",
            first_name: "John",
            last_name: "Doe",
            position: "Forward",
            jersey_number: 10,
            team_id: 1,
            avatar_url: "/avatars/player3.jpg",
          },
        },
        {
          method: "POST",
          endpoint: "/api/players",
          description: "Create a new player record.",
          exampleRequest: `{
  "first_name": "Alex",
  "last_name": "Smith",
  "position": "Goalkeeper",
  "jersey_number": 1,
  "team_id": 2
}`,
          exampleResponse: {
            message: "Player created successfully",
            id: "new_player_id",
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
          description: "Get all teams (optionally filtered by comma-separated IDs).",
          params: "?ids=<id1,id2,id3>",
          exampleRequest: "/api/teams?ids=1,2",
          exampleResponse: [
            {
              team_id: 1,
              name: "Wits FC",
              location: "Johannesburg",
            },
          ],
        },
        {
          method: "POST",
          endpoint: "/api/teams",
          description: "Create a new team.",
          exampleRequest: `{
  "name": "Wits FC",
  "location": "Johannesburg"
}`,
          exampleResponse: {
            message: "Team created successfully",
            team_id: 1,
          },
        },
      ],
    },
    {
      title: "Matches API",
      description: "Endpoints for match data and statistics.",
      routes: [
        {
          method: "GET",
          endpoint: "/api/matches",
          description: "Get all matches with optional filters (e.g., date, teamId).",
          params: "?date=2025-10-19&teamId=1",
          exampleRequest: "/api/matches?teamId=1",
          exampleResponse: [
            {
              match_id: 5,
              home_team: "Wits FC",
              away_team: "UCT FC",
              date: "2025-10-19",
              score: "3-1",
            },
          ],
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 px-6 py-12">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Sports Stat Tracker API</h1>
      <p className="text-gray-600 mb-10 max-w-2xl">
        A RESTful API for managing players, teams, and match data in your sports tracking application.
      </p>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="bg-white shadow-md rounded-2xl p-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() =>
                setOpenSection(openSection === section.title ? null : section.title)
              }
            >
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <span className="text-blue-600">
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
        © {new Date().getFullYear()} Sports Stat Tracker API — Built with ❤️ using Next.js
      </footer>
    </main>
  );
}
