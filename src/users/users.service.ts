import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserInput } from "./dto/input/create-user.input";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    public async createUser(createUserData: CreateUserInput): Promise<User> {
        const user: User = new User({
            ...createUserData
        })
        return await user.save()
    }

    public async getUser(id: number): Promise<User> {
        return (await this.userRepository.findOne({
            where: { id }
        }))
    }

    public async getUserByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: {
                email
            }
        });
    }
}