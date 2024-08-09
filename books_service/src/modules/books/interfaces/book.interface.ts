import { Document, Schema } from 'mongoose';

interface IBookDTO extends Document {
    _id: Schema.Types.ObjectId;
    title: string;
    description?: string;
    authors?: string;
    favorite?: boolean;
    fileName?: string;
    fileCover?: string;
    owner: Schema.Types.ObjectId;
    isPublished?: boolean;
    count?: number;
    comments?: string[];
};

export default IBookDTO;
