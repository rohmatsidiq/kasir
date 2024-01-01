import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        const response = await prisma.user.create({
            data: {
                name: req.body.name,
                username: req.body.username,
                password: hashPassword,
                type: req.body.type,
            },
        });

        res.status(200).json({
            success: true,
            message: "Berhasil register",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Gagal register",
            error: error,
        });
    }
};

export const login = async (req, res) => {
    try {
        // cari username di database
        const user = await prisma.user.findMany({
            where: {
                username: req.body.username,
            },
        });

        // jika username tidak ditemukan
        if (user.length == 0) {
            return res.status(200).json({
                success: false,
                message: "User tidak ditemukan",
            });
        }

        // validasi password
        const validate = bcrypt.compareSync(
            req.body.password,
            user[0].password
        );

        // jika password salah
        if (!validate) {
            return res.status(200).json({
                success: false,
                message: "Password salah",
            });
        }

        // buat token
        const token = jwt.sign(
            {
                id: user[0].id,
                username: user[0].username,
            },
            "rahasia"
        );

        res.status(200).json({
            success: true,
            message: "Berhasil login",
            user: user[0],
            token: token,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Gagal login",
            error: error,
        });
    }
};
