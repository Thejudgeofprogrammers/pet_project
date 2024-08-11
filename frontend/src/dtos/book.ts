interface IBookDTO {
    _id: string
    title: string;
    description?: string;
    authors?: string;
    favorite?: boolean;
    fileName?: string;
    fileCover?: string;
    owner: string
    isPublished?: boolean;
    count?: number;
    comments?: string[] | any;
};

export default IBookDTO;
