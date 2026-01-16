import { json, requireAdmin, pool } from "./isAdmin.js";

export default async function listForAdmins(req) {
    const headers = { "Content-Type": "application/json" };

    if (req.method !== "GET") return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405, headers: headers  });

    const url = new URL(req.url);
    const adminUserId = url.searchParams.get("adminUserId");
    const type = url.searchParams.get("type").toLowerCase();

    const auth = await requireAdmin(adminUserId);
    if (!auth.ok) return new Response (JSON.stringify( {error: auth.error}, { status: auth.status, headers: headers } ));

    try {
        const result = await pool.query(
            `
                SELECT user_id, full_name, email, username
                FROM users
                WHERE type = $1
                ORDER BY full_name
            `,
            [type]
        );

        return new Response(
            JSON.stringify(result.rows),
            {
                status: 200,
                headers: headers
            }
        );
    } catch (err) {
        return new Response(
            JSON.stringify( { error: 'Internal Server Error' } ),
            {
                status: 500,
                headers: headers
            }
        );
    }
}
