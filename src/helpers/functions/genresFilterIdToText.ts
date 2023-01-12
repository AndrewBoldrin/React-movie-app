
export const genresFilterIdToText = (genreList: Number [], genreIdList: Number []) => {
    let text: Array<string> = [];
    genreList?.map((value: any) => {
        if(genreIdList?.includes(Number(value.id))) {
            text.push(value.name);
        }
    });

    return text.join(', ');
}