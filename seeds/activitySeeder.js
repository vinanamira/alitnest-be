import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import ActivityExercise from '../models/activityExercise.js';

dotenv.config();
mongoose.set("strictQuery", false);

const MONGO_URI = process.env.MONGODB_URI;

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
        });
        console.log('MongoDB terhubung...');

        await ActivityExercise.deleteMany({});
        console.log('Collection ActivityExercise berhasil dikosongkan.');

        const results = [];
        const filePath = path.resolve('./tabel-mets.csv');

        fs.createReadStream(filePath)
            .pipe(csv({
                mapHeaders: ({ header }) => header.trim() 
            }))
            .on('data', (data) => {
                const activityData = {
                    activityName: data.activityName,
                    activityType: data.activityType,
                    mets: parseFloat(data.mets)
                };
                results.push(activityData);
            })
            .on('end', async () => {
                if (results.length > 0) {
                    await ActivityExercise.insertMany(results);
                    console.log(`${results.length} data berhasil dimasukkan ke database.`);
                } else {
                    console.log('Tidak ada data untuk di-seed.');
                }

                mongoose.connection.close();
                console.log('Koneksi MongoDB ditutup.');
            });

    } catch (error) {
        console.error('Error saat seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();