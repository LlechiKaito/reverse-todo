import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';

import { TodosService } from '@/application/services/todos.service';
import { Todo } from '@/domain/entities/todo.entity';
import { TODO_REPOSITORY } from '@/domain/repositories/todo.repository';
import { HttpExceptionFilter } from '@/presentation/filters/http-exception.filter';
import { TodosModule } from '@/todos.module';

describe('TodosController (Integration)', () => {
  let app: INestApplication;
  let todosService: TodosService;

  const mockRepository = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TodosModule],
    })
      .overrideProvider(TODO_REPOSITORY)
      .useValue(mockRepository)
      .compile();

    app = module.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();

    todosService = module.get<TodosService>(TodosService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/todos', () => {
    it('should return all todos', async () => {
      const todos: Todo[] = [
        new Todo('1', 'Todo 1', 'Desc', 'PENDING'),
        new Todo('2', 'Todo 2', null, 'COMPLETED'),
      ];
      mockRepository.findAll.mockResolvedValue(todos);

      const response = await request(app.getHttpServer())
        .get('/api/todos')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toBe('Todo 1');
      expect(response.body[1].title).toBe('Todo 2');
    });

    it('should return empty array when no todos', async () => {
      mockRepository.findAll.mockResolvedValue([]);

      const response = await request(app.getHttpServer())
        .get('/api/todos')
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });

  describe('POST /api/todos', () => {
    it('should create a todo with valid data', async () => {
      const created = new Todo('1', 'New Todo', 'Description', 'PENDING');
      mockRepository.create.mockResolvedValue(created);

      const response = await request(app.getHttpServer())
        .post('/api/todos')
        .send({ title: 'New Todo', description: 'Description' })
        .expect(201);

      expect(response.body.title).toBe('New Todo');
      expect(mockRepository.create).toHaveBeenCalled();
    });

    it('should return 400 when title is missing', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/todos')
        .send({ description: 'No title' })
        .expect(400);

      expect(response.body.statusCode).toBe(400);
    });

    it('should return 400 when title is empty', async () => {
      await request(app.getHttpServer())
        .post('/api/todos')
        .send({ title: '', description: 'Empty title' })
        .expect(400);
    });
  });
});
