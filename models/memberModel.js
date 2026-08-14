const db = require("../config/db");

// ================= Get All Members =================

exports.getAllMembers = async () => {

    const [rows] = await db.execute(`
        SELECT *
        FROM members
        ORDER BY id DESC
    `);

    return rows;

};

// ================= Get Members (Pagination) =================

exports.getMembers = async (limit, offset) => {

    limit = parseInt(limit) || 10;
    offset = parseInt(offset) || 0;

    const sql = `
        SELECT *
        FROM members
        ORDER BY id DESC
        LIMIT ${limit} OFFSET ${offset}
    `;

    const [rows] = await db.execute(sql);

    return rows;

};
// ================= Total Member Count =================

exports.getMemberCount = async () => {

    const [rows] = await db.execute(`
        SELECT COUNT(*) AS total
        FROM members
    `);

    return rows[0].total;

};

// ================= Get Member By ID =================

exports.getMemberById = async (id) => {

    const [rows] = await db.execute(

        "SELECT * FROM members WHERE id=?",

        [id]

    );

    return rows[0];

};

exports.updateProfile = async (id, member) => {

    return db.execute(

        `UPDATE members
        SET
            fullname=?,
            email=?,
            phone=?,
            address=?,
            department=?,
            dob=?,
            gender=?,
            blood_group=?,
            occupation=?,
            profile_photo=?
        WHERE id=?`,

        [

            member.fullname,
            member.email,
            member.phone,
            member.address,
            member.department,
            member.dob,
            member.gender,
            member.blood_group,
            member.occupation,
            member.profile_photo,
            id

        ]

    );

};
// ================= Add Member =================

exports.addMember = async (member) => {

    return db.execute(
        `
        INSERT INTO members
        (
            fullname,
            email,
            phone,
            address,
            photo,
            public_id
        )
        VALUES (?,?,?,?,?,?)
        `,
        [
            member.fullname,
            member.email,
            member.phone,
            member.address,
            member.photo,
            member.public_id
        ]
    );

};

// ================= Update Member =================

exports.updateMember = async (id, member) => {

    return db.execute(
        `
        UPDATE members
        SET
            fullname=?,
            email=?,
            phone=?,
            address=?,
            photo=?,
            public_id=?
        WHERE id=?
        `,
        [
            member.fullname,
            member.email,
            member.phone,
            member.address,
            member.photo,
            member.public_id,
            id
        ]
    );

};
// ================= Delete Member =================

exports.deleteMember = async (id) => {

    return db.execute(
        `
        DELETE FROM members
        WHERE id=?
        `,
        [id]
    );

};
// Update Password
exports.updatePassword = async (id, password) => {

    return db.execute(

        `
        UPDATE members
        SET password=?
        WHERE id=?
        `,

        [

            password,

            id

        ]

    );

};