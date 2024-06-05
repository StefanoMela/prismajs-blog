const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/***
* Funzione per creare post:
* Passo i dati e una callback function - da richiamare al passaggio dei dati - che dovrà restituire il post creato
*/

const createPost = (data, cf) => {

    prisma.post.create({data})
    .then(post => cf(post))
    .catch(err => console.log(err));
}

/***
* Funzione per recuperare tutti post:
* Passo una callback function - da richiamare al passaggio dei dati - che dovrà restituire tutti i post
*/
const findAllPosts = (cf) => {
    prisma.post.findMany()
    .then(posts => cf(posts))
    .catch(err => console.log(err));
};


const findPostBySlug = (slug, cf) => {

    prisma.post.findUnique({where: {slug}})
    .then(post => cf(post))
    .catch(err => console.log(err));
}


const updatePost = (id, data, cf) => {
    prisma.post.update({where: {id}, data})
    .then(post => cf(post))
    .catch(err => console.log(err));
}

const deletePost = (id, cf) => {
    prisma.post.delete({where: {id}})
    .then(post => cf(post))
    .catch(err => console.log(err));
}

const publishedPost = (cf) => {
    prisma.post.findMany({where: {published: true}})
    .then(post => cf(post))
    .catch(err => console.log(err));
}


const postByContent = (content, cf) => {
    prisma.post.findMany({where: {content: {contains: content}}})
    .then(post => cf(post))
    .catch(err => console.log(err));
}


module.exports = {
    createPost,
    findAllPosts,
    findPostBySlug,
    updatePost,
    deletePost,
    publishedPost,
    postByContent
}