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
* includo le categorie e i tag, passando però solo il nome
*/
const findAllPosts = (cf) => {
    prisma.post.findMany({
        include:{
            category: {
                select: {
                    name: true
                },
            },
            tags: {
                select: {
                    name: true
                },
            }
        }
    })
    .then(posts => cf(posts))
    .catch(err => console.log(err));
};


// cerco post per slug
const findPostBySlug = (slug, cf) => {

    prisma.post.findUnique({where: {slug},
        include:{
            category: {
                select: {
                    name: true
                },
            },
            tags: {
                select: {
                    name: true
                },
            }
        }})
    .then(post =>{!post ? console.log(`Nessun post con titolo:${slug}`) : cf(post)})
    .catch(err => console.log(err));
}

// aggiorno post
const updatePost = (id, data, cf) => {
    prisma.post.update({where: {id}, data})
    .then(post => cf(post))
    .catch(err => console.log(err));
}

// aggiorno tutti i post
const updateAllPosts = (data, cf) => {
    prisma.post.updateMany({data})
    .then(count => cf(count))
    .catch(err => console.log(err));
}
// elimino post
const deletePost = (id, cf) => {
    prisma.post.delete({where: {id}})
    .then(post => cf(post))
    .catch(err => console.log(err));
}
// cerco per post pubblicati
const publishedPost = (cf) => {
    prisma.post.findMany({where: {published: true}})
    .then(post => cf(post))
    .catch(err => console.log(err));
}
// cerco per contenuto
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
    postByContent,
    updateAllPosts
}