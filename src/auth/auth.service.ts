import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUserByEmail(email: string, pass: string): Promise<any> {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) return null;

    // Support both bcrypt-hashed (from register) and plaintext (from initial seeds) passwords
    const stored = user.password ?? '';
    const looksHashed = stored.startsWith('$2a$') || stored.startsWith('$2b$') || stored.startsWith('$2y$');
    const valid = looksHashed ? await bcrypt.compare(pass, stored) : stored === pass;

    if (!valid) return null;

    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, email: user.email, sub: user.id };
    return { token: this.jwtService.sign(payload) };
  }

  async register(username: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ username, password: hashed });
    return this.usersRepo.save(user);
  }
}
