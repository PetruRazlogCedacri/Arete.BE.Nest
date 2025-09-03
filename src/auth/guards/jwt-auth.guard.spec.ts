import { JwtGuardTsGuard } from './jwt-auth.guard';

describe('JwtGuardTsGuard', () => {
  it('should be defined', () => {
    expect(new JwtGuardTsGuard()).toBeDefined();
  });
});
