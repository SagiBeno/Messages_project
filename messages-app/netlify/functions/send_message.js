import { Pool } from "@neondatabase/serverless";

var pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function sendMessage(req) {
    const headers = { "Content-Type": "application/json" };

    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
            status: 405,
            headers: headers,
        });
    }

    const reqBody = await req.json().catch(() => ({}));
    const senderId = +reqBody.senderId;
    const receiverId = +reqBody.receiverId;
    const messageBody = reqBody.body?.trim();

    if (!senderId || !receiverId || !messageBody) {
        return new Response(JSON.stringify({ error: "Missing data" }), {
            status: 400,
            headers: headers,
        });
    }

    if (senderId === receiverId) {
        return new Response(JSON.stringify({ error: "Cannot message yourself" }), {
            status: 400,
            headers: headers,
        });
    }

    try {
        const result = await pool.query(
            `
                INSERT INTO messages (sender_id, receiver_id, body, is_read)
                VALUES ($1, $2, $3, false)
                RETURNING message_id, sender_id, receiver_id, body, created_at, is_read
            `,
            [senderId, receiverId, messageBody]
        );

        return new Response(JSON.stringify(result.rows[0]), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("send_message error:", err);
        return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}