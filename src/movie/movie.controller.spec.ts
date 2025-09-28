import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';

describe('MovieController', () => {
  let controller: MovieController;
  let service: MovieService;

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [{ provide: MovieService, useValue: mockService }],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    service = module.get<MovieService>(MovieService);
  });

  it('findAll', async () => {
    const data = [{ id: 1 } as Movie];
    mockService.findAll.mockResolvedValue(data);
    await expect(controller.findAll()).resolves.toEqual(data);
  });

  it('create', async () => {
    const payload = { title: 't', publishingYear: 2020 } as Partial<Movie>;
    const saved = { id: 1, ...payload } as Movie;
    mockService.create.mockResolvedValue(saved);
    await expect(controller.create(payload)).resolves.toEqual(saved);
  });

  it('update', async () => {
    const payload = { title: 'x' } as Partial<Movie>;
    const updated = { id: 1, title: 'x', publishingYear: 2020 } as Movie;
    mockService.update.mockResolvedValue(updated);
    await expect(controller.update('1', payload)).resolves.toEqual(updated);
  });

  it('remove', async () => {
    mockService.remove.mockResolvedValue(undefined);
    await expect(controller.remove('1')).resolves.toBeUndefined();
  });
});
