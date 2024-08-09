import { Controller, Post, Get, Body, Req, HttpStatus, Res } from '@nestjs/common';
import { TokenService } from './token.service';
import { Request, Response } from 'express';

@Controller('api/token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {};

  @Post('generate')
  async generateToken(@Body() user: any, @Res() res: Response): Promise<void> {
    try {
      const token = await this.tokenService.generateJwtToken(user);
      res.status(HttpStatus.OK).json({ token });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  }

  @Get('validate')
  async validateToken(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token not found' });
        return;
      }
      const user = this.tokenService.jwtService.verify(token);
      res.status(HttpStatus.OK).json(user);
    } catch (err) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
    }
  }
}