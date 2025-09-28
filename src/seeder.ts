import { DataSource } from 'typeorm';
import { User } from './auth/user.entity';
import { Movie } from './movie/movie.entity';
import { Poster } from './poster.entity';

export async function seedData(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const movieRepo = dataSource.getRepository(Movie);
  const posterRepo = dataSource.getRepository(Poster);

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
  const poster1Url = 'https://via.placeholder.com/200x300.png?text=Inception';
  const poster2Url = 'https://via.placeholder.com/200x300.png?text=Interstellar';
  let poster1 = await posterRepo.findOne({ where: { imageUrl: poster1Url } });
  if (!poster1) {
    poster1 = await posterRepo.save({ imageUrl: poster1Url });
  }
  let poster2 = await posterRepo.findOne({ where: { imageUrl: poster2Url } });
  if (!poster2) {
    poster2 = await posterRepo.save({ imageUrl: poster2Url });
  }

  // --- Movies (idempotent) ---
  const existingInception = await movieRepo.findOne({ where: { title: 'Inception' } });
  if (!existingInception) {
    await movieRepo.save({
      title: 'Inception',
      publishingYear: 2010,
      createdBy: admin,
      poster: poster1,
    });
  }

  const existingInterstellar = await movieRepo.findOne({ where: { title: 'Interstellar' } });
  if (!existingInterstellar) {
    await movieRepo.save({
      title: 'Interstellar',
      publishingYear: 2014,
      createdBy: testUser,
      poster: poster2,
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
    entities: [User, Movie, Poster],
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
