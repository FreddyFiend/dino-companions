import { RolesGuard } from '../auth/roles.guard';

describe('RolesGuard', () => {
  it('should be defined', () => {
    expect(new RolesGuard()).toBeDefined();
  });
});
