"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const SALT = 10;
    const adminRole = await prisma.role.upsert({
        where: { name: 'ADMIN' },
        update: {},
        create: { name: 'ADMIN' },
    });
    const clienteRole = await prisma.role.upsert({
        where: { name: 'CLIENTE' },
        update: {},
        create: { name: 'CLIENTE' },
    });
    const alumnoRole = await prisma.role.upsert({
        where: { name: 'ALUMNO' },
        update: {},
        create: { name: 'ALUMNO' },
    });
    const admin = await prisma.user.upsert({
        where: { email: 'admin@melaniapp.com' },
        update: {},
        create: {
            name: 'Admin',
            email: 'admin@melaniapp.com',
            password: await bcrypt.hash('Admin123!', SALT),
            roleId: adminRole.id,
            avatar: 'A',
        },
    });
    const melani = await prisma.user.upsert({
        where: { email: 'melani@trainer.com' },
        update: {},
        create: {
            name: 'Melani González',
            nombre: 'Melani',
            apellido: 'González',
            email: 'melani@trainer.com',
            password: await bcrypt.hash('Melani123!', SALT),
            roleId: clienteRole.id,
            avatar: 'M',
            perfilCliente: {
                create: {
                    clientType: client_1.ClientType.PERSONAL_TRAINER,
                    nombre: 'Melani',
                    apellido: 'González',
                    emailContacto: 'melani@trainer.com',
                    cuit: '27-12345678-3',
                    telefono: '+54 9 11 1234-5678',
                    direccion: 'Av. Corrientes 1234, CABA',
                },
            },
        },
    });
    const laura = await prisma.user.upsert({
        where: { email: 'laura@gmail.com' },
        update: {},
        create: {
            name: 'Laura García',
            nombre: 'Laura',
            apellido: 'García',
            telefono: '+54 9 11 5555-1111',
            email: 'laura@gmail.com',
            password: await bcrypt.hash('Laura123!', SALT),
            roleId: alumnoRole.id,
            clienteId: melani.id,
            avatar: 'L',
        },
    });
    const sofia = await prisma.user.upsert({
        where: { email: 'sofia@gmail.com' },
        update: {},
        create: {
            name: 'Sofia Martínez',
            nombre: 'Sofia',
            apellido: 'Martínez',
            telefono: '+54 9 11 5555-2222',
            email: 'sofia@gmail.com',
            password: await bcrypt.hash('Sofia123!', SALT),
            roleId: alumnoRole.id,
            clienteId: melani.id,
            avatar: 'S',
        },
    });
    const existingRoutine = await prisma.routine.findFirst({ where: { alumnoId: laura.id } });
    if (!existingRoutine) {
        await prisma.routine.create({
            data: {
                name: 'Rutina Full Body',
                alumnoId: laura.id,
                days: [
                    {
                        day: 'Lunes',
                        exercises: [
                            { id: 'ex1', name: 'Sentadillas', sets: 3, reps: 12, rest: 60, notes: '' },
                            { id: 'ex2', name: 'Peso muerto', sets: 3, reps: 10, rest: 90, notes: '' },
                            { id: 'ex3', name: 'Hip Thrust', sets: 3, reps: 15, rest: 60, notes: '' },
                        ],
                    },
                    {
                        day: 'Miércoles',
                        exercises: [
                            { id: 'ex4', name: 'Press de banca', sets: 3, reps: 12, rest: 60, notes: '' },
                            { id: 'ex5', name: 'Remo con barra', sets: 3, reps: 10, rest: 90, notes: '' },
                        ],
                    },
                ],
            },
        });
    }
    console.log('✅ Seed completado:');
    console.log(`  Admin:   ${admin.email}   / Admin123!`);
    console.log(`  Cliente: ${melani.email} / Melani123! (PERSONAL_TRAINER)`);
    console.log(`  Alumna:  ${laura.email}   / Laura123!`);
    console.log(`  Alumna:  ${sofia.email}   / Sofia123!`);
}
main()
    .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map