import { DataSource } from 'typeorm';
import { User } from './auth/user.entity';
import { Movie } from './movie/movie.entity';

export async function seedData(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const movieRepo = dataSource.getRepository(Movie);

  // --- Users (idempotent) ---
  let admin = await userRepo.findOne({ where: { username: 'admin' } });
  if (!admin) {
    admin = await userRepo.save({
      username: 'admin',
      password: 'admin123',
      email: 'admin@example.com',
    });
  }

  let testUser = await userRepo.findOne({ where: { username: 'john' } });
  if (!testUser) {
    testUser = await userRepo.save({
      username: 'john',
      password: 'john123',
      email: 'john@example.com',
    });
  }

  // --- Posters (idempotent) ---

  // --- Movies (idempotent) ---
  const existingInception = await movieRepo.findOne({
    where: { title: 'Inception' },
  });
  if (!existingInception) {
    await movieRepo.save({
      title: 'Inception',
      publishingYear: 2010,
      poster: '',
    });
  }

  const existingInterstellar = await movieRepo.findOne({
    where: { title: 'Interstellar' },
  });
  if (!existingInterstellar) {
    await movieRepo.save({
      title: 'Interstellar',
      publishingYear: 2014,
      poster: '',
    });
  }

  console.log('✅ Seed data inserted successfully (idempotent)');
}

// Allow running via `npm run seed`
if (require.main === module) {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'movie_user',
    password: 'password123',
    database: 'movie_db',
    entities: [User, Movie],
    synchronize: true,
  });

  dataSource
    .initialize()
    .then(async () => {
      console.log('🔌 DataSource initialized for seeding');
      await seedData(dataSource);
      await dataSource.destroy();
      console.log('✅ Seeding complete');
      process.exit(0);
    })
    .catch(async (err) => {
      console.error('❌ Seeding failed:', err);
      try {
        if (dataSource.isInitialized) await dataSource.destroy();
      } catch {}
      process.exit(1);
    });
}
