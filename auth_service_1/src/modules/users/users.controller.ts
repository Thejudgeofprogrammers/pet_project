import { Body, Controller, Delete, Get, HttpStatus, Patch, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { Response } from 'express';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {};

    @UseGuards(JwtAuthGuard)
    @Get()
    public async getAllUser(@Res() res: Response): Promise<void> {
        try {
            const usersArray = await this.usersService.getAllUsers();
            res.status(HttpStatus.OK).json(usersArray);
        } catch (err) {
            console.error(err);
            res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
        };
    };

    @UseGuards(JwtAuthGuard)
    @Patch()
    public async updateUser(@Body() updateDTO: UpdateUserDTO, @Req() req, @Res() res: Response): Promise<void> {
        try {
            const user = req.user;
            if (!user) {
                throw new Error('User not found');
            };
            await this.usersService.updateUser(user.email, updateDTO);
            res.status(HttpStatus.OK).json({ message: 'Пользователь успешно обновлён' });
        } catch (err) {
            console.error(err);
            res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
        };
    };
    
    @UseGuards(JwtAuthGuard)
    @Delete()
    public async deleteUser(@Req() req, @Res() res: Response): Promise<void> {
        try {
            const user = req.user;
            if (!user) {
                throw new Error('User not found');
            };
            await this.usersService.deleteUser(user.email);
            res.status(HttpStatus.OK).json({ message: 'Пользователь успешно удалён' });
        } catch (err) {
            console.error(err);
            res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
        };
    };
};
