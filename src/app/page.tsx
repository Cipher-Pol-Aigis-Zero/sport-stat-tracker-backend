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
          params: `No query params`,
          exampleRequest: "/api/players?...",
          exampleResponse: [{
            
    "id": "7bc9f2f8-5032-4286-ae31-dcb3db67e672",
    "first_name": "Andrew",
    "last_name": "Reed",
    "position": "PF",
    "avatar_url": "https://mcoxscmcokkpbmonrxku.supabase.co/storage/v1/object/public/teamLogos/Harrison-Barnes.jpg",
    "jersey_number": 1,
    "team_id": null
  
          },]
        },
      ],
    },
    {
      title: "Teams API",
      description: "Endpoints for fetching teams.",
      routes: [
        {
          method: "GET",
          endpoint: "/api/teams",
          description: "Get all teams .",
          params: "No Params",
          exampleRequest: "/api/teams?...",
          exampleResponse: [
            {
    "team_id": "73b4b864-1a12-4dca-a0c3-015714264ebe",
    "team_name": "Lakers",
    "coach_id": "8caf41cf-edf5-4cb0-93dd-23b94bb24efa",
    "created_at": "2025-08-30T17:06:59.500771",
    "icon_url": "https://mcoxscmcokkpbmonrxku.supabase.co/storage/v1/object/public/teamLogos/f30a3bb5-9352-426e-836f-faeb4d722292.png",
    "lineup": true
  },
          ],
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
    "match_id": "8a3bd8ab-5976-47f2-8710-621753cfd08a",
    "home_team_id": "f32290d1-0069-4452-97fa-4811a868e0d7",
    "away_team_id": "97325c02-cbb3-48a8-a4b6-04736fdb9eb5",
    "match_date": "2025-08-28T22:46:42.898703",
    "location": "Stadium 10",
    "season": "2025 Season",
    "created_at": "2025-09-25T22:46:42.898703",
    "completed": true,
    "home_score": 117,
    "away_score": 93,
    "analyst": "5c6c38f1-94bc-4c56-823f-6ccb116f2aa8",
    "booked": true
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
        © {new Date().getFullYear()} Sports Stat Tracker API — Built with using Next.js
      </footer>
    </main>
  );
}
