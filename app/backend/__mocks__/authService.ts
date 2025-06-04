export const authService = {
    registerUser: jest.fn().mockResolvedValue({
      id: '123',
      name: 'Test User',
      email: 'test@example.com',
    }),
  };