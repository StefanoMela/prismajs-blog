const { createPost, findAllPosts, findPostBySlug, updatePost, deletePost, publishedPost, postByContent } = require('./utils/crud-post');
const { createCategories, readCategories } = require('./utils/crud-category');
const { createTags, readTags } = require('./utils/crud-tag');

const createSlug = (title) => {
    sluggedT = title.toLowerCase().replace(/\s+/g, "-");
    return sluggedT;
}

createCategories(['test', 'test2'], (count) => console.log(`Created ${count} categories`));

readCategories((categories) => console.log(categories));

createTags(['test', 'test2'], (count) => console.log(`Created ${count} tags`));
readTags((tags) => console.log(tags));

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

findAllPosts((posts) => console.log(posts));

findPostBySlug('il-mio-primo-post', (post) => console.log(post));

updatePost(2, { title: 'Il mio primo post modificato' }, post => console.log(post));

updatePost(2, { content: 'Il primo testo del mio post modificato' }, post => console.log(post));

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

deletePost(2, post => console.log(post));

findAllPosts((posts) => console.log(posts));

publishedPost((posts) => console.log(posts));

postByContent('testo', (posts) => console.log(posts))