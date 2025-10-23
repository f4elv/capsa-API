import prisma from "../prisma/client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) return res.status(400).json({ message: "Usuário já cadastrado" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        res.status(201).json({ message: "Usuário criado com sucesso", user });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário", error: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: "Credenciais inválidas" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Credenciais inválidas" });   

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Login bem-sucedido", token });
    } catch (error) {
        res.status(500).json({ error: "Erro ao fazer login", error: error.message });
    } 
}

export const getMe = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true }
        });
        if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro ao buscar usuário" });
    }
}   

export const updateUser = async (req, res) => {
    const userId = req.userId;
    const { name, email } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { name, email },
            select: { id: true, name: true, email: true }
        });

        res.status(200).json({ message: "Usuário atualizado com sucesso", updatedUser });
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao atualizar usuário", error: error.message });
    }
}