import 'reflect-metadata';

import app from './app';
import config from './config/config';
import { pool } from './config/postgres';
import { AppDataSource } from './config/typeorm';

async function main() {
    try {
        await pool.query('SELECT 1');

        await AppDataSource.initialize();

        app.listen(config.PORT, config.HOST, () => {
            console.info(`App is running on http://${config.HOST}:${config.PORT}`);
        });
    } catch (error) {
        console.error('Failed to start application:', error);
        process.exit(1);
    }
}

void main();
