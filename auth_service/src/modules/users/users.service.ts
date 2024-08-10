import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import IUserDTO from './interfaces/user.interface';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userRepository: Model<UserDocument>,
        private readonly httpService: HttpService
    ) {};

    public async getAllUsers(): Promise<IUserDTO[]> {
        return await this.userRepository.find().select('-__v').exec();
    };

    public async hashedPassword(password: string): Promise<string> {
        try {
            return await bcrypt.hash(password, 10);
        } catch (err) {
            console.error(err);
            throw err;
        };
    };

    public async findUserByEmail(email: string): Promise<User> {
        try {
            return await this.userRepository.findOne({ email });
        } catch (err) {
            console.error(err);
            throw err;
        };
    };

    public async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
        try {
            dto.password = await this.hashedPassword(dto.password);
            await this.userRepository.create({
                username: dto.username,
                firstName: dto.firstName,
                email: dto.email,
                password: dto.password
            });
            return dto;
        } catch (err) {
            console.error(err);
            throw err;  
        };
    };

    public async publicUser(email: string): Promise<any> {
        try {
            const user = this.userRepository.findOne({ email })
                .select('-password')
                .select('-__v')
                .exec()

            if (!user) {
                throw new Error('User not found!');
            };

            const books = await this.httpService.get('http://books-service/api/books', {
                params: { userId: (await user)._id.toString() }
            }).toPromise();

            return { ...(await user).toObject(), books: books.data };
        } catch (err) {
            console.error(err);
            throw err;  
        };
    };

    public async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
        try {
            await this.userRepository.updateOne(dto, { email });
            return dto;
        } catch (err) {
            throw new Error(err);  
        };
    };

    public async deleteUser(email: string): Promise<boolean> {
        try {
            const user = await this.userRepository.findOne({ email }) as IUserDTO;
            if (!user) {
                throw new Error('User not found!');
            };

            await this.httpService.delete('http://books-service/api/books', {
                params: { userId: user._id.toString() }
            }).toPromise();
            
            await this.userRepository.deleteOne({ email });

            return true;  
        } catch (err) {
            console.error(err);
            throw err;
        };
    };
};
