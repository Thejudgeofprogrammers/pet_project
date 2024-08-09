import { Types } from "mongoose";
import { ObjectId } from "mongoose";

interface IUserEmail {
    value: string;
};
  
interface IUserDTO {
    _id: string | ObjectId;
    username: string;
    password: string;
    firstName?: string;
    emails: IUserEmail[];
    books: Types.ObjectId[];
};

export default IUserDTO;
