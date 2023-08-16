export const dateToString = (date) => {
    const array = date.split(' ');
    return [array[1], array[2], array[3]].join(' ');
}


/***********  Error Validations  ***********/

//Image Validation
export const checkUrlErrors = (url, isImage) => {
    const isValidUrl = urlString=> {
        try {
            return Boolean(new URL(urlString));
        }
        catch(e){
            return false;
        }
    }

    if (!isValidUrl(url)) {
        return 'URL must be a valid URL that starts with "https://"'
    } else if (isImage
        && !url.toLowerCase().endsWith('.png')
        && !url.toLowerCase().endsWith('.jpg')
        && !url.toLowerCase().endsWith('.jpeg')
        && !url.toLowerCase().endsWith('.gif')
        && !url.toLowerCase().endsWith('.bmp')
        && !url.toLowerCase().endsWith('.svg')
    ) {
        return 'Image URL must end in .jpg, .png, .gif, .bmp, .svg, or .jpeg';
    } else {
        return false;
    }
};

//Movie Form
export const movieValidation = ({ title, art, tagline, summary, rating, year, genre, director, writer, cast, trailer_url }) => {
    const errors = { flag: false };
    console.log(title, art, tagline);
    if (!title.length) {
        errors.flag = true;
        errors.title = 'Movie Title is required';
    } else if (title.length > 100) {
        errors.flag = true;
        errors.title = 'Movie Title cannot exceed 100 characters';
    }

    const artErrors = checkUrlErrors(art, true);

    if (artErrors) {
        errors.flag = true;
        errors.art = artErrors;
    }

    if (tagline.length > 150) {
        errors.flag = true;
        errors.tagline = 'Tagline cannot exceed 150 characters'
    } else if (tagline.length < 5) {
        errors.flag = true;
        errors.tagline = 'Tagline cannot be less than 5 characters'
    }

    if (summary.length > 1000) {
        errors.flag = true;
        errors.summary = 'Summary cannot exceed 1000 characters'
    } else if (summary.length < 10) {
        errors.flag = true;
        errors.summary = 'Summary cannot be less than 10 characters'
    }

    if (year < 1888 || year > 2030) {
        errors.flag = true;
        errors.year = 'Year must be between 1888 and 2030'
    }

    if (director.length > 60) {
        errors.flag = true;
        errors.director = 'Director name must not exceed 60 characters'
    }

    if (writer.length > 60) {
        errors.flag = true;
        errors.writer = 'Writer name must not exceed 60 characters'
    }

    if (cast.length > 1000) {
        errors.flag = true;
        errors.cast = 'Cast names must not exceed 1000 characters'
    }

    const trailerErrors = checkUrlErrors(trailer_url, false);

    if (trailer_url && trailerErrors) {
        errors.flag = true;
        errors.trailer_url = trailerErrors;
    }

    return errors;
};

// Normalize Unique Errors
export const normalizeUniqueErrors = (array) => {
    const errors = {};
    for (let i = 0; i < array.length; i++) {
        const err = array[i].split(' : ');
        errors[err[0]] = err[1];
    }
    return errors;
};


/***********  Clean Forms  ***********/
export const capitalizeSentence = (str) => {
    const array = str.split(' ').map(word => word[0].toUpperCase() + word.slice(1));
    return array.join(' ');
}

export const cleanMovieForm = ({ title, art, tagline, summary, rating, year, genre, director, writer, cast, trailer_url }) => {
    const actorsArray = cast.split(', ').map(actor => capitalizeSentence(actor));
    
    return {
        title: capitalizeSentence(title),
        art,
        tagline: tagline.toUpperCase(),
        summary,
        rating,
        year,
        genre,
        director: capitalizeSentence(director),
        writer: capitalizeSentence(writer),
        cast: actorsArray.join(', '),
        trailer_url: trailer_url
    };
}
