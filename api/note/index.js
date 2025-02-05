/* Updated index.js to handle note creation with editKey */

import * as db from '../../api/db.js';

/**
 * Generate a random string for edit keys
 */
function generateEditKey(length = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(x => chars[x % chars.length])
    .join('');
}

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
      if (!context.env.NOTES_KV) {
        throw new Error('NOTES_KV binding is not configured');
      }

      const { text } = await request.json();
      const id = Date.now().toString();
      const editKey = generateEditKey();
      
      // Save note with editKey
      const note = { id, text, editKey };
      await context.env.NOTES_KV.put(`note:${id}`, JSON.stringify(note));
      
      // Return only id and editKey to the client
      return new Response(JSON.stringify({ id, editKey }), { status: 201, headers });
    } else {
      return new Response(JSON.stringify({ error: `Method ${request.method} Not Allowed` }), {
        status: 405,
        headers: { ...headers, Allow: 'GET, POST, OPTIONS' }
      });
    }
  } catch (error) {
    console.error('Error handling request:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }
}
