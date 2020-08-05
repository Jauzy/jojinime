/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    // **Note:** The graphql function call returns a Promise
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
    const result = await graphql(`
    query {
        anime:allMongodbJojinimeAnimes {
            nodes {
                title
                mongodb_id
            }
        }
    }`)
    result.data.anime.nodes.forEach(anime => {
        createPage({
            path: anime.title.toLowerCase().replace(/\s+/g, '-').replace(/[|&;:!$%@"<>()+,]/g, "-"),
            component: path.resolve(`./src/templates/anime-page.js`),
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                mongo_id: anime.mongodb_id,
                title: anime.title,
            },
        })
    })
}