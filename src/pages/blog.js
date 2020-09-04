import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 1.45rem 1.0875rem;
`

const ArticleDate = styled.h5`
  display: inline;
  color: #606060;
  margin-bottom: 15px;
  margin-top: 15px;
`

const MarkerHeader = styled.h3`
  display: inline;
  padding: 3px;
  border-radius: .5em 0 0.5em 0;
  margin-bottom: 15px;
  background-image: linear-gradient(
    -100deg,
    rgba(26, 178, 53, 0.15),
    rgba(26, 178, 53, 0.8) 100%,
    rgba(26, 178, 53, 0.25)
  );
`

const ReadingTime = styled.h5`
  display: inline;
  color: #606060;
  margin-bottom: 15px;
`

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Blog" />
      <Content>
        <h1>Blog</h1>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link
              to={node.frontmatter.path}
              css={css`
                text-decoration: none;
                color: inherit;
              `}
            >
              <MarkerHeader>{node.frontmatter.title} </MarkerHeader>
              <div>
                <ArticleDate>{node.frontmatter.date}</ArticleDate>
                <ReadingTime> - {node.fields.readingTime.text}</ReadingTime>
                <ReadingTime> - {node.frontmatter.author}</ReadingTime>
              </div>
              <p>{node.frontmatter.description}</p>
            </Link>
          </div>
        ))}
      </Content>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            path
            author
            description
          }
          fields {
            slug
            readingTime {
              text
            }
          }
          excerpt
        }
      }
    }
  }
`