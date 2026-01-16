import { Pool } from "@neondatabase/serverless";
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const json = (data, status = 200) =>
    new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });

export async function requireAdmin(adminUserId) {
    const id = +adminUserId;
    if (!id) return { ok: false, status: 401, error: "Missing adminUserId" };

    const r = await pool.query(
        `SELECT user_id, type FROM users WHERE user_id = $1`,
        [id]
    );

    if (r.rowCount === 0) return { ok: false, status: 401, error: "Unknown user" };
    if (r.rows[0].type !== "admin") return { ok: false, status: 403, error: "Forbidden" };

    return { ok: true };
}
