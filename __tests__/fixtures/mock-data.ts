// Mock data factories for tests

export const createMockBooking = (overrides = {}) => ({
  id: '1',
  origin: 'Shanghai',
  destination: 'Los Angeles',
  departureDate: '2025-11-01',
  containerType: '20ft',
  weight: 15000,
  status: 'pending',
  ...overrides,
});

export const createMockUser = (overrides = {}) => ({
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  company: 'Test Company',
  ...overrides,
});

export const createMockShipment = (overrides = {}) => ({
  id: '1',
  trackingNumber: 'TRACK123',
  status: 'in_transit',
  currentLocation: 'Pacific Ocean',
  estimatedArrival: '2025-11-15',
  ...overrides,
});

export const createMockPort = (overrides = {}) => ({
  id: '1',
  name: 'Port of Los Angeles',
  code: 'LAX',
  country: 'USA',
  coordinates: { lat: 33.7401, lng: -118.2708 },
  ...overrides,
});
