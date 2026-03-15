import { Test, TestingModule } from '@nestjs/testing';

import { TodosService } from '@/application/services/todos.service';
import { Todo } from '@/domain/entities/todo.entity';
import {
  TODO_REPOSITORY,
  TodoRepository,
} from '@/domain/repositories/todo.repository';

describe('TodosService', () => {
  let service: TodosService;
  let repository: jest.Mocked<TodoRepository>;

  beforeEach(async () => {
    const mockRepository: jest.Mocked<TodoRepository> = {
      findAll: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        { provide: TODO_REPOSITORY, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    repository = mockRepository;
  });

  describe('findAll', () => {
    it('should return all todos from repository', async () => {
      const todos: Todo[] = [
        new Todo('1', 'Todo 1', 'Description 1', 'PENDING'),
        new Todo('2', 'Todo 2', null, 'COMPLETED'),
      ];
      repository.findAll.mockResolvedValue(todos);

      const result = await service.findAll();

      expect(result).toEqual(todos);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no todos exist', async () => {
      repository.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a todo with title and description', async () => {
      const expected = new Todo('1', 'New Todo', 'A description', 'PENDING');
      repository.create.mockResolvedValue(expected);

      const result = await service.create('New Todo', 'A description');

      expect(repository.create).toHaveBeenCalledWith('New Todo', 'A description');
      expect(result).toEqual(expected);
    });
  });
});
