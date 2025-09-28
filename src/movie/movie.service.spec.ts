import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { NotFoundException } from '@nestjs/common';

type MockRepo<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepo = (): MockRepo => ({
  find: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

describe('MovieService', () => {
  let service: MovieService;
  let repo: MockRepo<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useValue: createMockRepo(),
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    repo = module.get(getRepositoryToken(Movie));
  });

  it('findAll returns movies', async () => {
    const data = [{ id: 1 } as Movie];
    (repo.find as jest.Mock).mockResolvedValue(data);
    await expect(service.findAll()).resolves.toEqual(data);
    expect(repo.find).toHaveBeenCalled();
  });

  it('findOne returns a movie', async () => {
    const item = { id: 1 } as Movie;
    (repo.findOneBy as jest.Mock).mockResolvedValue(item);
    await expect(service.findOne(1)).resolves.toEqual(item);
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('findOne throws when not found', async () => {
    (repo.findOneBy as jest.Mock).mockResolvedValue(null);
    await expect(service.findOne(10)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('create saves a movie', async () => {
    const payload = { title: 't', publishingYear: 2020 } as Partial<Movie>;
    const created = { id: 1, ...payload } as Movie;
    (repo.create as jest.Mock).mockReturnValue(created);
    (repo.save as jest.Mock).mockResolvedValue(created);
    await expect(service.create(payload)).resolves.toEqual(created);
    expect(repo.create).toHaveBeenCalledWith(payload);
    expect(repo.save).toHaveBeenCalledWith(created);
  });

  it('update merges and saves', async () => {
    const existing = { id: 1, title: 'a', publishingYear: 2000 } as Movie;
    (repo.findOneBy as jest.Mock).mockResolvedValue(existing);
    const updated = { id: 1, title: 'b', publishingYear: 2021 } as Movie;
    (repo.save as jest.Mock).mockResolvedValue(updated);
    await expect(service.update(1, { title: 'b', publishingYear: 2021 })).resolves.toEqual(updated);
    expect(repo.save).toHaveBeenCalled();
  });

  it('remove deletes entity', async () => {
    const existing = { id: 1 } as Movie;
    (repo.findOneBy as jest.Mock).mockResolvedValue(existing);
    (repo.remove as jest.Mock).mockResolvedValue(undefined);
    await expect(service.remove(1)).resolves.toBeUndefined();
    expect(repo.remove).toHaveBeenCalledWith(existing);
  });
});
