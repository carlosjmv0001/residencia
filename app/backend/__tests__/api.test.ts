import { POST as registerHandler } from '../src/app/api/auth/register/route'
import { authService } from '../src/lib/auth'

jest.mock('../src/lib/auth')
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((body, options) => ({
      status: options?.status || 200,
      json: async () => body,
    })),
  },
  NextRequest: jest.fn().mockImplementation((url, options) => ({
    url,
    method: options?.method || 'GET',
    json: jest.fn().mockResolvedValue(options?.body ? JSON.parse(options.body) : {}),
  })),
}))

describe('API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/auth/register', async () => {
    const mockRequestBody = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    }

    const mockUser = {
      id: '123',
      name: mockRequestBody.name,
      email: mockRequestBody.email,
    };

    (authService.registerUser as jest.Mock).mockResolvedValue(mockUser);

    const mockRequest = new (jest.requireMock('next/server').NextRequest)('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(mockRequestBody)
    })

    const response = await registerHandler(mockRequest)

    expect(response.status).toBe(201)
    const data = await response.json()
    expect(data).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          name: mockRequestBody.name,
          email: mockRequestBody.email,
        })
      })
    )
  })
})