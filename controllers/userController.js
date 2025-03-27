import bcrypt from 'bcrypt';
import User from '../models/user.js';

export const register = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        if (!name || typeof name !== "string" || name.trim() === "") {
            return res.status(400).json({ status: "FAILED", message: "Nama tidak boleh kosong!" });
        }
        if (!email || typeof email !== "string" || email.trim() === "") {
            return res.status(400).json({ status: "FAILED", message: "Email tidak boleh kosong!" });
        }
        if (!password || typeof password !== "string" || password.trim() === "") {
            return res.status(400).json({ status: "FAILED", message: "Password tidak boleh kosong!" });
        }

        name = name.trim();
        email = email.trim();
        password = password.trim();

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            return res.json({ status: "FAILED", message: "Nama tidak valid!" });
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return res.json({ status: "FAILED", message: "Email tidak valid!" });
        }
        if (password.length < 8) {
            return res.json({ status: "FAILED", message: "Password terlalu singkat!" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ status: "FAILED", message: "Email sudah terdaftar!" });
        }
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ name, email, password: hashedPassword });
        const result = await newUser.save();

        res.status(201).json({ status: "SUCCESS", message: "Pendaftaran Berhasil!", data: result });
    } catch (err) {
        res.status(500).json({ status: "FAILED", message: "Error saat pendaftaran!", error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || typeof email !== "string" || email.trim() === "") {
            return res.status(400).json({ status: "FAILED", message: "Email tidak boleh kosong!" });
        }
        if (!password || typeof password !== "string" || password.trim() === "") {
            return res.status(400).json({ status: "FAILED", message: "Password tidak boleh kosong!" });
        }

        email = email.trim();
        password = password.trim();

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "FAILED", message: "Email tidak terdaftar" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: "FAILED", message: "Password Salah!" });
        }
        
        res.json({ status: "SUCCESS", message: "Login Berhasil", data: user });
    } catch (err) {
        res.status(500).json({ status: "FAILED", message: "Error saat login", error: err.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        if (!newPassword || typeof newPassword !== "string" || newPassword.trim() === "") {
            return res.status(400).json({ message: "Password baru tidak boleh kosong!" });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating password", error: error.message });
    }
};

export default {
    register,
    login,
    getUserProfile,
    updateUserProfile,
    updatePassword    
};