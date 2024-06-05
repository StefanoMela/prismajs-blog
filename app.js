const { createPost, findAllPosts, findPostBySlug, updatePost, deletePost, publishedPost, postByContent, updateAllPosts } = require('./utils/crud-post');
const { createCategories, readCategories } = require('./utils/crud-category');
const { createTags, readTags } = require('./utils/crud-tag');

const createSlug = (title) => {
    sluggedT = title.toLowerCase().replace(/\s+/g, "-");
    return sluggedT;
}

// creo e leggo Categories
createCategories(['test', 'test2'], (count) => console.log(`Created ${count} categories`));
readCategories((categories) => console.log(categories));

// creo e leggo Tags
createTags(['test', 'test2'], (count) => console.log(`Created ${count} tags`));
readTags((tags) => console.log(tags));

// creo primo Post
createPost({
    title: "Il mio primo post",
    slug: createSlug('Il mio primo post'),
    image: 'https:icsum.photos/200/300',
    content: "Il primo testo del mio post",
    published: true,
    category: {
        connect: { id: 1 }
    },
    tags: {
        connect: [
            { id: 1 },
            { id: 2 }
        ]
    }
}, post => {
    console.log(post);
});

// leggo tutti i post
findAllPosts((posts) => console.log(posts));

// cerco un post per slug
findPostBySlug(createSlug('Il mio quarto post'), (post) => console.log(post));

// modifico un post
updatePost(2, { title: 'Il mio primo post modificato' }, post => console.log(post));
updatePost(2, { content: 'Il primo testo del mio post modificato' }, post => console.log(post));

// creo un secondo
createPost({
    title: "Il mio quarto post",
    slug: createSlug('Il mio quarto post'),
    image: 'https:icsum.photos/200/300',
    content: "Il testo del mio quarto post",
    published: true,
    category: {
        connect: { id: 1 }
    },
    tags: {
        connect: [
            { id: 1 },
            { id: 2 }
        ]
    }
}, post => {
    console.log(post);
});

// elimino un post
deletePost(2, post => console.log(post));

// leggo tutti i post
findAllPosts((posts) => console.log(posts));

// leggo i post pubblicati
publishedPost((posts) => console.log(posts));

// leggo i post per contenuto
postByContent('testo', (posts) => console.log(posts))

// aggiorno il post con ID 5
updatePost(5, { image: 'https://picsum.photos/200/300' }, post => console.log(post))

// aggiorno tutti i post
updateAllPosts({ image: 'https://picsum.photos/200/300' }, count => console.log(count));