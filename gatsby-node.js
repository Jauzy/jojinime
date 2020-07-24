/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
    // **Note:** The graphql function call returns a Promise
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
    const { createPage } = actions
    const result = await graphql(`
        query {
            anime:allFile(filter: {relativeDirectory: {eq:"anime"}}) {
                edges{
                    node{
                        childMarkdownRemark {
                            frontmatter{
                                title
                                mal_id
                                status
                                type
                            }
                        }
                        name
                    }   
                }
            }
        }
    `)
    result.data.anime.edges.forEach(({ node }) => {
        createPage({
            path: node.name,
            component: path.resolve(`./src/templates/anime-page.js`),
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                name: node.name,
                title: node.childMarkdownRemark.frontmatter.title,
                mal_id: node.childMarkdownRemark.frontmatter.mal_id,
            },
        })
    })
}