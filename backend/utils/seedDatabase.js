// utils/seedDatabase.js
import Tenant from '../models/Tenant.js';
import User from '../models/User.js';

export const seedDatabase = async () => {
    try {
        // Check if data already exists
        const existingTenants = await Tenant.countDocuments();
        if (existingTenants > 0) {
            console.log('Database already seeded');
            return;
        }

        console.log('Seeding database...');

        // Create tenants
        const acmeTenant = await Tenant.create({
            name: 'Acme Corporation',
            slug: 'acme',
            subscription: 'free',
            maxNotes: 3
        });

        const globexTenant = await Tenant.create({
            name: 'Globex Corporation',
            slug: 'globex',
            subscription: 'free',
            maxNotes: 3
        });

        // Create test users
        const testUsers = [
            {
                name: 'Acme Admin',
                email: 'admin@acme.test',
                password: 'password',
                role: 'admin',
                tenant: acmeTenant._id
            },
            {
                name: 'Acme User',
                email: 'user@acme.test',
                password: 'password',
                role: 'member',
                tenant: acmeTenant._id
            },
            {
                name: 'Globex Admin',
                email: 'admin@globex.test',
                password: 'password',
                role: 'admin',
                tenant: globexTenant._id
            },
            {
                name: 'Globex User',
                email: 'user@globex.test',
                password: 'password',
                role: 'member',
                tenant: globexTenant._id
            }
        ];

        for (const userData of testUsers) {
            await User.create(userData);
        }

        console.log('✅ Database seeded with tenants and test users');
        console.log('Test accounts created:');
        console.log('- admin@acme.test (Admin, Acme)');
        console.log('- user@acme.test (Member, Acme)');
        console.log('- admin@globex.test (Admin, Globex)');
        console.log('- user@globex.test (Member, Globex)');
        console.log('Password for all accounts: password');

    } catch (error) {
        console.error('Database seeding error:', error.message);
        throw error;
    }
};