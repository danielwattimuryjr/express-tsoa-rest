import { AppDataSource } from '../typeorm';
import { clearTablesData } from './clearTablesData';
import { seedPermissions } from './permissionSeeder';
import { seedRolePermissions } from './rolePermissionSeeder';
import { seedRoles } from './roleSeeder';

async function seed() {
    await AppDataSource.initialize();

    try {
        console.log('🌱 Seeding database...');

        await clearTablesData();

        await seedPermissions();
        await seedRoles();
        await seedRolePermissions();

        console.log('✅ Database seeded successfully');
    } catch (error) {
        console.error('❌ Database seeding failed');
        console.error(error);

        process.exitCode = 1;
    } finally {
        await AppDataSource.destroy();
    }
}

seed();
