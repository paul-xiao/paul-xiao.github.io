import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../components/CodeBlock'
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';


const importAll = (r) => r.keys().map(r);
const markdownFiles = importAll(require.context('./posts', false, /\.md$/))
  .sort()
  .reverse();

class Blog extends Component {
  state = {
    posts: []
  }
  async componentDidMount() {
    const posts = await Promise.all(markdownFiles.map((file) => fetch(file).then((res) => res.text())))
      .catch((err) => console.error(err));

    this.setState((state) => ({ ...state, posts }));
  }
  render() {
    const { posts } = this.state
    return<section className="section">
    <Helmet>
        <title>Blog</title>
        <meta name="description" content="paul-xiao.io" />
    </Helmet>
      {
        posts.map((post, idx) => (
          <div className="card" key={idx}>
            <div className="card-content">
              <div className="content">
                <ReactMarkdown source={post} renderers={{
            code: CodeBlock,
          }} />
              </div>
            </div>
          </div>
        ))
      }
  </section>
  }
}


Blog.propTypes = {
  value: PropTypes.string.isRequired,
};
export default Blog;