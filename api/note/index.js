/* Updated index.js to handle OPTIONS requests for CORS preflight */

import * as db from '../../api/db.js';

/**
 * Cloudflare Pages Function to handle GET, POST, and OPTIONS for notes
 */
export async function onRequest(context) {
  const { request } = context;
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  try {
    if (request.method === 'GET') {
      const notes = await db.getNotes();
      return new Response(JSON.stringify(notes), { status: 200, headers });
    } else if (request.method === 'POST') {
      const { text } = await request.json();
      const note = { text };
      const saved = await db.saveNote(note);
      return new Response(JSON.stringify(saved), { status: 201, headers });
    } else {
      return new Response(JSON.stringify({ error: `Method ${request.method} Not Allowed` }), {
        status: 405,
        headers: { ...headers, Allow: 'GET, POST, OPTIONS' }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }
}
