import { Pool } from '@neondatabase/serverless';
var pool = new Pool( { connectionString: process.env.DATABASE_URL } );

export default async function getMessages(req, res) {

    const headers = { "Content-Type": "application/json" };

    if (req.method !== "GET") {
        return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
            status: 405,
            headers: headers,
        });
    }

    const url = new URL(req.url);
    const currentUserId = +url.searchParams.get("currentUserId");
    const selectedUserId = +url.searchParams.get("selectedUserId");

    if (!currentUserId || !selectedUserId) {
        return new Response(JSON.stringify({ error: "Missing ids" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
    
    try {
    
        const result = await pool.query(
            `
                SELECT *
                FROM (
                    SELECT message_id, sender_id, receiver_id, body, created_at, is_read
                    FROM messages
                    WHERE (sender_id = $1 AND receiver_id = $2)
                       OR (sender_id = $2 AND receiver_id = $1)
                    ORDER BY created_at DESC
                    LIMIT 50
                )
                ORDER BY created_at ASC
            `,
            [currentUserId, selectedUserId]
        );

    return new Response(JSON.stringify(result.rows), {
        status: 200,
        headers: headers,
    });

  } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
            headers: headers,
        });
    }
}